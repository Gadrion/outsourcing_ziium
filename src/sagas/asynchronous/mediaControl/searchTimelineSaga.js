import {
  take, all, put, call, select,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as searchTimelineActions from 'store/modules/mediaControl/searchTimelineModule';

const GET_OVERLAPPED_ID_LIST_URL = '/stw-cgi/recording.cgi?msubmenu=overlapped&action=view';
const GET_TIMELINE_URL = '/stw-cgi/recording.cgi?msubmenu=timeline&action=view';

const getSearchTime = (channel, { startDate, endDate }) => new Promise(resolve => {
  const s = new Date(startDate);
  let fromDate;
  let toDate;

  if (endDate) {
    fromDate = startDate;
    toDate = endDate;
  } else {
    fromDate = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0);
    toDate = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 23, 59, 59);
  }

  const params = {
    FromDate: `${fromDate.toISOString().split('.')[0]}Z`,
    ToDate: `${toDate.toISOString().split('.')[0]}Z`,
  };

  const resultParams = channel !== -1 ? {
    ...params,
    ChannelIDList: channel,
  } : params;

  resolve(resultParams);
});

function* asyncGetOverlappedIdListSaga() {
  while (true) {
    const action = yield take(searchTimelineActions.GET_OVERLAPPED_ID_LIST);
    const serchTimelineState = yield select(state => state.searchTimelineModule);
    const { currentChannel } = serchTimelineState.toJS();

    const searchDate = yield call(getSearchTime, currentChannel, action.payload);

    try {
      const promise = yield call([SunapiClient, 'get'], GET_OVERLAPPED_ID_LIST_URL, searchDate);

      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(searchTimelineActions.getOverlappedIdListSuccess(promise.data.OverlappedIDList));
      } else {
        yield put(searchTimelineActions.getOverlappedIdListFailure());
      }
    } catch (_) {
      yield put(searchTimelineActions.getOverlappedIdListFailure());
    }
  }
}

const redistributeTimelineResult = timeLineSearchResults => (
  new Promise(resolve => {
    const redistributeTimelineResultsData = [];
    timeLineSearchResults.map(timeLineSearchResult => {
      const normal = [];
      const event = [];
      timeLineSearchResult.Results.map(result => {
        if (result.Type === 'Normal') {
          normal.push(result);
        } else {
          event.push(result);
        }
        return null;
      });
      redistributeTimelineResultsData.push({
        Channel: timeLineSearchResult.Channel,
        normal,
        event,
      });
      return null;
    });
    resolve(redistributeTimelineResultsData);
  })
);

const makeTextEndTimeData = playTime => {
  const splitArray = playTime.split(':');
  const calcMin = Number(splitArray[1]) + 1;
  return `${splitArray[0]}:${calcMin > 10 ? calcMin : `0${calcMin}`}:${splitArray[2]}`;
};

const makeTimelineParams = (overlappedIDList, searchDate) => (
  overlappedIDList.length > 0 ? {
    ...searchDate,
    OverlappedIDList: overlappedIDList,
  } : searchDate
);

const convertEventFilterDatas = (
  {
    type,
    searchEvent,
    searchDate,
    filters,
  },
) => (new Promise(resolve => {
  let index = 0;
  const isEventTab = type === 'eventTab';
  const convertEvent = [];
  const searchTime = new Date(searchDate.FromDate).toDateString();

  searchEvent.map((event, i) => {
    const startTime = isEventTab ? event.StartTime : event.PlayTime;
    const resultTime = new Date(startTime).toDateString();
    if (searchTime === resultTime) {
      const checkArray = isEventTab ? filters : event.ChannelIDList;
      const checkData = isEventTab ? event.Type : filters;
      const checkResult = checkArray.find(data => data === checkData);
      if (typeof checkResult !== 'undefined') {
        const pushData = isEventTab ? event : ({
          ...event,
          StartTime: event.PlayTime,
          EndTime: searchEvent[i + 1]
            ? searchEvent[i + 1].PlayTime
            : makeTextEndTimeData(event.PlayTime),
          Type: 'UserInput',
        });

        convertEvent.push({
          ...pushData,
          index,
        });

        index += 1;
      }
    }
    return null;
  });

  resolve(convertEvent);
}));

function* asyncConvertEventTabEventFilter(timelineSearchData, searchDate) {
  if (timelineSearchData) {
    try {
      // filter를 검사할 것을 불러야 한다.
      const eventSearchModuleState = yield select(state => state.eventSearchModule);
      const filterEvent = eventSearchModuleState.get('eventfilterdata');
      const filters = filterEvent.toJS(); // ['MotionDetection'];
      // 1ch이라서 [0]
      const events = timelineSearchData[0] ? timelineSearchData[0].event : [];
      const convertData = yield call(convertEventFilterDatas, {
        type: 'eventTab',
        searchEvent: events,
        searchDate,
        filters,
      });
      return convertData;
    } catch (error) {
      console.log('asyncConvertEventTabEventFilter - error', error);
    }
  }
  return null;
}

function* asyncConvertTextTabEventFilter(currentChannel, searchDate) {
  if (typeof currentChannel !== 'undefined') {
    try {
      const textSearchModuleState = yield select(state => state.textSearchModule);
      const searchResult = textSearchModuleState.get('searchResult');

      const convertData = yield call(convertEventFilterDatas, {
        type: 'textTab',
        searchEvent: searchResult.slice().reverse(),
        searchDate,
        filters: currentChannel,
      });

      return convertData;
    } catch (error) {
      console.log('asyncConvertTextTabEventFilter - error', error);
    }
  }
  return null;
}

function* asyncGetTimelineSaga() {
  while (true) {
    const action = yield take(searchTimelineActions.GET_TIMELINE);
    yield put(searchTimelineActions.getOverlappedIdList(action.payload));
    yield take(searchTimelineActions.GET_OVERLAPPED_ID_LIST_SUCCESS);

    const serchTimelineState = yield select(state => state.searchTimelineModule);
    const { currentChannel, overlappedIDList } = serchTimelineState.toJS();

    const searchDate = yield call(getSearchTime, currentChannel, action.payload);

    try {
      const params = makeTimelineParams(overlappedIDList, searchDate);
      const promise = yield call([SunapiClient, 'get'], GET_TIMELINE_URL, params);

      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        const searchResult = promise.data.TimeLineSearchResults;
        const convertData = yield call(redistributeTimelineResult, searchResult);

        // tileline에 표시 하기 위한 filterEvent Set
        const { type } = action.payload;
        const convertResult = type === 'eventTab'
          ? yield call(asyncConvertEventTabEventFilter, convertData, searchDate)
          : yield call(asyncConvertTextTabEventFilter, currentChannel, searchDate);

        yield put(searchTimelineActions.getTimelineSuccess({
          filterEvent: convertResult,
          timeLineSearchResults: convertData,
        }));
      } else {
        yield put(searchTimelineActions.getTimelineFailure());
      }
    } catch (_) {
      yield put(searchTimelineActions.getTimelineFailure());
    }
  }
}

/**
 * @description Search Filter (SearchOptions.jsx) 에서 필터 적용 했을때 호출하는 구문
 */
function* asyncApplyEventListFilter() {
  while (true) {
    const action = yield take(searchTimelineActions.APPLY_EVENT_LIST_FILTER);
    const serchTimelineState = yield select(state => state.searchTimelineModule);
    const { currentChannel, timeLineSearchResults } = serchTimelineState.toJS();
    try {
      // tileline에 표시 하기 위한 filterEvent Set
      const { type } = action.payload;
      const searchDate = yield call(getSearchTime, currentChannel, action.payload);

      const convertResult = type === 'eventTab'
        ? yield call(asyncConvertEventTabEventFilter, timeLineSearchResults, searchDate)
        : yield call(asyncConvertTextTabEventFilter, currentChannel, searchDate);
      yield put(searchTimelineActions.getTimelineSuccess({
        filterEvent: convertResult,
        timeLineSearchResults,
      }));
    } catch (_) {
      yield put(searchTimelineActions.getTimelineFailure());
    }
  }
}

export default function* rootSearchTimelineSaga() {
  yield all([
    asyncGetOverlappedIdListSaga(),
    asyncGetTimelineSaga(),
    asyncConvertEventTabEventFilter(),
    asyncConvertTextTabEventFilter(),
    asyncApplyEventListFilter(),
  ]);
}

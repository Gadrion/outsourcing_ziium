import {
  take,
  all,
  put,
  actionChannel,
  call,
  select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SunapiClient } from 'util/lib';
import * as textSearchActions from 'store/modules/textSearch/textSearchModule';
import * as searchTimelineActions from 'store/modules/mediaControl/searchTimelineModule';
import { setPosEvent } from 'store/modules/system/systemInfomationModule';

// url
const CONTROL_METADATA_URL = '/stw-cgi/recording.cgi?msubmenu=metadata&action=control';
const GET_METADATA_URL = '/stw-cgi/recording.cgi?msubmenu=metadata&action=view';
const GET_POS_EVENT_CONFIG_URL = '/stw-cgi/recording.cgi?msubmenu=poseventconf&action=view';
const GET_POS_CONFIG_URL = '/stw-cgi/recording.cgi?msubmenu=posconf&action=view';

function* getOverlappedIDList() {
  try {
    const textSearchState = yield select(state => state.textSearchModule);
    const {
      searchStartDateObj,
      searchEndDateObj,
    } = textSearchState.toJS();

    const {
      year: sYear,
      month: sMon,
      day: sDay,
      hour: sHour,
      minute: sMin,
      second: sSec,
    } = searchStartDateObj;

    const {
      year: eYear,
      month: eMon,
      day: eDay,
      hour: eHour,
      minute: eMin,
      second: eSec,
    } = searchEndDateObj;

    yield put(searchTimelineActions.getOverlappedIdList({
      startDate: new Date(sYear, sMon - 1, sDay, sHour, sMin, sSec),
      endDate: new Date(eYear, eMon - 1, eDay, eHour, eMin, eSec),
    }));

    yield take(searchTimelineActions.GET_OVERLAPPED_ID_LIST_SUCCESS);
  } catch (_) {
    console.info('Error', 'getOverlappedIDList in TextSearch');
  }
}

function* getPOSConfig() {
  try {
    const promise = yield call([SunapiClient, 'get'], GET_POS_CONFIG_URL);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(textSearchActions.getPOSConfigSuccess(promise.data.POSDevices));
    } else {
      yield put(textSearchActions.getPOSConfigFailure());
    }
  } catch (_) {
    yield put(textSearchActions.getPOSConfigFailure());
  }
}

function* getPOSEventConfig() {
  try {
    const promise = yield call([SunapiClient, 'get'], GET_POS_EVENT_CONFIG_URL);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      const { data } = promise;
      if (typeof data.Keywords === 'undefined') {
        Object.assign(data, { Keywords: [] });
      }
      yield put(textSearchActions.getPOSEventConfigSuccess(promise.data));
    } else {
      yield put(textSearchActions.getPOSEventConfigFailure());
    }
  } catch (_) {
    yield put(textSearchActions.getPOSEventConfigFailure());
  }
}

function* controlMetaDataStart() {
  try {
    const tlModuleState = yield select(state => state.searchTimelineModule);
    const {
      overlappedIDList,
    } = tlModuleState.toJS();

    const tsModuleState = yield select(state => state.textSearchModule);
    const {
      searchStartDateObj,
      searchEndDateObj,
      isWholeWord,
      isCaseSensitive,
      keyword,
      eventKeywordCheckStatus,
      currentPOSDeviceList,
    } = tsModuleState.toJS();

    const startDateString = `${searchStartDateObj.year}-${searchStartDateObj.month}-${searchStartDateObj.day}`;
    const endDateString = `${searchEndDateObj.year}-${searchEndDateObj.month}-${searchEndDateObj.day}`;
    const startTimeString = `${searchStartDateObj.hour}:${searchStartDateObj.minute}:${searchStartDateObj.second}`;
    const endTimeString = `${searchEndDateObj.hour}:${searchEndDateObj.minute}:${searchEndDateObj.second}`;

    const params = {
      Mode: 'Start',
      MetadataType: 'POS',
      FromDate: `${startDateString}T${startTimeString}Z`,
      ToDate: `${endDateString}T${endTimeString}Z`,
      IsWholeWord: isWholeWord,
      IsCaseSensitive: isCaseSensitive,
    };

    if (currentPOSDeviceList.length > 0) {
      params.DeviceIDList = currentPOSDeviceList.join(',');
    }

    let keywordString = '';
    if (eventKeywordCheckStatus.length > 0) {
      eventKeywordCheckStatus.map(item => {
        if (item.isChecked) {
          keywordString = `${keywordString}${item.condition} `;
        }
        return keywordString;
      });
    }

    if (keywordString === '') {
      if (keyword !== '') {
        params.Keyword = encodeURI(keyword);
      }
    } else {
      params.Keyword = keywordString.substring(0, keywordString.length - 1);
      params.Keyword = encodeURI(params.Keyword);
    }

    if (overlappedIDList.length > 0) {
      params.OverlappedID = overlappedIDList.join(',');
    }

    const promise = yield call([SunapiClient, 'get'], CONTROL_METADATA_URL, params);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(textSearchActions.controlMetaDataStartSuccess(promise.data.SearchToken));
      yield put(textSearchActions.requestTextSearch({
        requestType: 'GET_METADATA',
        Mode: 'Status',
      }));
    } else {
      yield put(textSearchActions.controlMetaDataStartFailure());
    }
  } catch (_) {
    yield put(textSearchActions.controlMetaDataStartFailure());
  }
}

function* controlMetaDataCancel() {
  try {
    const textSearchState = yield select(state => state.textSearchModule);
    const {
      searchToken,
    } = textSearchState.toJS();

    const params = {
      Mode: 'Cancel',
      SearchToken: searchToken,
    };

    const promise = yield call([SunapiClient, 'get'], CONTROL_METADATA_URL, params);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(textSearchActions.controlMetaDataCancelSuccess());
    } else {
      yield put(textSearchActions.controlMetaDataCancelFailure());
    }
  } catch (_) {
    yield put(textSearchActions.controlMetaDataCancelFailure());
  }
}

function* controlMetaDataRenew() {
  try {
    const textSearchState = yield select(state => state.textSearchModule);
    const {
      searchToken,
    } = textSearchState.toJS();

    const params = {
      Mode: 'Renew',
      SearchToken: searchToken,
    };

    const promise = yield call([SunapiClient, 'get'], CONTROL_METADATA_URL, params);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(textSearchActions.controlMetaDataRenewSuccess());
    } else {
      yield put(textSearchActions.controlMetaDataRenewFailure());
    }
  } catch (_) {
    yield put(textSearchActions.controlMetaDataRenewFailure());
  }
}

function* getMetaDataStatus() {
  try {
    const textSearchState = yield select(state => state.textSearchModule);
    const {
      searchToken,
    } = textSearchState.toJS();

    const params = {
      Type: 'Status',
      SearchToken: searchToken,
    };

    const promise = yield call([SunapiClient, 'get'], GET_METADATA_URL, params);

    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(textSearchActions.getMetaDataStatusSuccess(promise.data.Status));
      yield put(textSearchActions.requestTextSearch({
        requestType: 'GET_METADATA',
        Mode: 'Result',
      }));
    } else {
      yield put(textSearchActions.getMetaDataStatusFailure());
    }
  } catch (_) {
    yield put(textSearchActions.getMetaDataStatusFailure());
  }
}

function* getMetaDataResult() {
  try {
    const textSearchState = yield select(state => state.textSearchModule);
    const {
      searchToken,
      searchStatus,
    } = textSearchState.toJS();

    if (searchStatus === 'Completed') {
      const params = {
        Type: 'Results',
        ResultFromIndex: 1,
        MaxResults: 100,
        SearchToken: searchToken,
      };

      const promise = yield call([SunapiClient, 'get'], GET_METADATA_URL, params);

      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        const { MetaDataSearchResults } = promise.data;
        const newMetaDataSearchResults = yield MetaDataSearchResults.map(param => {
          const result = param;
          const dateObj = new Date(result.Date);
          result.Date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}T${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}Z`;
          return param;
        });
        yield put(textSearchActions.getMetaDataResultSuccess(newMetaDataSearchResults));
      } else {
        yield put(textSearchActions.getMetaDataResultFailure());
      }
    } else {
      yield put(textSearchActions.requestTextSearch({
        requestType: 'GET_METADATA',
        Mode: 'WAIT',
      }));
    }
  } catch (_) {
    yield put(textSearchActions.getMetaDataResultFailure());
  }
}

function* watchRequests() {
  const request = yield actionChannel(textSearchActions.REQUEST_TEXT_SEARCH);
  while (true) {
    const { payload } = yield take(request);

    if (payload.requestType === 'CONTROL_METADATA') {
      switch (payload.Mode) {
        case 'Start':
          yield call(getOverlappedIDList);
          yield call(controlMetaDataStart);
          break;
        case 'Cancel':
          yield call(controlMetaDataCancel);
          break;
        case 'Renew':
          yield call(controlMetaDataRenew);
          break;
        default:
          break;
      }
    } else if (payload.requestType === 'GET_METADATA') {
      switch (payload.Mode) {
        case 'Status':
          yield call(getMetaDataStatus);
          break;
        case 'Result':
          yield call(getMetaDataResult);
          break;
        case 'Wait':
          yield delay(500);
          yield call(getMetaDataStatus);
          break;
        default:
          break;
      }
    } else if (payload.requestType === 'GET_POS_EVENT_CONFIG') {
      yield call(getPOSEventConfig);
    } else if (payload.requestType === 'GET_POS_CONFIG') {
      yield call(getPOSConfig);
    }
  }
}

function* asyncCheckPosConfigEvent() {
  while(true) {
    const action = yield take(textSearchActions.CHECK_POS_EVENT_CONFIG);
    const param = {
      DeviceIDList: action.payload.deviceID,
    };

    const { data: { POSDevices }} = yield SunapiClient.get(GET_POS_CONFIG_URL, param);
    // POS 설정 값을 세팅하는 부분이 추후에 통합이나 값의 형태가 정해져야한다.
    yield put(setPosEvent({
      posEvent: {
        ...action.payload,
        channelIDList: POSDevices[0].ChannelIDList.map(channel => Number(channel)),
        deviceName: POSDevices[0].DeviceName,
        encodingType: POSDevices[0].EncodingType,
      },
    }))
  }
}

export default function* rootSearchSaga() {
  yield all([
    watchRequests(),
    asyncCheckPosConfigEvent(),
  ]);
}

import {
  take,
  all,
  put,
  // call,
  // actionChannel,
  // select,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as eventSearchActions from 'store/modules/eventSearch/eventSearchModule';

const CALENDAR_SEARCH_URL = '/stw-cgi/recording.cgi?msubmenu=calendarsearch&action=view';

function* asyncGetCalendarSearch() {
  while (true) {
    const action = yield take(eventSearchActions.FIND_RECORDING_DATE);

    try {
      const param = {
        Month: action.payload.date,
        ChannelIDList: action.payload.index,
      };
      const result = yield SunapiClient.get(CALENDAR_SEARCH_URL, param);

      const successData = {
        ...result.data,
        requestData: param,
      };

      yield put(eventSearchActions.findRecordingDateSuccess(successData));
    } catch (error) {
      yield put(eventSearchActions.findRecordingDateFailure());
    }
  }
}

export default function* rootSearchSaga() {
  yield all([
    asyncGetCalendarSearch(),
  ]);
}

import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as liveRecordStatusActions from 'store/modules/liveRecordStatus/liveRecordStatusModule';

function* asyncGetLiveStatusSaga() {
  while (true) {
    yield take(liveRecordStatusActions.GET_LIVE_STATUS);
    try {
      const liveStatus = yield SunapiClient.get('index.php/common/get_live_status');
      console.log('!!! live status', liveStatus.data);
      yield put(liveRecordStatusActions.getLiveStatusSuccess(liveStatus));
    } catch (e) {
      console.log('[Status] GET Live Status Failed');
    }
  }
}

function* asyncGetRecordStatusSaga() {
  while (true) {
    yield take(liveRecordStatusActions.GET_RECORD_STATUS);
    try {
      const recordStatus = yield SunapiClient.get('index.php/common/get_record_status');
      console.log('!!! record status', recordStatus.data);
      yield put(liveRecordStatusActions.getLiveStatusSuccess(recordStatus));
    } catch (e) {
      console.log('[Status] GET Record Status Failed');
    }
  }
}

export default function* rootLangSaga() {
  yield all([
    asyncGetLiveStatusSaga(),
    asyncGetRecordStatusSaga(),
  ]);
}

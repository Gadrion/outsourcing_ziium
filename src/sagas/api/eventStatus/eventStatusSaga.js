import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as eventStatusActions from 'store/modules/eventStatus/eventStatusModule';

function* asyncGetEventStatusSaga() {
  while (true) {
    const action = yield take(eventStatusActions.GET_EVENT_STATUS);
    try {
      const { supportEvents } = action.payload;
      const data = {
        SystemEvent: supportEvents.toString(),
      };
      const eventStatus = yield SunapiClient.get('/stw-cgi/eventstatus.cgi?msubmenu=eventstatus&action=check', data);
      const authority = yield SunapiClient.get('/stw-cgi/security.cgi?msubmenu=authority&action=view');
      // console.log('!!!', eventStatus.data, authority.data);
      yield put(eventStatusActions.getEventStatusSuccess({
        eventStatus: eventStatus.data.SystemEvent,
        authority: authority.data,
      }));
    } catch (e) {
      yield put(eventStatusActions.getEventStatusFailure(e));
    }
  }
}

export default function* rootLangSaga() {
  yield all([
    asyncGetEventStatusSaga(),
  ]);
}

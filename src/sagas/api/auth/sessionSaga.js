import {
  take, all, put,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as preLoadActions from 'store/modules/page/preLoadModule';

function* asyncSessionKeyGetSaga() {
  while (true) {
    yield take(preLoadActions.SESSION_KEY_GET);

    try {
      const sessionkey = yield SunapiClient.get('/stw-cgi/media.cgi?msubmenu=sessionkey&action=view');

      yield put(preLoadActions.sessionKeyGetSucces(sessionkey.data));
    } catch (err) {
      yield put(preLoadActions.sessionKeyGetFailure(''));
    }
  }
}

export default function* rootSessionSaga() {
  yield all([
    asyncSessionKeyGetSaga(),
  ]);
}

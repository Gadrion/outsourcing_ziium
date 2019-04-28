import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import { Auth, Http } from 'util/lib';
import * as loginActions from 'store/modules/login/loginModule';

const url = '/index.php';
// const url = '/stw-cgi/system.cgi?msubmenu=deviceinfo&action=view';

function* asyncLoginSaga() {
  while (true) {
    const action = yield take(loginActions.LOGIN);
    yield put(loginActions.loginPendding(true));
    try {
      yield Http.post({
        url,
        ...action.payload,
      });

      Auth.makeAuthData(action.payload);
      yield put(loginActions.loginSuccess());
      Auth.loginSuccess();
      action.payload.history.push('/live');
    } catch (error) {
      if (typeof error.response === 'undefined') {
        yield put(loginActions.loginFailure({ errorCode: null }));
        Auth.loginFailed();
      } else {
        const {
          userid,
          password,
          history,
        } = action.payload;

        const authData = {
          header: error.response.headers,
          userid,
          password,
        };

        Auth.makeAuthData(authData);

        try {
          yield Http.post({ url });
          yield put(loginActions.loginSuccess());
          Auth.loginSuccess();
          history.push('/live');
        } catch (_) {
          yield put(loginActions.loginFailure({ errorCode: error.response.status }));
          Auth.loginFailed();
        }
      }
    }
  }
}

export default function* rootLoginSaga() {
  yield all([
    asyncLoginSaga(),
  ]);
}

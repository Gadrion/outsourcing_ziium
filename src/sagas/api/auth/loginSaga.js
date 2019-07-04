import {
  take,
  put,
  all,
  call,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as firebase from 'firebase';
import * as loginActions from 'store/modules/login/loginModule';

const authStateChanged = () => (
  eventChannel(emit => (
    firebase.auth().onAuthStateChanged(userInfo => emit({ userInfo }))
  ))
);

function* asyncLoginSaga() {
  while (true) {
    yield take(loginActions.LOGIN);
    const authProvier = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();

    yield put(loginActions.loginPendding(true));

    try {
      const authChannel = yield call(authStateChanged);
      const { userInfo } = yield take(authChannel);

      if (!userInfo) {
        const loginInfo = yield auth.signInWithPopup(authProvier);
        yield put(loginActions.loginFailure({
          userInfo: loginInfo,
        }));
      } else {
        const adminData = yield firebase.database().ref('admin').once('value');
        const adminList = Object.keys(adminData.val());

        const isAdmin = adminList.find(admin => admin === userInfo.email.split('@')[0]);
        yield put(loginActions.loginSuccess({
          userInfo,
          isAdmin: !!isAdmin,
        }));
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}

export default function* rootLoginSaga() {
  yield all([
    asyncLoginSaga(),
  ]);
}

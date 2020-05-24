import {
  take, all, put, select,
} from 'redux-saga/effects';
import { database } from 'firebase';

import {
  GET_CURRENT_FORM, UPDATE_CURRENT_FORM,
  setForm,
} from 'store/modules/stuff/stuffModule';

const stuffRef = id => database().ref(`map/${id}`);

function* asyncGetStuff() {
  while (true) {
    const { payload } = yield take(GET_CURRENT_FORM);

    try {
      const result = yield stuffRef(payload.id).get();

      yield put(setForm(result));
    } catch (err) {
      // yield put(preLoadActions.sessionKeyGetFailure(''));
    }
  }
}

function* asyncUpdateStuff() {
  while (true) {
    yield take(UPDATE_CURRENT_FORM);
    try {
      const payload = yield select(({ stuffModule }) => stuffModule);
      console.log(payload.toJS());
      // const result = yield stuffRef(payload.id).set({ payload });

      // yield put(setForm(result));
    } catch (err) {
      // yield put(preLoadActions.sessionKeyGetFailure(''));
    }
  }
}

export default function* rootStuffSaga() {
  yield all([
    asyncGetStuff(),
    asyncUpdateStuff(),
  ]);
}

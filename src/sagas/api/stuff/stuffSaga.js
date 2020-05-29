import {
  take, all, put, select, getContext,
} from 'redux-saga/effects';
import { database } from 'firebase';

import {
  GET_CURRENT_FORM, UPDATE_CURRENT_FORM, DELETE_CURRENT_FORM,
  setForm,
} from 'store/modules/stuff/stuffModule';
import { updateMapData } from 'store/modules/firebase/mapModule';

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
      const {
        name = '', option = {}, imageFiles = [], memo = '',
      } = yield select(({ stuffModule }) => stuffModule.toJS());
      const map = yield select(({ mapModule }) => mapModule.toJS());
      yield put(updateMapData({
        ...map,
        history: map.history || [],
        label: name,
        option,
        imageFiles,
        memo,
      }));
    } catch (err) {
      console.error(err);
      // yield put(preLoadActions.sessionKeyGetFailure(''));
    }
  }
}

function* asyncDeleteStuff() {
  while (true) {
    const { payload: id } = yield take(DELETE_CURRENT_FORM);
    try {
      console.log(id);
      // const result = yield stuffRef(payload.id).set({ payload });

      // yield put(setForm(result));
      const history = yield getContext('history');
      history.push('/');
    } catch (err) {
      // yield put(preLoadActions.sessionKeyGetFailure(''));
    }
  }
}

export default function* rootStuffSaga() {
  yield all([
    asyncGetStuff(), // yield takeEvery(GET_CURRENT_FORM, asyncGetStuff);
    asyncUpdateStuff(),
    asyncDeleteStuff(),
  ]);
}

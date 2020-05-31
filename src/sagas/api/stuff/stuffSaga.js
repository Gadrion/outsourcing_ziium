import {
  take, all, put, select, getContext,
} from 'redux-saga/effects';
import { database } from 'firebase';

import {
  GET_CURRENT_FORM, UPDATE_CURRENT_FORM, DELETE_CURRENT_FORM,
  setForm,
  SET_MODAL_OPEN, setImageData,
} from 'store/modules/stuff/stuffModule';
import { updateMapData } from 'store/modules/firebase/mapModule';
import * as firebase from 'firebase';

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

const firebaseStorageGet = (placeId, imageFile) => new Promise((resolve, reject) => {
  const mapRef = firebase.storage().ref().child(`map/${placeId}/${imageFile.name}`);
  mapRef.getDownloadURL().then(url => {
    // const response = await fetch(url);
    // const data = await response.blob();
    // const metadata = {
    //   type: imageFile.type
    // };
    // const file = new File([data], imageFile.name, metadata);
    // console.log('url', url);
    // console.log('file', file);
    resolve({
      url,
      ...imageFile,
      status: 'get',
    });
  });
});

function* asyncGetStuffImageData() {
  while (true) {
    const { payload: isOpen } = yield take(SET_MODAL_OPEN);

    try {
      if (isOpen) {
        const stuffState = yield select(state => state.stuffModule);
        const { placeId, imageFiles } = stuffState.toJS();
        const tempImageFiles = [];
        for (let i = 0; i < imageFiles.length; i++ ) {
          const result = yield firebaseStorageGet(placeId, imageFiles[i]);
          tempImageFiles.push(result);
        }
        yield put(setImageData({ imageFiles: tempImageFiles }));
      } else {
        yield put(setImageData({ imageFiles: [] }));
      }

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
    asyncGetStuffImageData(),
  ]);
}

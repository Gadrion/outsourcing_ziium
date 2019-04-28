import {
  take,
  put,
  all,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as headerActions from 'store/modules/header/headerModule';

function* asyncGetModelNameSaga() {
  while (true) {
    yield take(headerActions.GET_MODELNAME);
    yield put(headerActions.getmodelName(true));

    try {
      console.log('getmodelNameSuccess 실행', headerActions);
      const model = yield SunapiClient.get('/stw-cgi/system.cgi?msubmenu=deviceinfo&action=view');

      yield put(headerActions.getmodelNameSuccess({
        modelName: model.data.DeviceName,
      }));
    } catch (error) {
      console.log('getmodelNameFailure');
      yield put(headerActions.getmodelNameFailure({ errorCode: null }));
    }
  }
}

export default function* rootHeaderSaga() {
  yield all([
    asyncGetModelNameSaga(),
  ]);
}

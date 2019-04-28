import {
  take,
  all,
  put,
  call,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as ptzZoomFocusActions from 'store/modules/ptz/ptzZoomFocusModule';

const CONTROL_AUTO_FOCUS_URL = '/stw-cgi/image.cgi?msubmenu=focus&action=control&Mode=AutoFocus';
const CONTROL_FOCUS_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=continuous&action=control';
const CONTROL_ZOOM_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=continuous&action=control&NormalizedSpeed=True';
const CONTROL_STOP_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=stop&action=control&OperationType=All';

function* asyncControlAutoFocus() {
  while (true) {
    try {
      const { payload } = yield take(ptzZoomFocusActions.CONTROL_AUTO_FOCUS);
      const promise = yield call([SunapiClient, 'get'], CONTROL_AUTO_FOCUS_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzZoomFocusActions.controlFocusSuccess());
      } else {
        yield put(ptzZoomFocusActions.controlFocusFail());
      }
    } catch (exception) {
      yield put(ptzZoomFocusActions.controlFocusFail());
    }
  }
}

function* asyncControlFocus() {
  while (true) {
    try {
      const { payload } = yield take(ptzZoomFocusActions.CONTROL_FOCUS);
      const promise = yield call([SunapiClient, 'get'], CONTROL_FOCUS_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzZoomFocusActions.controlFocusSuccess());
      } else {
        yield put(ptzZoomFocusActions.controlFocusFail());
      }
    } catch (exception) {
      yield put(ptzZoomFocusActions.controlFocusFail());
    }
  }
}

function* asyncControlZoom() {
  while (true) {
    try {
      const { payload } = yield take(ptzZoomFocusActions.CONTROL_ZOOM);
      const promise = yield call([SunapiClient, 'get'], CONTROL_ZOOM_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzZoomFocusActions.controlZoomSuccess());
        yield put(ptzZoomFocusActions.controlStop(payload.Channel));
      } else {
        yield put(ptzZoomFocusActions.controlZoomFail());
      }
    } catch (exception) {
      yield put(ptzZoomFocusActions.controlZoomFail());
    }
  }
}

function* asyncControlStop() {
  while (true) {
    try {
      const { payload } = yield take(ptzZoomFocusActions.CONTROL_STOP);
      const promise = yield call([SunapiClient, 'get'], CONTROL_STOP_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzZoomFocusActions.controlStopSuccess());
      } else {
        yield put(ptzZoomFocusActions.controlStopFail());
      }
    } catch (exception) {
      yield put(ptzZoomFocusActions.controlStopFail());
    }
  }
}

export default function* rootPTZZoomFocusSaga() {
  yield all([
    asyncControlAutoFocus(),
    asyncControlFocus(),
    asyncControlZoom(),
    asyncControlStop(),
  ]);
}

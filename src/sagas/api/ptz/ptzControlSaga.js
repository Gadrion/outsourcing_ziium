import { buffers } from 'redux-saga';
import {
  take,
  all,
  put,
  actionChannel,
  call,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as ptzControlActions from 'store/modules/ptz/ptzControlModule';

const CONTROL_AREAZOOM_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=areazoom&action=control&Type=ZoomIn';
const CONTROL_CONTINUOUS_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=continuous&action=control';
// const CONTROL_STOP_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=stop&
// action=control&OperationType=All';
const CONTROL_STOP_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=continuous&action=control&Pan=0&Tilt=0&Zoom=0';
const SET_AUTOTRACKING_URL = '/stw-cgi/eventsources.cgi?msubmenu=autotracking&action=set';
const SET_MANUALTRACKING_URL = '/stw-cgi/eventsources.cgi?msubmenu=autotracking&action=control';

function* controlAreaZoom(params) {
  try {
    const promise = yield call([SunapiClient, 'get'], CONTROL_AREAZOOM_URL, params);
    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(ptzControlActions.controlAreaZoomSuccess());
    } else {
      yield put(ptzControlActions.controlAreaZoomFail());
    }
  } catch (exception) {
    yield put(ptzControlActions.controlAreaZoomFail());
  }
}

function* controlContinuous(params) {
  try {
    const promise = yield call([SunapiClient, 'get'], CONTROL_CONTINUOUS_URL, params);
    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(ptzControlActions.controlContinuousSuccess());
    } else {
      yield put(ptzControlActions.controlContinuousFail());
    }
  } catch (exception) {
    yield put(ptzControlActions.controlContinuousFail());
  }
}

function* controlStop(params) {
  try {
    const promise = yield call([SunapiClient, 'get'], CONTROL_STOP_URL, params);
    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(ptzControlActions.controlStopSuccess());
    } else {
      yield put(ptzControlActions.controlStopFail());
    }
  } catch (exception) {
    yield put(ptzControlActions.controlStopFail());
  }
}

function* setAutoTracking(params) {
  try {
    const promise = yield call([SunapiClient, 'get'], SET_AUTOTRACKING_URL, params);
    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(ptzControlActions.setAutoTrackingSuccess());
    } else {
      yield put(ptzControlActions.setAutoTrackingFail());
    }
  } catch (exception) {
    yield put(ptzControlActions.setAutoTrackingFail());
  }
}

function* setManualTracking(params) {
  try {
    const promise = yield call([SunapiClient, 'get'], SET_MANUALTRACKING_URL, params);
    if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
      yield put(ptzControlActions.setManualTrackingSuccess());
    } else {
      yield put(ptzControlActions.setManualTrackingFail());
    }
  } catch (exception) {
    yield put(ptzControlActions.setManualTrackingFail());
  }
}

function* watchRequests() {
  const request = yield actionChannel(ptzControlActions.REQUEST_PTZ_CONTROL, buffers.expanding());
  while (true) {
    const { payload } = yield take(request);

    if (payload.requestType === 'CONTROL_CONTINUOUS') {
      yield call(controlContinuous, payload.params);
    } else if (payload.requestType === 'CONTROL_STOP') {
      yield call(controlStop, payload.params);
    } else if (payload.requestType === 'CONTROL_AREAZOOM') {
      yield call(controlAreaZoom, payload.params);
    } else if (payload.requestType === 'SET_AUTOTRACKING') {
      yield call(setAutoTracking, payload.params);
    } else if (payload.requestType === 'SET_MANUALTRACKING') {
      yield call(setManualTracking, payload.params);
    }
  }
}

export default function* rootPTZControlSaga() {
  yield all([
    watchRequests(),
  ]);
}

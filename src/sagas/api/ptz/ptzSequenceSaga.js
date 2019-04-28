import {
  take,
  all,
  put,
  call,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import * as ptzSequenceActions from 'store/modules/ptz/ptzSequenceModule';

const GET_PRESET_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=preset&action=view';
const ADD_PRESET_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=preset&action=add';
const DELETE_PRESET_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=preset&action=remove';
const CONTROL_PRESET_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=preset&action=control';
const GET_SWING_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=swing&action=view';
const CONTROL_SWING_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=swing&action=control';
const GET_GROUP_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=group&action=view';
const CONTROL_GROUP_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=group&action=control';
const GET_TOUR_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=tour&action=view';
const CONTROL_TOUR_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=tour&action=control';
const GET_TRACE_URL = '/stw-cgi/ptzconfig.cgi?msubmenu=trace&action=view';
const CONTROL_TRACE_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=trace&action=control';
const CONTROL_HOME_URL = '/stw-cgi/ptzcontrol.cgi?msubmenu=home&action=control';

function* asyncGetPreset() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.GET_PRESET);
      const promise = yield call([SunapiClient, 'get'], GET_PRESET_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.getPresetSuccess(promise.data.PTZPresets[0].Presets));
      } else {
        yield put(ptzSequenceActions.getPresetFail());
      }
      yield put(ptzSequenceActions.setPresetPending(false));
    } catch (exception) {
      yield put(ptzSequenceActions.getPresetFail());
      yield put(ptzSequenceActions.setPresetPending(false));
    }
  }
}

function* asyncAddPreset() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.ADD_PRESET);
      const promise = yield call([SunapiClient, 'get'], ADD_PRESET_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.addPresetSuccess());
      } else {
        yield put(ptzSequenceActions.addPresetFail());
      }
      const channelParam = {
        Channel: payload.Channel,
      };
      yield put(ptzSequenceActions.getPreset(channelParam));
      // yield call([SunapiClient, 'get'], GET_PRESET_URL, channelParam);
    } catch (exception) {
      yield put(ptzSequenceActions.addPresetFail());
    }
  }
}

function* asyncDeletePreset() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.DELETE_PRESET);
      const promise = yield call([SunapiClient, 'get'], DELETE_PRESET_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.deletePresetSuccess());
      } else {
        yield put(ptzSequenceActions.deletePresetFail());
      }
      const channelParam = {
        Channel: payload.Channel,
      };
      yield put(ptzSequenceActions.getPreset(channelParam));
      // yield call([SunapiClient, 'get'], GET_PRESET_URL, channelParam);
    } catch (exception) {
      yield put(ptzSequenceActions.deletePresetFail());
    }
  }
}

function* asyncControlPreset() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_PRESET);
      const promise = yield call([SunapiClient, 'get'], CONTROL_PRESET_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlPresetSuccess());
      } else {
        yield put(ptzSequenceActions.controlPresetFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlPresetFail());
    }
  }
}

function* asyncGetSwing() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.GET_SWING);
      const promise = yield call([SunapiClient, 'get'], GET_SWING_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.getSwingSuccess(promise.data.PTZSwing));
      } else {
        yield put(ptzSequenceActions.getSwingFail());
      }
      yield put(ptzSequenceActions.setSwingPending(false));
    } catch (exception) {
      yield put(ptzSequenceActions.getSwingFail());
      yield put(ptzSequenceActions.setSwingPending(false));
    }
  }
}

function* asyncControlSwing() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_SWING);
      const promise = yield call([SunapiClient, 'get'], CONTROL_SWING_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlSwingSuccess());
      } else {
        yield put(ptzSequenceActions.controlSwingFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlSwingFail());
    }
  }
}

function* asyncGetGroup() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.GET_GROUP);
      const promise = yield call([SunapiClient, 'get'], GET_GROUP_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.getGroupSuccess(promise.data.PTZGroups[0].Groups));
      } else {
        yield put(ptzSequenceActions.getGroupFail());
      }
      yield put(ptzSequenceActions.setGroupPending(false));
    } catch (exception) {
      yield put(ptzSequenceActions.getGroupFail());
      yield put(ptzSequenceActions.setGroupPending(false));
    }
  }
}

function* asyncControlGroup() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_GROUP);
      const promise = yield call([SunapiClient, 'get'], CONTROL_GROUP_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlGroupSuccess());
      } else {
        yield put(ptzSequenceActions.controlGroupFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlGroupFail());
    }
  }
}

function* asyncGetTour() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.GET_TOUR);
      const promise = yield call([SunapiClient, 'get'], GET_TOUR_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.getTourSuccess(promise.data.PTZTours[0].Tours));
      } else {
        yield put(ptzSequenceActions.getTourFail());
      }
      yield put(ptzSequenceActions.setTourPending(false));
    } catch (exception) {
      yield put(ptzSequenceActions.getTourFail());
      yield put(ptzSequenceActions.setTourPending(false));
    }
  }
}

function* asyncControlTour() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_TOUR);
      const promise = yield call([SunapiClient, 'get'], CONTROL_TOUR_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlTourSuccess());
      } else {
        yield put(ptzSequenceActions.controlTourFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlTourFail());
    }
  }
}

function* asyncGetTrace() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.GET_TRACE);
      const promise = yield call([SunapiClient, 'get'], GET_TRACE_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.getTraceSuccess(promise.data.PTZTraces[0].Traces));
      } else {
        yield put(ptzSequenceActions.getTraceFail());
      }
      yield put(ptzSequenceActions.setTracePending(false));
    } catch (exception) {
      yield put(ptzSequenceActions.getTraceFail());
      yield put(ptzSequenceActions.setTracePending(false));
    }
  }
}

function* asyncControlTrace() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_TRACE);
      const promise = yield call([SunapiClient, 'get'], CONTROL_TRACE_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlTraceSuccess());
      } else {
        yield put(ptzSequenceActions.controlTraceFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlTraceFail());
    }
  }
}

function* asyncControlHome() {
  while (true) {
    try {
      const { payload } = yield take(ptzSequenceActions.CONTROL_HOME);
      const promise = yield call([SunapiClient, 'get'], CONTROL_HOME_URL, payload);
      if (promise.status === 200 && typeof promise.data.Error === 'undefined') {
        yield put(ptzSequenceActions.controlHomeSuccess());
      } else {
        yield put(ptzSequenceActions.controlHomeFail());
      }
    } catch (exception) {
      yield put(ptzSequenceActions.controlHomeFail());
    }
  }
}

export default function* rootPTZSequenceSaga() {
  yield all([
    asyncGetPreset(),
    asyncAddPreset(),
    asyncDeletePreset(),
    asyncControlPreset(),
    asyncGetSwing(),
    asyncControlSwing(),
    asyncGetGroup(),
    asyncControlGroup(),
    asyncGetTour(),
    asyncControlTour(),
    asyncGetTrace(),
    asyncControlTrace(),
    asyncControlHome(),
  ]);
}

import {
  take,
  all,
  select,
  put,
  call,
} from 'redux-saga/effects';
import { SunapiClient } from 'util/lib';
import { setTileCameraList } from 'store/modules/camera/cameraInfoModule';
import * as liveMediaControlActions from 'store/modules/mediaControl/liveMediaControlModule';
import staticLayoutPattern from 'wisenet-ui/util/static/constants/layoutPattern/staticLayoutPattern';

function* asyncAlarmStopSaga() {
  while (true) {
    yield take(liveMediaControlActions.ALARM_STOP);
    try {
      SunapiClient.get('/stw-cgi/io.cgi?msubmenu=alarmreset&action=control');
    } catch (error) {
      console.log('[Error] Alarm stop cgi failed');
    }
  }
}

function* asyncManualRecordingStartSaga() {
  while (true) {
    yield take(liveMediaControlActions.MANULA_RECORDING_START);
    try {
      SunapiClient.get('/stw-cgi/recording.cgi?msubmenu=manualrecording&action=control&Mode=Start');
    } catch (error) {
      console.log('[Error] Menual Recording start cgi failed');
    }
  }
}

function* asyncManualRecordingStopSaga() {
  while (true) {
    yield take(liveMediaControlActions.MANULA_RECORDING_STOP);
    try {
      SunapiClient.get('/stw-cgi/recording.cgi?msubmenu=manualrecording&action=control&Mode=Stop');
    } catch (error) {
      console.log('[Error] Menual Recording stop cgi failed');
    }
  }
}

function* LayoutPageInfomationChange({
  tileCameraListPage,
  layoutPageCurrentNumber,
  layoutPageMaxNumber,
  layoutPagePatternTileCount,
}) {
  yield put(setTileCameraList({
    tileCameraListPage,
  }));

  yield put(liveMediaControlActions.setLayoutPageInfo({
    layoutPageCurrentNumber,
    layoutPageMaxNumber,
    layoutPagePatternTileCount,
  }));
}

function* asyncLayoutPageChangeSaga() {
  while (true) {
    const action = yield take(liveMediaControlActions.PATTERN_CONTROL);
    const { pattern } = action.payload;
    const changeTileCameraListPage = {
      1: [],
    };
    let currentMaxNumber = 1;
    let currentPatternTileCount = 9;

    if (pattern !== 'dynamic') {
      currentPatternTileCount = staticLayoutPattern[pattern].items.length;

      const moduleState = yield select(state => ({
        tileCameraListPage: state.cameraInfoModule.get('tileCameraListPage').toJS(),
      }));

      const { tileCameraListPage } = moduleState;
      const tileCameraListMerge = Object.keys(tileCameraListPage).reduce(
        (res, value) => res.concat(tileCameraListPage[value]), [],
      );
      currentMaxNumber = tileCameraListMerge.length !== 0 ? (
        Math.ceil(tileCameraListMerge.length / currentPatternTileCount)
      ) : 1;

      let pageCount = 1;

      while (tileCameraListMerge.length !== 0) {
        changeTileCameraListPage[pageCount] = tileCameraListMerge.splice(
          0, currentPatternTileCount,
        );
        pageCount += 1;
      }
    }

    yield call(LayoutPageInfomationChange, {
      tileCameraListPage: changeTileCameraListPage,
      layoutPageCurrentNumber: 1,
      layoutPageMaxNumber: currentMaxNumber,
      layoutPagePatternTileCount: currentPatternTileCount,
    });
  }
}

export default function* rootHeaderSaga() {
  yield all([
    asyncAlarmStopSaga(),
    asyncLayoutPageChangeSaga(),
    asyncManualRecordingStartSaga(),
    asyncManualRecordingStopSaga(),
  ]);
}

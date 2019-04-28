import { eventChannel, END, channel } from 'redux-saga';
import {
  take, all, put, call, select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { SunapiClient, XMLParser, Http } from 'util/lib';
import axios, { CancelToken } from 'axios';
import * as postLoadActions from 'store/modules/page/postLoadModule';
import * as textSearchActions from 'store/modules/textSearch/textSearchModule';
import { setCameraList, setCameraEventList } from 'store/modules/camera/cameraInfoModule';
import {
  setAlarmInput,
  setAlarmOutput,
  setAudioOutput,
  setSystemEvent,
} from 'store/modules/system/systemInfomationModule';
import { CameraListUpdateWorker, EventUpdateWorker } from 'util/worker';

const delayTime = (1000) * 5; // 1000 = 1sec

const posEventDiffChannel = channel();

function* asyncCameraListInfomationUpdateWorkerSaga(isWork) {
  if (isWork) {
    const ptzResult = yield SunapiClient.get('stw-cgi/attributes.cgi/attributes/PTZSupport/Support');
    const registerCamResult = yield SunapiClient.get('/stw-cgi/media.cgi?msubmenu=cameraregister&action=view');
    const cameraSoureceResult = yield SunapiClient.get('/stw-cgi/media.cgi?msubmenu=videosource&action=view');
    const convertPtzResult = yield XMLParser.parseAttributeGroupInsideSection(ptzResult.data, 'Preset Swing Group Trace Home Tour PTZLimit  DigitalPTZ AreaZoom DigitalAutoTracking Continuous');
    const recordGeneralResult = yield SunapiClient.get('/stw-cgi/recording.cgi?msubmenu=general&action=view');
    const eventCheckResult = yield SunapiClient.get('/stw-cgi/eventstatus.cgi?msubmenu=eventstatus&action=check');

    CameraListUpdateWorker.postMessage({
      ptzInfoList: convertPtzResult,
      registerCamInfoList: registerCamResult.data.RegisteredCameras,
      cameraSourceInfoList: cameraSoureceResult.data.VideoSources,
      recordGeneralInfoList: recordGeneralResult.data.RecordSetup,
      channelEventInfoList: eventCheckResult.data ? eventCheckResult.data.ChannelEvent : null,
    });

    if (eventCheckResult.data !== '') {
      EventUpdateWorker.postMessage({
        type: 'deviceEvent',
        messageData: {
          alarmInput: eventCheckResult.data.AlarmInput,
          alarmOutput: eventCheckResult.data.AlarmOutput,
          audioOutput: eventCheckResult.data.AudioOutput,
          systemEvent: eventCheckResult.data.SystemEvent,
        }
      });
    }

    const [cameraInfo, eventInfo] = yield all([
      new Promise(resolve => {
        CameraListUpdateWorker.onmessage = ({ data }) => {
          resolve(data);
        };
      }),
      new Promise(resolve => {
        if (eventCheckResult.data !== '') {
          EventUpdateWorker.onmessage = ({ data: { type, postData } }) => {
            if (type === 'deviceEvent') {
              resolve(postData);
            }
            resolve(null);
          };
        } else {
          resolve(null);
        }
      }),
    ]);

    return {
      ...cameraInfo,
      ...eventInfo,
    };
  }

  return null;
}

function* onWorkerCheck() {
  const postLoadState = yield select(state => state.postLoadModule);
  const { cameraListWorker } = postLoadState.toJS();

  const workerResult = yield call(asyncCameraListInfomationUpdateWorkerSaga, cameraListWorker);

  if (workerResult) {
    const {
      cameraList,
      cameraEventList,
      alarmInput,
      alarmOutput,
      audioOutput,
      systemEvent,
    } = workerResult;

    if (cameraList) {
      yield put(setCameraList({ cameraList }));
    }

    if (cameraEventList) {
      yield put(setCameraEventList({ cameraEventList }));
    }

    if (alarmInput) {
      yield put(setAlarmInput({ alarmInput }));
    }

    if (alarmOutput) {
      yield put(setAlarmOutput({ alarmOutput }));
    }

    if (audioOutput) {
      yield put(setAudioOutput({ audioOutput }));
    }

    if (systemEvent) {
      yield put(setSystemEvent({ systemEvent }));
    }
  }
}

function* asyncWorkerSaga() {
  while (true) {
    const action = yield take(postLoadActions.USE_WORKER);
    const { useWorker } = action.payload;

    while (useWorker) {
      yield call(onWorkerCheck);
      yield delay(delayTime);
      // yield put(postLoadActions.checkWorker({
      //   delayTime,
      // })); // log를 위한 action
    }
  }
}

function* watchPosEventChannel() {
  while (true) {
    const { posEvent } = yield take(posEventDiffChannel);
    yield put(textSearchActions.checkPosEventConfig({
      ...posEvent,
    }));
  }
}

function posEventCheckWorker ({ responseText }) {
  EventUpdateWorker.postMessage({
    type: 'posEvent',
    messageData: {
      responseText,
    },
  });

  EventUpdateWorker.onmessage = ({ data: { type, postData } }) => {
    if (type === 'posEvent') {
      posEventDiffChannel.put(postData);
    }
  }
}

function* asyncPosDataChecker() {
  let test = null;
  while (true) {
    const action = yield take(postLoadActions.SET_POS_DATA_CHECK);
    const { posDataCheck } = action.payload;

    if (!test) {
      yield SunapiClient.get('/stw-cgi/recording.cgi?msubmenu=posdata&action=monitordiff', undefined, {
        onDownloadProgress: event => {
          posEventCheckWorker(event.target);
          },
        },
      );
    }
  }
}

export default function* rootUmpInitailizeSaga() {
  yield all([
    asyncWorkerSaga(),
    asyncPosDataChecker(),
    watchPosEventChannel(),
  ]);
}

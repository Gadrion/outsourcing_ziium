import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';

// action
export const SET_POS_EVENT = 'systemEvent/SET_POS_EVENT';
export const SET_ALARM_INPUT = 'systemEvent/SET_ALARM_INPUT';
export const SET_ALARM_OUTPUT = 'systemEvent/SET_ALARM_OUTPUT';
export const SET_AUDIO_OUTPUT = 'systemEvent/SET_AUDIO_OUTPUT';
export const SET_SYSTEM_EVENT = 'systemEvent/SET_SYSTEM_EVENT';

// action create
export const setPosEvent = createAction(SET_POS_EVENT);
export const setAlarmInput = createAction(SET_ALARM_INPUT);
export const setAlarmOutput = createAction(SET_ALARM_OUTPUT);
export const setAudioOutput = createAction(SET_AUDIO_OUTPUT);
export const setSystemEvent = createAction(SET_SYSTEM_EVENT);


const initialState = Map({
  posEvent: Map({
    // channelIDList: [],
    // deviceID: 2,
    // deviceName: 'TEXT 03',
    // encodingType: 'EUC-KR',
    // receipt: '...what the',
    // receivedDate: '2019-04-19T09:43:57Z',
  }),
  alarmInput: Map({
    // 1: false,
  }),
  alarmOutput: Map({
    // 1: false,
  }),
  audioOutput: Map({
    // 1: false,
  }),
  systemEvent: Map({
    // AMDLoadFail: false,
    // adminLogin: false,
    // alarmReset: false,
    // backup: false,
    // batteryFail: false,
    // beingUpdate: false,
    // configChange: false,
    // configRestore: false,
    // dspDisplayStart: false,
    // dspVASystemStart: false,
    // endofFrame: false,
    // fwUpdate: false,
    // factoryReset: false,
    // hddFail: false,
    // hddFull: false,
    // hddNone: false,
    // internalHDDConnect: false,
    // internalHDDErase: false,
    // leftFanError: false,
    // netCamTrafficOverFlow: false,
    // network: false,
    // newFWAvailable: false,
    // overwriteDecoding: false,
    // passwordChange: false,
    // powerOn: false,
    // powerReboot: false,
    // hddRaidDeviceAdd: false,
    // hddRaidEvents: [
    //   {
    //   hddRaid: false,
    //   hddRaidBuildCancel: false,
    //   hddRaidBuildFail: false,
    //   hddRaidBuilding: false,
    //   hddRaidDegrade: false,
    //   hddRaidEnable: false,
    //   hddRaidFail: false,
    //   hddRaidRebuildEnd: false,
    //   hddRaidRebuildFail: false,
    //   hddRaidRebuildStart: false,
    //   hddRaidSetup: false,
    // }],
    // hddRaidRecordRestriction: false,
    // recordFiltering: false,
    // recordFrameDrop: false,
    // recording: false,
    // recordingError: false,
    // rightFanError: false,
    // timeChange: false,
    // usbHDDConnect: false,
    // iSCSIDisconnect: false,
  }),
});

// reducer
export default handleActions({
  [SET_POS_EVENT]: (state, { payload: { posEvent } }) => (
    state.set('posEvent', fromJS(posEvent))
  ),
  [SET_ALARM_INPUT]: (state, { payload: { alarmInput } }) => (
    state.set('alarmInput', fromJS(alarmInput))
  ),
  [SET_ALARM_OUTPUT]: (state, { payload: { alarmOutput } }) => (
    state.set('alarmOutput', fromJS(alarmOutput))
  ),
  [SET_AUDIO_OUTPUT]: (state, { payload: { audioOutput } }) => (
    state.set('audioOutput', fromJS(audioOutput))
  ),
  [SET_SYSTEM_EVENT]: (state, { payload: { systemEvent } }) => (
    state.set('systemEvent', fromJS(systemEvent))
  ),
}, initialState);

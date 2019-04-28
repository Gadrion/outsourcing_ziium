import {
  createAction,
  handleActions,
} from 'redux-actions';
import { Map } from 'immutable';

// Preset
export const GET_PRESET = 'ptzSequence/GET_PRESET';
export const GET_PRESET_SUCCESS = 'ptzSequence/GET_PRESET_SUCCESS';
export const GET_PRESET_FAIL = 'ptzSequence/GET_PRESET_FAIL';
export const ADD_PRESET = 'ptzSequence/ADD_PRESET';
export const ADD_PRESET_SUCCESS = 'ptzSequence/ADD_PRESET_SUCCESS';
export const ADD_PRESET_FAIL = 'ptzSequence/ADD_PRESET_FAIL';
export const DELETE_PRESET = 'ptzSequence/DELETE_PRESET';
export const DELETE_PRESET_SUCCESS = 'ptzSequence/DELETE_PRESET_SUCCESS';
export const DELETE_PRESET_FAIL = 'ptzSequence/DELETE_PRESET_FAIL';
export const SET_PRESET_PENDING = 'ptzSequence/SET_PRESET_PENDING';
export const SET_CURRENT_PRESET = 'ptzSequence/SET_CURRENT_PRESET';
export const SET_CURRENT_PRESET_NAME = 'ptzSequence/SET_PRESET_NAME';
export const SET_MAX_PRESET = 'ptzSequence/SET_MAX_PRESET';
export const CONTROL_PRESET = 'ptzSequence/CONTROL_PRESET';
export const CONTROL_PRESET_SUCCESS = 'ptzSequence/CONTROL_PRESET_SUCCESS';
export const CONTROL_PRESET_FAIL = 'ptzSequence/CONTROL_PRESET_FAIL';

export const getPreset = createAction(GET_PRESET);
export const getPresetSuccess = createAction(GET_PRESET_SUCCESS);
export const getPresetFail = createAction(GET_PRESET_FAIL);
export const addPreset = createAction(ADD_PRESET);
export const addPresetSuccess = createAction(ADD_PRESET_SUCCESS);
export const addPresetFail = createAction(ADD_PRESET_FAIL);
export const deletePreset = createAction(DELETE_PRESET);
export const deletePresetSuccess = createAction(DELETE_PRESET_SUCCESS);
export const deletePresetFail = createAction(DELETE_PRESET_FAIL);
export const setPresetPending = createAction(SET_PRESET_PENDING);
export const setCurrentPreset = createAction(SET_CURRENT_PRESET);
export const setCurrentPresetName = createAction(SET_CURRENT_PRESET_NAME);
export const setMaxPreset = createAction(SET_MAX_PRESET);
export const controlPreset = createAction(CONTROL_PRESET);
export const controlPresetSuccess = createAction(CONTROL_PRESET_SUCCESS);
export const controlPresetFail = createAction(CONTROL_PRESET_FAIL);

// Swing
export const GET_SWING = 'ptzSequence/GET_SWING';
export const GET_SWING_SUCCESS = 'ptzSequence/GET_SWING_SUCCESS';
export const GET_SWING_FAIL = 'ptzSequence/GET_SWING_FAIL';
export const SET_SWING_PENDING = 'ptzSequence/SET_SWING_PENDING';
export const CONTROL_SWING = 'ptzSequence/CONTROL_SWING';
export const CONTROL_SWING_SUCCESS = 'ptzSequence/CONTROL_SWING_SUCCESS';
export const CONTROL_SWING_FAIL = 'ptzSequence/CONTROL_SWING_FAIL';

export const getSwing = createAction(GET_SWING);
export const getSwingSuccess = createAction(GET_SWING_SUCCESS);
export const getSwingFail = createAction(GET_SWING_FAIL);
export const setSwingPending = createAction(SET_SWING_PENDING);
export const controlSwing = createAction(CONTROL_SWING);
export const controlSwingSuccess = createAction(CONTROL_SWING_SUCCESS);
export const controlSwingFail = createAction(CONTROL_SWING_FAIL);

// Group
export const GET_GROUP = 'ptzSequence/GET_GROUP';
export const GET_GROUP_SUCCESS = 'ptzSequence/GET_GROUP_SUCCESS';
export const GET_GROUP_FAIL = 'ptzSequence/GET_GROUP_FAIL';
export const SET_GROUP_PENDING = 'ptzSequence/SET_GROUP_PENDING';
export const CONTROL_GROUP = 'ptzSequence/CONTROL_GROUP';
export const CONTROL_GROUP_SUCCESS = 'ptzSequence/CONTROL_GROUP_SUCCESS';
export const CONTROL_GROUP_FAIL = 'ptzSequence/CONTROL_GROUP_FAIL';

export const getGroup = createAction(GET_GROUP);
export const getGroupSuccess = createAction(GET_GROUP_SUCCESS);
export const getGroupFail = createAction(GET_GROUP_FAIL);
export const setGroupPending = createAction(SET_GROUP_PENDING);
export const controlGroup = createAction(CONTROL_GROUP);
export const controlGroupSuccess = createAction(CONTROL_GROUP_SUCCESS);
export const controlGroupFail = createAction(CONTROL_GROUP_FAIL);

// Tour
export const GET_TOUR = 'ptzSequence/GET_TOUR';
export const GET_TOUR_SUCCESS = 'ptzSequence/GET_TOUR_SUCCESS';
export const GET_TOUR_FAIL = 'ptzSequence/GET_TOUR_FAIL';
export const SET_TOUR_PENDING = 'ptzSequence/SET_TOUR_PENDING';
export const CONTROL_TOUR = 'ptzSequence/CONTROL_TOUR';
export const CONTROL_TOUR_SUCCESS = 'ptzSequence/CONTROL_TOUR_SUCCESS';
export const CONTROL_TOUR_FAIL = 'ptzSequence/CONTROL_TOUR_FAIL';

export const getTour = createAction(GET_TOUR);
export const getTourSuccess = createAction(GET_TOUR_SUCCESS);
export const getTourFail = createAction(GET_TOUR_FAIL);
export const setTourPending = createAction(SET_TOUR_PENDING);
export const controlTour = createAction(CONTROL_TOUR);
export const controlTourSuccess = createAction(CONTROL_TOUR_SUCCESS);
export const controlTourFail = createAction(CONTROL_TOUR_FAIL);

// Trace
export const GET_TRACE = 'ptzSequence/GET_TRACE';
export const GET_TRACE_SUCCESS = 'ptzSequence/GET_TRACE_SUCCESS';
export const GET_TRACE_FAIL = 'ptzSequence/GET_TRACE_FAIL';
export const SET_TRACE_PENDING = 'ptzSequence/SET_TRACE_PENDING';
export const CONTROL_TRACE = 'ptzSequence/CONTROL_TRACE';
export const CONTROL_TRACE_SUCCESS = 'ptzSequence/CONTROL_TRACE_SUCCESS';
export const CONTROL_TRACE_FAIL = 'ptzSequence/CONTROL_TRACE_FAIL';

export const getTrace = createAction(GET_TRACE);
export const getTraceSuccess = createAction(GET_TRACE_SUCCESS);
export const getTraceFail = createAction(GET_TRACE_FAIL);
export const setTracePending = createAction(SET_TRACE_PENDING);
export const controlTrace = createAction(CONTROL_TRACE);
export const controlTraceSuccess = createAction(CONTROL_TRACE_SUCCESS);
export const controlTraceFail = createAction(CONTROL_TRACE_FAIL);

// Home
export const CONTROL_HOME = 'ptzSequence/CONTROL_HOME';
export const CONTROL_HOME_SUCCESS = 'ptzSequence/CONTROL_HOME_SUCCESS';
export const CONTROL_HOME_FAIL = 'ptzSequence/CONTROL_HOME_FAIL';

export const controlHome = createAction(CONTROL_HOME);
export const controlHomeSuccess = createAction(CONTROL_HOME_SUCCESS);
export const controlHomeFail = createAction(CONTROL_HOME_FAIL);

export const SET_PREV_CHANNEL = 'ptzSequence/SET_PREV_CHANNEL';

export const setPrevChannel = createAction(SET_PREV_CHANNEL);

const initialState = Map({
  presetList: null,
  maxPreset: 1,
  currentPreset: 0,
  currentPresetName: '',
  isPresetPending: false,
  swingList: null,
  isSwingPending: false,
  groupList: null,
  isGroupPending: false,
  tourList: null,
  isTourPending: false,
  traceList: null,
  isTracePending: false,
  prevChannel: null,
});

// reducer
export default handleActions({
  [SET_PREV_CHANNEL]: (state, action) => (
    state.set('prevChannel', action.payload)
  ),
  [SET_MAX_PRESET]: (state, action) => (
    state.set('maxPreset', action.payload)
  ),
  [GET_PRESET_SUCCESS]: (state, action) => (
    state
      .set('presetList', action.payload)
      .set('currentPreset', 1)
      .set('currentPresetName', '')
  ),
  [GET_PRESET_FAIL]: state => {
    console.info('get preset failed');
    return state
      .set('presetList', []);
  },
  [ADD_PRESET_SUCCESS]: state => {
    console.info('add preset success');
    return state;
  },
  [ADD_PRESET_FAIL]: state => {
    console.info('add preset failed');
    return state;
  },
  [DELETE_PRESET_SUCCESS]: state => {
    console.info('delete preset success');
    return state;
  },
  [DELETE_PRESET_FAIL]: state => {
    console.info('delete preset failed');
    return state;
  },
  [SET_PRESET_PENDING]: (state, action) => (
    state.set('isPresetPending', action.payload)
  ),
  [CONTROL_PRESET_SUCCESS]: () => (
    console.log('control preset success')
  ),
  [CONTROL_PRESET_FAIL]: () => (
    console.log('control preset fail')
  ),
  [GET_SWING_SUCCESS]: (state, action) => (
    state
      .set('swingList', action.payload)
  ),
  [GET_SWING_FAIL]: state => {
    console.info('get swing failed');
    return state.set('swingList', []);
  },
  [SET_SWING_PENDING]: (state, action) => (
    state.set('isSwingPending', action.payload)
  ),
  [CONTROL_SWING_SUCCESS]: () => (
    console.log('control swing success')
  ),
  [CONTROL_SWING_FAIL]: () => (
    console.log('control swing fail')
  ),
  [GET_GROUP_SUCCESS]: (state, action) => (
    state
      .set('groupList', action.payload)
  ),
  [GET_GROUP_FAIL]: state => {
    console.info('get group failed');
    return state.set('groupList', []);
  },
  [SET_GROUP_PENDING]: (state, action) => (
    state.set('isGroupPending', action.payload)
  ),
  [CONTROL_GROUP_SUCCESS]: () => (
    console.log('control group success')
  ),
  [CONTROL_GROUP_FAIL]: () => (
    console.log('control group fail')
  ),
  [GET_TOUR_SUCCESS]: (state, action) => (
    state
      .set('tourList', action.payload)
  ),
  [GET_TOUR_FAIL]: state => {
    console.info('get tour failed');
    return state.set('tourList', []);
  },
  [SET_TOUR_PENDING]: (state, action) => (
    state.set('isTourPending', action.payload)
  ),
  [CONTROL_TOUR_SUCCESS]: () => (
    console.info('control tour success')
  ),
  [CONTROL_TOUR_FAIL]: () => (
    console.info('control tour fail')
  ),
  [GET_TRACE_SUCCESS]: (state, action) => (
    state
      .set('traceList', action.payload)
  ),
  [GET_TRACE_FAIL]: state => {
    console.info('get trace failed');
    return state.set('traceList', []);
  },
  [SET_TRACE_PENDING]: (state, action) => (
    state.set('isTracePending', action.payload)
  ),
  [CONTROL_TRACE_SUCCESS]: () => (
    console.info('control trace success')
  ),
  [CONTROL_TRACE_FAIL]: () => (
    console.info('control trace fail')
  ),
  [SET_CURRENT_PRESET]: (state, action) => (state.set('currentPreset', action.payload)),
  [SET_CURRENT_PRESET_NAME]: (state, action) => (state.set('currentPresetName', action.payload)),
}, initialState);

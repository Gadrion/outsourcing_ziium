import {
  createAction,
  // handleActions,
} from 'redux-actions';
// import { Map } from 'immutable';

// actionChannel
export const REQUEST_PTZ_CONTROL = 'ptzControl/REQUEST_PTZ_CONTROL';

export const requestPtzControl = createAction(REQUEST_PTZ_CONTROL);

// AreaZoom
export const CONTROL_AREAZOOM = 'ptzControl/CONTROL_AREAZOOM';
export const CONTROL_AREAZOOM_SUCCESS = 'ptzControl/CONTROL_AREAZOOM_SUCCESS';
export const CONTROL_AREAZOOM_FAIL = 'ptzControl/CONTROL_AREAZOOM_FAIL';

export const controlAreaZoom = createAction(CONTROL_AREAZOOM);
export const controlAreaZoomSuccess = createAction(CONTROL_AREAZOOM_SUCCESS);
export const controlAreaZoomFail = createAction(CONTROL_AREAZOOM_FAIL);

// Pan Tilt Zoom
export const CONTROL_CONTINUOUS = 'ptzControl/CONTROL_CONTINUOUS';
export const CONTROL_CONTINUOUS_SUCCESS = 'ptzControl/CONTROL_CONTINUOUS_SUCCESS';
export const CONTROL_CONTINUOUS_FAIL = 'ptzControl/CONTROL_CONTINUOUS_FAIL';

export const controlContinuous = createAction(CONTROL_CONTINUOUS);
export const controlContinuousSuccess = createAction(CONTROL_CONTINUOUS_SUCCESS);
export const controlContinuousFail = createAction(CONTROL_CONTINUOUS_FAIL);

// Stop
export const CONTROL_STOP = 'ptzControl/CONTROL_STOP';
export const CONTROL_STOP_SUCCESS = 'ptzControl/CONTROL_STOP_SUCCESS';
export const CONTROL_STOP_FAIL = 'ptzControl/CONTROL_STOP_FAIL';

export const controlStop = createAction(CONTROL_STOP);
export const controlStopSuccess = createAction(CONTROL_STOP_SUCCESS);
export const controlStopFail = createAction(CONTROL_STOP_FAIL);

// AutoTracking
export const SET_AUTOTRACKING = 'ptzControl/SET_AUTOTRACKING';
export const SET_AUTOTRACKING_SUCCESS = 'ptzControl/SET_AUTOTRACKING_SUCCESS';
export const SET_AUTOTRACKING_FAIL = 'ptzControl/SET_AUTOTRACKING_FAIL';

export const setAutoTracking = createAction(SET_AUTOTRACKING);
export const setAutoTrackingSuccess = createAction(SET_AUTOTRACKING_SUCCESS);
export const setAutoTrackingFail = createAction(SET_AUTOTRACKING_FAIL);

// ManualTracking
export const SET_MANUALTRACKING = 'ptzControl/SET_MANUALTRACKING';
export const SET_MANUALTRACKING_SUCCESS = 'ptzControl/SET_MANUALTRACKING_SUCCESS';
export const SET_MANUALTRACKING_FAIL = 'ptzControl/SET_MANUALTRACKING_FAIL';

export const setManualTracking = createAction(SET_MANUALTRACKING);
export const setManualTrackingSuccess = createAction(SET_MANUALTRACKING_SUCCESS);
export const setManualTrackingFail = createAction(SET_MANUALTRACKING_FAIL);

// const initialState = Map({
// });

// // reducer
// export default handleActions({
//   [CONTROL_AREAZOOM_SUCCESS]: () => (
//     console.log('control areazoom success')
//   ),
//   [CONTROL_AREAZOOM_FAIL]: () => (
//     console.log('control areazoom fail')
//   ),
//   [CONTROL_CONTINUOUS_SUCCESS]: () => (
//     console.log('control continuous success')
//   ),
//   [CONTROL_CONTINUOUS_FAIL]: () => (
//     console.log('control continuous fail')
//   ),
//   [CONTROL_STOP_SUCCESS]: () => (
//     console.log('control stop success')
//   ),
//   [CONTROL_STOP_FAIL]: state => {
//     console.log('control stop fail');
//     return state;
//   },
// }, initialState);

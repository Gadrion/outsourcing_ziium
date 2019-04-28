import {
  createAction,
  handleActions,
} from 'redux-actions';
import { Map } from 'immutable';

export const CONTROL_AUTO_FOCUS = 'ptzZoomFocus/CONTROL_AUTO_FOCUS';
export const CONTROL_FOCUS = 'ptzZoomFocus/CONTROL_FOCUS';
export const CONTROL_FOCUS_SUCCESS = 'ptzZoomFocus/CONTROL_FOCUS_SUCCESS';
export const CONTROL_FOCUS_FAIL = 'ptzZoomFocus/CONTROL_FOCUS_FAIL';
export const CONTROL_ZOOM = 'ptzZoomFocus/CONTROL_ZOOM';
export const CONTROL_ZOOM_SUCCESS = 'ptzZoomFocus/CONTROL_ZOOM_SUCCESS';
export const CONTROL_ZOOM_FAIL = 'ptzZoomFocus/CONTROL_ZOOM_FAIL';
export const CONTROL_STOP = 'ptzZoomFocus/CONTROL_STOP';
export const CONTROL_STOP_SUCCESS = 'ptzZoomFocus/CONTROL_STOP_SUCCESS';
export const CONTROL_STOP_FAIL = 'ptzZoomFocus/CONTROL_STOP_FAIL';

export const controlAutoFocus = createAction(CONTROL_AUTO_FOCUS);
export const controlFocus = createAction(CONTROL_FOCUS);
export const controlFocusSuccess = createAction(CONTROL_FOCUS_SUCCESS);
export const controlFocusFail = createAction(CONTROL_FOCUS_FAIL);
export const controlZoom = createAction(CONTROL_ZOOM);
export const controlZoomSuccess = createAction(CONTROL_ZOOM_SUCCESS);
export const controlZoomFail = createAction(CONTROL_ZOOM_FAIL);
export const controlStop = createAction(CONTROL_STOP);
export const controlStopSuccess = createAction(CONTROL_STOP_SUCCESS);
export const controlStopFail = createAction(CONTROL_STOP_FAIL);

const initialState = Map({
});

// reducer
export default handleActions({
  [CONTROL_FOCUS_SUCCESS]: () => (
    console.info('control focus success')
  ),
  [CONTROL_FOCUS_FAIL]: () => (
    console.info('control focus fail')
  ),
  [CONTROL_ZOOM_SUCCESS]: () => (
    console.info('control zoom success')
  ),
  [CONTROL_ZOOM_FAIL]: () => (
    console.info('control zoom fail')
  ),
  [CONTROL_STOP_SUCCESS]: () => (
    console.info('control stop success')
  ),
  [CONTROL_STOP_FAIL]: state => {
    console.info('control stop fail');
    return state;
  },
}, initialState);

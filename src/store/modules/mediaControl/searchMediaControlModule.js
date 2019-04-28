import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// action
export const PLAY_CONTROL = 'searchMediaControl/PLAY_CONTROL';
export const PLAY_SPEED_CONTROL = 'searchMediaControl/PLAY_SPEED_CONTROL';
export const FUNCTION_CONTROL = 'searchMediaControl/FUNCTION_CONTROL';
export const OSD_DISPLAY_CONTROL = 'searchMediaControl/OSD_DISPLAY_CONTROL';

// action create
export const playControl = createAction(PLAY_CONTROL);
export const playSpeedControl = createAction(PLAY_SPEED_CONTROL);
export const functionControl = createAction(FUNCTION_CONTROL);
export const OSDDisplayControl = createAction(OSD_DISPLAY_CONTROL);

const initialState = Map({
  playMode: 'stop',
  playSpeed: 1,
  functionMode: 'none',
  OSDDisplay: true,
});

// reducer
export default handleActions({
  [PLAY_CONTROL]: (state, { payload: { playMode } }) => (
    state.set('playMode', playMode)
  ),
  [PLAY_SPEED_CONTROL]: (state, { payload: { playSpeed } }) => (
    state.set('playSpeed', playSpeed)
  ),
  [FUNCTION_CONTROL]: (state, { payload }) => (
    state.set('functionMode', payload)
  ),
  [OSD_DISPLAY_CONTROL]: state => state.set('OSDDisplay', !state.get('OSDDisplay')),
}, initialState);

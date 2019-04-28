import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// action
export const FULLSCREEN_MODE_CHANGE = 'layout/FULLSCREEN_MODE_CHANGE';
export const TIMELINE_FOLDING_CHANGE = 'layout/TIMELINE_FOLDING_CHANGE';

// action create
export const fullscreenModeChange = createAction(FULLSCREEN_MODE_CHANGE);
export const timelineFoldingChange = createAction(TIMELINE_FOLDING_CHANGE);

const initialState = Map({
  isFullscreen: false,
  timelineFolding: false,
});

// reducer
export default handleActions({
  [FULLSCREEN_MODE_CHANGE]: (state, { payload: value }) => state.set('isFullscreen', value),
  [TIMELINE_FOLDING_CHANGE]: state => state.set('timelineFolding', !state.get('timelineFolding')),
}, initialState);

import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// action
export const GET_LIVE_STATUS = 'liveRecordStatus/GET_LIVE_STATUS';
export const GET_LIVE_STATUS_SUCCESS = 'liveRecordStatus/GET_LIVE_STATUS_SUCCESS';
export const GET_RECORD_STATUS = 'liveRecordStatus/GET_RECORD_STATUS';
export const GET_RECORD_STATUS_SUCCESS = 'liveRecordStatus/GET_RECORD_STATUS_SUCCESS';

// action create
export const getLiveStatus = createAction(GET_LIVE_STATUS);
export const getLiveStatusSuccess = createAction(GET_LIVE_STATUS_SUCCESS);
export const getRecordStatus = createAction(GET_RECORD_STATUS);
export const getRecordStatusSuccess = createAction(GET_RECORD_STATUS_SUCCESS);

const initialState = Map({
  liveStatus: List([]),
  recordStatus: List([]),
});

// reducer
export default handleActions({
  [GET_LIVE_STATUS_SUCCESS]: state => state,
  [GET_RECORD_STATUS_SUCCESS]: state => state,
}, initialState);

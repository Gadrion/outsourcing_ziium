import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// action
export const GET_EVENT_STATUS = 'event/GET_EVENT_STATUS';
export const GET_EVENT_STATUS_SUCCESS = 'event/GET_EVENT_STATUS_SUCCESS';
export const GET_EVENT_STATUS_FAILURE = 'event/GET_EVENT_STATUS_FAILURE';


// action create
export const getEventStatus = createAction(GET_EVENT_STATUS);
export const getEventStatusSuccess = createAction(GET_EVENT_STATUS_SUCCESS);
export const getEventStatusFailure = createAction(GET_EVENT_STATUS_FAILURE);

const initialState = Map({
  eventStatus: Map({}),
});

// reducer
export default handleActions({
  [GET_EVENT_STATUS_SUCCESS]: state => state,
  [GET_EVENT_STATUS_FAILURE]: state => state,
}, initialState);

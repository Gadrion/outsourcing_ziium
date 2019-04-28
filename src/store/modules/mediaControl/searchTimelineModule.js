import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
// import store from 'store/modules/index.js';

// action
export const SET_CURRENT_CHANNEL = 'searchTimeline/SET_CURRENT_CHANNEL';

export const SET_SELECT_EVENT = 'searchTimeline/SET_SELECT_EVENT';

export const GET_OVERLAPPED_ID_LIST = 'searchTimeline/GET_OVERLAPPED_ID';
export const GET_OVERLAPPED_ID_LIST_SUCCESS = 'searchTimeline/GET_OVERLAPPED_ID_SUCCESS';
export const GET_OVERLAPPED_ID_LIST_FAILURE = 'searchTimeline/GET_OVERLAPPED_ID_FAILURE';

export const GET_TIMELINE = 'searchTimeline/GET_TIMELINE';
export const GET_TIMELINE_SUCCESS = 'searchTimeline/GET_TIMELINE_SUCCESS';
export const GET_TIMELINE_FAILURE = 'searchTimeline/GET_TIMELINE_FAILURE';

export const CHANGE_EVENT_FILTER = 'searchTimeline/CHANGE_EVENT_FILTER';

export const APPLY_EVENT_LIST_FILTER = 'searchTimeline/APPLY_EVENT_LIST_FILTER';

// action create
export const setCurrentChannel = createAction(SET_CURRENT_CHANNEL);

export const setSelectEvent = createAction(SET_SELECT_EVENT);

export const getOverlappedIdList = createAction(GET_OVERLAPPED_ID_LIST);
export const getOverlappedIdListSuccess = createAction(GET_OVERLAPPED_ID_LIST_SUCCESS);
export const getOverlappedIdListFailure = createAction(GET_OVERLAPPED_ID_LIST_FAILURE);

export const getTimeline = createAction(GET_TIMELINE);
export const getTimelineSuccess = createAction(GET_TIMELINE_SUCCESS);
export const getTimelineFailure = createAction(GET_TIMELINE_FAILURE);

export const chagneEventFilter = createAction(CHANGE_EVENT_FILTER);

export const applyEventListFilter = createAction(APPLY_EVENT_LIST_FILTER);


// timelineModule에서 필요한 데이터 표시
const initialState = Map({
  currentChannel: -1,
  overlappedIDList: [],
  timeLineSearchResults: [],
  selectEvent: Map({}),
  filterEvent: List([]),
});

// reducer
export default handleActions({
  [SET_CURRENT_CHANNEL]: (state, { payload }) => (
    state.set('currentChannel', payload)
  ),
  [SET_SELECT_EVENT]: (state, { payload }) => (
    state.set('selectEvent', fromJS(payload))
  ),
  [GET_OVERLAPPED_ID_LIST_SUCCESS]: (state, { payload }) => (
    state.set('overlappedIDList', payload)
  ),
  [GET_OVERLAPPED_ID_LIST_FAILURE]: state => (
    state.set('overlappedIDList', [])
  ),
  [GET_TIMELINE_SUCCESS]: (state, { payload: { filterEvent, timeLineSearchResults } }) => (
    state.set('timeLineSearchResults', timeLineSearchResults)
      .set('filterEvent', fromJS(filterEvent))
  ),
  [GET_TIMELINE_FAILURE]: state => (
    state.set('timeLineSearchResults', [])
  ),
}, initialState);

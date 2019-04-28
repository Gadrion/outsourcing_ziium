import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

// action
export const CHECK_STORAGE_STATUS = 'eventSearch/CHECK_STORAGE_STATUS';
export const CHECK_STORAGE_STATUS_SUCCESS = 'eventSearch/CHECK_STORAGE_STATUS_SUCCESS';
export const CHECK_STORAGE_STATUS_FAILURE = 'eventSearch/CHECK_STORAGE_STATUS_FAILURE';

export const FIND_RECORDING_DATE = 'eventSearch/FIND_RECORDING_DATE';
export const FIND_RECORDING_DATE_SUCCESS = 'eventSearch/FIND_RECORDING_DATE_SUCCESS';
export const FIND_RECORDING_DATE_FAILURE = 'eventSearch/FIND_RECORDING_DATE_FAILURE';

export const SET_SEARCH_DATE = 'eventSearch/SET_SEARCH_DATE';

export const SET_EVENT_FILTER_DATA = 'eventSearch/SET_EVENT_FILTER_DATA';

export const SET_SELECT_EVENT = 'eventSearch/SET_SELECT_EVENT';

export const REQUEST_EVENT_SEARCH = 'eventSearch/REQUEST_EVENT_SEARCH';

// action create
export const checkStorageStatus = createAction(CHECK_STORAGE_STATUS);
export const checkStorageStatusSuccess = createAction(CHECK_STORAGE_STATUS_SUCCESS);
export const checkStorageStatusFailure = createAction(CHECK_STORAGE_STATUS_FAILURE);

export const findRecordingDate = createAction(FIND_RECORDING_DATE);
export const findRecordingDateSuccess = createAction(FIND_RECORDING_DATE_SUCCESS);
export const findRecordingDateFailure = createAction(FIND_RECORDING_DATE_FAILURE);

export const setSearchDate = createAction(SET_SEARCH_DATE);

export const setEventFilterData = createAction(SET_EVENT_FILTER_DATA);

export const setSelectEvent = createAction(SET_SELECT_EVENT);

export const requestEventSearch = createAction(REQUEST_EVENT_SEARCH);

const today = new Date();

const initialState = Map({
  isStorageEnabled: false,
  storageStatus: '',
  calenderSearchResults: [],
  searchDateObj: {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: 0,
    minute: 0,
    second: 0,
  },
  eventfilterdata: List([
    'all',
    'AlarmInput',
    'TamperingDetection',
    'VideoAnalysis',
    'Passing',
    'Entering',
    'Appearing',
    'MotionDetection',
  ]),
  selectEvent: Map({
    // EndTime: "2019-02-06T21:25:32Z",
    // Result: 3,
    // StartTime: "2019-02-06T21:24:36Z",
    // Type: "MotionDetection",
    // index: 1,
    // isReopen: true, // Vidoe의 재 렌더를 조정하기 위해서 넣은 값
  }),
});

// reducer
export default handleActions({
  [CHECK_STORAGE_STATUS_SUCCESS]: state => (
    state.set('isStorageEnabled', true)
  ),
  [CHECK_STORAGE_STATUS_FAILURE]: (state, action) => (
    state.set('isStorageEnabled', false)
      .set('storageStatus', action.payload)
  ),
  [FIND_RECORDING_DATE_SUCCESS]: (state, action) => (
    state.set('calenderSearchResults', action.payload)
  ),
  [FIND_RECORDING_DATE_FAILURE]: state => (
    state.set('calenderSearchResults', [])
  ),
  [SET_SEARCH_DATE]: (state, action) => {
    const searchDateObj = {
      year: action.payload.getUTCFullYear(),
      month: action.payload.getMonth() + 1,
      day: action.payload.getDate(),
      hour: 0,
      minute: 0,
      second: 0,
    };
    return state.set('searchDateObj', Object.assign({}, searchDateObj));
  },
  [SET_EVENT_FILTER_DATA]: (state, { payload: { eventfilterdata } }) => (
    state.set('eventfilterdata', fromJS(eventfilterdata))
  ),
  [SET_SELECT_EVENT]: (state, { payload }) => (
    state.set('selectEvent', fromJS(payload))
  ),
}, initialState);

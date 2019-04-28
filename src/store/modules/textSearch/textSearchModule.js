import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// action
export const SET_SEARCH_DATE = 'textSearch/SET_SEARCH_DATE';
export const SET_SEARCH_TIME = 'textSearch/SET_SEARCH_TIME';
export const APPLY_SEARCH_DATE_TIME = 'textSearch/APPLY_SEARCH_DATE_TIME';

export const GET_POS_CONFIG = 'textSearch/GET_POS_CONFIG';
export const GET_POS_CONFIG_SUCCESS = 'textSearch/GET_POS_CONFIG_SUCCESS';
export const GET_POS_CONFIG_FAILURE = 'textSearch/GET_POS_CONFIG_FAILURE';

export const GET_POS_EVENT_CONFIG = 'textSearch/GET_POS_EVENT_CONFIG';
export const GET_POS_EVENT_CONFIG_SUCCESS = 'textSearch/GET_POS_EVENT_CONFIG_SUCCESS';
export const GET_POS_EVENT_CONFIG_FAILURE = 'textSearch/GET_POS_EVENT_CONFIG_FAILURE';

export const CONTROL_METADATA_START = 'textSearch/CONTROL_METADATA_START';
export const CONTROL_METADATA_START_SUCCESS = 'textSearch/CONTROL_METADATA_START_SUCCESS';
export const CONTROL_METADATA_START_FAILURE = 'textSearch/CONTROL_METADATA_START_FAILURE';

export const CONTROL_METADATA_CANCEL = 'textSearch/CONTROL_METADATA_CANCEL';
export const CONTROL_METADATA_CANCEL_SUCCESS = 'textSearch/CONTROL_METADATA_CANCEL_SUCCESS';
export const CONTROL_METADATA_CANCEL_FAILURE = 'textSearch/CONTROL_METADATA_CANCEL_FAILURE';

export const CONTROL_METADATA_RENEW = 'textSearch/CONTROL_METADATA_RENEW';
export const CONTROL_METADATA_RENEW_SUCCESS = 'textSearch/CONTROL_METADATA_RENEW_SUCCESS';
export const CONTROL_METADATA_RENEW_FAILURE = 'textSearch/CONTROL_METADATA_RENEW_FAILURE';

export const GET_METADATA_RESULT = 'textSearch/GET_METADATA_RESULT';
export const GET_METADATA_RESULT_SUCCESS = 'textSearch/GET_METADATA_RESULT_SUCCESS';
export const GET_METADATA_RESULT_FAILURE = 'textSearch/GET_METADATA_RESULT_FAILURE';

export const GET_METADATA_STATUS = 'textSearch/GET_METADATA_STATUS';
export const GET_METADATA_STATUS_SUCCESS = 'textSearch/GET_METADATA_STATUS_SUCCESS';
export const GET_METADATA_STATUS_FAILURE = 'textSearch/GET_METADATA_STATUS_FAILURE';

export const SET_KEYWORD = 'textSearch/SET_KEYWORD';
export const SET_EVENT_KEYWORD = 'textSearch/SET_EVENT_KEYWORD';
export const SET_IS_CASE_SENSITIVE = 'textSearch/SET_IS_CASE_SENSITIVE';
export const SET_IS_WHOLE_WORD = 'textSearch/SET_IS_WHOLE_WORD';

export const REQUEST_TEXT_SEARCH = 'textSearch/REQUEST_TEXT_SEARCH';

export const SET_CURRENT_POS_DEVICE_LIST = 'textSearch/SET_CURRENT_POS_DEVICE_LIST';

export const CHECK_POS_EVENT_CONFIG = 'textSearch/CHECK_POS_EVENT_CONFIG';

// action create
export const setSearchDate = createAction(SET_SEARCH_DATE);
export const setSearchTime = createAction(SET_SEARCH_TIME);
export const applySearchDateTime = createAction(APPLY_SEARCH_DATE_TIME);

export const getPOSConfig = createAction(GET_POS_CONFIG);
export const getPOSConfigSuccess = createAction(GET_POS_CONFIG_SUCCESS);
export const getPOSConfigFailure = createAction(GET_POS_CONFIG_FAILURE);

export const getPOSEventConfig = createAction(GET_POS_EVENT_CONFIG);
export const getPOSEventConfigSuccess = createAction(GET_POS_EVENT_CONFIG_SUCCESS);
export const getPOSEventConfigFailure = createAction(GET_POS_EVENT_CONFIG_FAILURE);

export const controlMetaDataStart = createAction(CONTROL_METADATA_START);
export const controlMetaDataStartSuccess = createAction(CONTROL_METADATA_START_SUCCESS);
export const controlMetaDataStartFailure = createAction(CONTROL_METADATA_START_FAILURE);

export const controlMetaDataCancel = createAction(CONTROL_METADATA_CANCEL);
export const controlMetaDataCancelSuccess = createAction(CONTROL_METADATA_CANCEL_SUCCESS);
export const controlMetaDataCancelFailure = createAction(CONTROL_METADATA_CANCEL_FAILURE);

export const controlMetaDataRenew = createAction(CONTROL_METADATA_RENEW);
export const controlMetaDataRenewSuccess = createAction(CONTROL_METADATA_RENEW_SUCCESS);
export const controlMetaDataRenewFailure = createAction(CONTROL_METADATA_RENEW_FAILURE);

export const getMetaDataStatus = createAction(GET_METADATA_STATUS);
export const getMetaDataStatusSuccess = createAction(GET_METADATA_STATUS_SUCCESS);
export const getMetaDataStatusFailure = createAction(GET_METADATA_STATUS_FAILURE);

export const getMetaDataResult = createAction(GET_METADATA_RESULT);
export const getMetaDataResultSuccess = createAction(GET_METADATA_RESULT_SUCCESS);
export const getMetaDataResultFailure = createAction(GET_METADATA_RESULT_FAILURE);

export const setKeyword = createAction(SET_KEYWORD);
export const setEventKeyword = createAction(SET_EVENT_KEYWORD);
export const setIsCaseSensitive = createAction(SET_IS_CASE_SENSITIVE);
export const setIsWholeWord = createAction(SET_IS_WHOLE_WORD);

export const requestTextSearch = createAction(REQUEST_TEXT_SEARCH);

export const setCurrentPOSDeviceList = createAction(SET_CURRENT_POS_DEVICE_LIST);

export const checkPosEventConfig = createAction(CHECK_POS_EVENT_CONFIG);

const today = new Date();

const initialState = Map({
  searchToken: '',
  keyword: '',
  eventKeyword: List([
    Map({
      index: 0,
      condition: '',
      isChecked: false,
    }),
  ]),
  eventKeywordCheckStatus: List([
    Map({
      index: 0,
      condition: '',
      isChecked: false,
    }),
  ]),
  isCaseSensitive: 'False',
  isWholeWord: 'False',
  searchResult: [],
  searchStatus: '',
  searchStartDateObj: Map({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: 0,
    minute: 0,
    second: 0,
  }),
  searchEndDateObj: Map({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate() + 1,
    hour: 0,
    minute: 0,
    second: 0,
  }),
  searchDateTimeObjBackup: Map({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate() + 1,
    hour: 0,
    minute: 0,
    second: 0,
  }),
  posEventConfig: {
    AmountEventEnable: 'False',
    TotalAmount: 0,
    TotalType: '',
    Keywords: [],
  },
  posConfigList: [{
    DeviceName: '',
    Enable: false,
    Port: 0,
    EventPlaybackStartTime: 0,
    EncodingType: '',
    ReceiptEnd: '',
    ReceiptStart: '',
    ChannelIDList: [],
  }],
  currentPOSDeviceList: [],
});

// reducer
export default handleActions({
  [SET_SEARCH_DATE]: (state, action) => {
    const { year, month, day } = action.payload;
    return state
      .setIn(['searchDateTimeObjBackup', 'year'], year)
      .setIn(['searchDateTimeObjBackup', 'month'], month)
      .setIn(['searchDateTimeObjBackup', 'day'], day);
  },
  [SET_SEARCH_TIME]: (state, action) => {
    const { hour, minute, second } = action.payload;
    return state
      .setIn(['searchDateTimeObjBackup', 'hour'], hour)
      .setIn(['searchDateTimeObjBackup', 'minute'], minute)
      .setIn(['searchDateTimeObjBackup', 'second'], second);
  },
  [APPLY_SEARCH_DATE_TIME]: (state, action) => {
    const { payload } = action;
    if (payload === 'start') {
      return state
        .set('searchStartDateObj', Object.assign({}, state.get('searchDateTimeObjBackup').toJS()));
    } /* else if (payload === 'end') */
    return state
      .set('searchEndDateObj', Object.assign({}, state.get('searchDateTimeObjBackup').toJS()));
    // }
  },
  [GET_POS_CONFIG_SUCCESS]: (state, action) => (
    state.set('posConfigList', action.payload)
  ),
  [GET_POS_CONFIG_FAILURE]: state => (
    state.set('posConfigList', [{
      DeviceName: '',
      Enable: false,
      Port: 0,
      EventPlaybackStartTime: 0,
      EncodingType: '',
      ReceiptEnd: '',
      ReceiptStart: '',
      ChannelIDList: [],
    }])
  ),
  [GET_POS_EVENT_CONFIG_SUCCESS]: (state, action) => {
    const { payload } = action;
    const eventKeywords = [];
    payload.Keywords.map(item => eventKeywords.push(Map({
      index: item.KeywordIndex,
      condition: item.KeywordCondition,
      isChecked: false,
    })));
    return state.set('posEventConfig', payload)
      .set('eventKeyword', List(eventKeywords))
      .set('eventKeywordCheckStatus', List(eventKeywords));
  },
  [GET_POS_EVENT_CONFIG_FAILURE]: state => (
    state.set('posEventConfig', {
      AmountEventEnable: 'False',
      TotalAmount: 0,
      TotalType: '',
      Keywords: [],
    })
  ),
  [CONTROL_METADATA_START_SUCCESS]: (state, action) => (
    state.set('searchToken', action.payload)
  ),
  [CONTROL_METADATA_START_FAILURE]: state => (
    state.set('searchToken', '')
  ),
  [CONTROL_METADATA_CANCEL_SUCCESS]: state => (
    state.set('searchToken', '')
  ),
  [CONTROL_METADATA_RENEW_SUCCESS]: state => (
    state.set('searchToken', '')
  ),
  [GET_METADATA_STATUS_SUCCESS]: (state, action) => (
    state.set('searchStatus', action.payload)
  ),
  [GET_METADATA_RESULT_SUCCESS]: (state, action) => (
    state.set('searchResult', action.payload)
  ),
  [GET_METADATA_RESULT_FAILURE]: state => (
    state.set('searchResult', '')
  ),
  [SET_KEYWORD]: (state, action) => (
    state.set('keyword', action.payload)
  ),
  [SET_EVENT_KEYWORD]: (state, action) => {
    const eventKeywordCheckStatus = state.get('eventKeywordCheckStatus');
    return state.set('eventKeywordCheckStatus', eventKeywordCheckStatus.update(
      action.payload.index,
      item => item.set('isChecked', action.payload.checked),
    ));
  },
  [SET_IS_CASE_SENSITIVE]: (state, action) => (
    state.set('isCaseSensitive', action.payload)
  ),
  [SET_IS_WHOLE_WORD]: (state, action) => (
    state.set('isWholeWord', action.payload)
  ),
  [SET_CURRENT_POS_DEVICE_LIST]: (state, action) => (
    state.set('currentPOSDeviceList', action.payload)
  ),
}, initialState);

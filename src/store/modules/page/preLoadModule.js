import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const FILE_LOAD_CHECK = 'preLoad/FILE_LOAD_CHECK';
export const FILE_ONLOAD_CHECK = 'preLoad/FILE_ONLOAD_CHECK';
export const FILE_ONERROR_CHECK = 'preLoad/FILE_ERROR_CHECK';
export const FILE_UMP_LOAD_CHECK = 'preLoad/FILE_UMP_LOAD_CHECK';
export const FILE_UMP_LOAD_SUCCESS = 'preLoad/FILE_UMP_LOAD_SUCCESS';
export const FILE_UMP_LOAD_FAILURE = 'preLoad/FILE_UMP_LOAD_FAILURE';
export const FILE_LOAD_CHECK_SUCCESS = 'preLoad/FILE_LOAD_CHECK_SUCCESS';
export const FILE_LOAD_CHECK_FAILURE = 'preLoad/FILE_LOAD_CHECK_FAILURE';

export const SESSION_KEY_GET = 'preLoad/SESSION_KEY_GET';
export const SESSION_KEY_GET_SUCCESS = 'preLoad/SESSION_KEY_GET_SUCCESS';
export const SESSION_KEY_GET_FAILURE = 'preLoad/SESSION_KEY_GET_FAILURE';

export const fileLoadCheck = createAction(FILE_LOAD_CHECK);
export const fileOnLoadCheck = createAction(FILE_ONLOAD_CHECK);
export const fileOnErrorCheck = createAction(FILE_ONERROR_CHECK);
export const fileUmpLoadCheck = createAction(FILE_UMP_LOAD_CHECK);
export const fileUMPLoadSuccess = createAction(FILE_UMP_LOAD_SUCCESS);
export const fileUMPLoadFailure = createAction(FILE_UMP_LOAD_FAILURE);
export const fileLoadCheckSuccess = createAction(FILE_LOAD_CHECK_SUCCESS);
export const fileLoadCheckFailure = createAction(FILE_LOAD_CHECK_FAILURE);

export const sessionKeyGet = createAction(SESSION_KEY_GET);
export const sessionKeyGetSucces = createAction(SESSION_KEY_GET_SUCCESS);
export const sessionKeyGetFailure = createAction(SESSION_KEY_GET_FAILURE);

const initialState = Map({
  load: false,
  error: false,
  umpLoad: false,
  sessionKey: '',
});

export default handleActions({
  [FILE_LOAD_CHECK_SUCCESS]: (state, { payload }) => {
    const error = state.get('error');
    const umpLoad = state.get('umpLoad');
    const loadSuccess = !error && payload && umpLoad;
    console.log('FILE_UMP_LOAD_SUCCESSas,dnkajsbdka', payload);
    if (loadSuccess) {
      console.log('FILE_LOAD_CHECK_SUCCESS');
    }

    return state.set('load', loadSuccess);
  },
  [FILE_LOAD_CHECK_FAILURE]: (state, { payload }) => {
    console.log('FILE_LOAD_CHECK_FAILURE', payload.event);
    return state.set('error', payload.error);
  },
  [FILE_UMP_LOAD_SUCCESS]: (state, { payload }) => {
    console.log('FILE_UMP_LOAD_SUCCESS', payload);

    return state.set('umpLoad', payload);
  },
  [FILE_UMP_LOAD_FAILURE]: (state, { payload }) => {
    console.log('FILE_UMP_LOAD_FAILURE', payload);

    return state.set('umpLoad', payload);
  },
  [SESSION_KEY_GET_SUCCESS]: (state, { payload: { SessionKey } }) => (
    state.set('sessionKey', SessionKey)
  ),
  [SESSION_KEY_GET_FAILURE]: (state, { payload }) => {
    console.log('SESSION_KEY_GET_FAILURE', payload);
    return state.set('sessionKey', payload);
  },
}, initialState);

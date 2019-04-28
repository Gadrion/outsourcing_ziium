import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { Auth } from 'util/lib';

// action
export const LOGIN = 'login/LOGIN';
export const LOGIN_PENDDING = 'login/LOGIN_PENDDING';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
// export const GET_ATTRIBUTES = 'login/GET_ATTRIBUTES';

export const LOGOUT = 'login/LOGOUT';

// action create
export const login = createAction(LOGIN);
export const loginPendding = createAction(LOGIN_PENDDING);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);
// export const getAttributes = createAction(GET_ATTRIBUTES);

export const logout = createAction(LOGOUT);

const initialState = Map({
  pendding: false,
  loggedIn: false,
  error: false,
  errorCode: null,
});

// reducer
export default handleActions({
  [LOGIN_PENDDING]: (state, action) => state.set('pendding', action.payload),
  [LOGIN_SUCCESS]: state => (
    state
      .set('pendding', false)
      .set('loggedIn', true)
      .set('error', false)
      .set('errorCode', null)
  ),
  [LOGIN_FAILURE]: (state, action) => (
    state
      .set('pendding', false)
      .set('loggedIn', false)
      .set('error', action.payload.error || false)
      .set('errorCode', action.payload.errorCode)
  ),
  [LOGOUT]: state => {
    Auth.logout();
    return state
      .set('pendding', false)
      .set('loggedIn', false)
      .set('error', false)
      .set('errorCode', null);
  },
}, initialState);

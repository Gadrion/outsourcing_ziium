import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// action
export const LOGIN = 'login/LOGIN';
export const LOGIN_PENDDING = 'login/LOGIN_PENDDING';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE';

// action create
export const login = createAction(LOGIN);
export const loginPendding = createAction(LOGIN_PENDDING);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);


const initialState = Map({
  pendding: false,
  isAdmin: false,
  isLogin: sessionStorage.getItem('isLogin') ? true : false,
  userInfo: {},
  error: '',
});

// reducer
export default handleActions({
  [LOGIN_PENDDING]: (state, action) => state.set('pendding', action.payload),
  [LOGIN_SUCCESS]: (state) => (
    state
      .set('pendding', false)
      .set('isLogin', true)
  ),
  [LOGIN_FAILURE]: (state, { payload: { error } }) => (
    state
      .set('pendding', false)
      .set('isLogin', false)
      .set('error', error)
  ),
}, initialState);

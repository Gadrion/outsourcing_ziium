import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const GET_CURRENT_FORM = 'stuff/GET_CURRENT_FORM';
export const SET_CURRENT_FORM = 'stuff/SET_CURRENT_FORM';
export const UPDATE_CURRENT_FORM = 'stuff/UPDATE_CURRENT_FORM';
export const DELETE_CURRENT_FORM = 'stuff/DELETE_CURRENT_FORM';

export const setForm = createAction(SET_CURRENT_FORM);
export const updateForm = createAction(UPDATE_CURRENT_FORM);
export const deleteForm = createAction(DELETE_CURRENT_FORM);

const initialState = Map({
  name: '',
  memo: '',
  option: {},
  files: [],
});

// reducer
export default handleActions({
  [SET_CURRENT_FORM]: (state, { payload }) => {
    let newState = state;
    Object.keys(payload).forEach(key => {
      newState = newState.set(key, payload[key]);
    });
    return newState;
  },
}, initialState);

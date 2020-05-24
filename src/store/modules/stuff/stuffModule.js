import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const SET_CURRENT_FORM = 'stuff/SET_CURRENT_FORM';
export const setCurrentForm = createAction(SET_CURRENT_FORM);

const initialState = Map({
  name: '',
  memo: '',
  option: [],
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

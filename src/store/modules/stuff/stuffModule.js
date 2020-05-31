import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const GET_CURRENT_FORM = 'stuff/GET_CURRENT_FORM';
export const SET_CURRENT_FORM = 'stuff/SET_CURRENT_FORM';
export const UPDATE_CURRENT_FORM = 'stuff/UPDATE_CURRENT_FORM';
export const DELETE_CURRENT_FORM = 'stuff/DELETE_CURRENT_FORM';
export const SET_MODAL_OPEN = 'stuff/SET_MODAL_OPEN';
export const SET_IMAGE_DATA = 'stuff/SET_IMAGE_DATA';

export const setForm = createAction(SET_CURRENT_FORM);
export const updateForm = createAction(UPDATE_CURRENT_FORM);
export const deleteForm = createAction(DELETE_CURRENT_FORM);
export const open = createAction(SET_MODAL_OPEN);
export const setImageData = createAction(SET_IMAGE_DATA);

const initialState = Map({
  name: '',
  memo: '',
  option: {},
  imageFiles: [],
  isOpen: false,
  load: false,
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
  [SET_MODAL_OPEN]: (state, { payload }) => state.set('isOpen', payload).set('load', payload),
  [SET_IMAGE_DATA]: (state, { payload: { imageFiles } }) => state.set('imageFiles', imageFiles).set('load', false),
}, initialState);

import {
  createAction,
  handleActions,
} from 'redux-actions';
import { Map } from 'immutable';

export const GET_MODELNAME = 'header/GET_MODELNAME';
export const GET_MODELNAME_SUCCESS = 'header/GET_MODELNAME_SUCCESS';
export const GET_MODELNAME_FAILURE = 'header/GET_MODELNAME_FAILURE';
export const getmodelName = createAction(GET_MODELNAME);
export const getmodelNameSuccess = createAction(GET_MODELNAME_SUCCESS);
export const getmodelNameFailure = createAction(GET_MODELNAME_FAILURE);

export const SET_POPUP_TOGGLE = 'header/SET_POPUP_TOGGLE';
export const toggleAction = createAction(SET_POPUP_TOGGLE);

const initialState = Map({
  modelName: '언노운',
  showPopup: false,
});

// reducer
export default handleActions({
  [GET_MODELNAME_SUCCESS]: (state, action) => {
    console.log('GET_MODELNAME_SUCCESS', action.payload);
    return state
      .set('modelName', action.payload.modelName);
  },
  [GET_MODELNAME_FAILURE]: () => {
    console.log('GET_MODELNAME_FAILURE');
  },
  [SET_POPUP_TOGGLE]: state => {
    console.log('headerModule - showPopup', state._root.entries[1][1]);
    return state
      .set('showPopup', !state._root.entries[1][1]);
  },
}, initialState);

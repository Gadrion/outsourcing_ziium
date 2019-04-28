import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// action
export const LOAD_ATTRIBUTES = 'attribute/LOAD_ATTRIBUTES';
export const LOAD_ATTRIBUTES_WAIT = 'attribute/LOAD_ATTRIBUTES_WAIT';
export const LOAD_ATTRIBUTES_WAIT_THEN = 'attribute/LOAD_ATTRIBUTES_WAIT_THEN';
export const LOAD_ATTRIBUTES_PENDDING = 'attribute/LOAD_ATTRIBUTES_PENDDING';
export const LOAD_ATTRIBUTES_SUCCESS = 'attribute/LOAD_ATTRIBUTES_SUCCESS';
export const LOAD_ATTRIBUTES_FAILURE = 'attribute/LOAD_ATTRIBUTES_FAILURE';

// action create
export const loadAttributes = createAction(LOAD_ATTRIBUTES);
export const waitAttributes = createAction(LOAD_ATTRIBUTES_WAIT);
export const waitThenAttributes = createAction(LOAD_ATTRIBUTES_WAIT_THEN);
export const loadAttributesPendding = createAction(LOAD_ATTRIBUTES_PENDDING);
export const loadAttributesSuccess = createAction(LOAD_ATTRIBUTES_SUCCESS);
export const loadAttributesFailure = createAction(LOAD_ATTRIBUTES_FAILURE);

const initialState = Map({
  attributes: {},
  pendding: false,
  loaded: false,
  error: null,
});

// reducer
export default handleActions({
  [LOAD_ATTRIBUTES_PENDDING]: (state, action) => (
    state.set('pendding', action.payload)
  ),
  [LOAD_ATTRIBUTES_SUCCESS]: (state, action) => (
    state
      .set('attributes', action.payload)
      .set('pendding', false)
      .set('loaded', true)
      .set('error', false)
  ),
  [LOAD_ATTRIBUTES_FAILURE]: (state, action) => (
    state
      .set('pendding', false)
      .set('loaded', false)
      .set('error', action.payload.error)
  ),
}, initialState);

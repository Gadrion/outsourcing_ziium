import {
  createAction,
  handleActions,
} from 'redux-actions';
import { Map } from 'immutable';

export const GET_CURRENT_LANGUAGE = 'lang/GET_CURRENT_LANGUAGE';
export const GET_CURRENT_LANGUAGE_SUCCESS = 'lang/GET_CURRENT_LANGUAGE_SUCCESS';
export const GET_CURRENT_LANGUAGE_FAILURE = 'lang/GET_CURRENT_LANGUAGE_FAILURE';
export const getCurrentLanguage = createAction(GET_CURRENT_LANGUAGE);
export const getCurrentLanguageSuccess = createAction(GET_CURRENT_LANGUAGE_SUCCESS);
export const getCurrentLanguageFailure = createAction(GET_CURRENT_LANGUAGE_FAILURE);

export const CHANGE_LANGUAGE = 'lang/CHANGE_LANGUAGE';
export const CHANGE_LANGUAGE_SUCCESS = 'lang/CHANGE_LANGUAGE_SUCCESS';
export const CHANGE_LANGUAGE_FAILURE = 'lang/CHANGE_LANGUAGE_FAILURE';
export const changeLanguage = createAction(CHANGE_LANGUAGE);
export const changeLanguageSuccess = createAction(CHANGE_LANGUAGE_SUCCESS);
export const changeLanguageFailure = createAction(CHANGE_LANGUAGE_FAILURE);

const initialState = Map({
  currentLanguage: {
    name: 'english',
    value: 'English',
  },
  lang: {},
});

// reducer
export default handleActions({
  [GET_CURRENT_LANGUAGE_SUCCESS]: (state, action) => {
    console.log('GET_CURRENT_LANGUAGE_SUCCESS', action.payload);
    const { data } = action.payload.lang;
    return state
      .set('currentLanguage', action.payload.currentLanguage)
      .set('lang', data !== null ? JSON.parse(data) : {});
  },
  [GET_CURRENT_LANGUAGE_FAILURE]: state => {
    console.log('GET_CURRENT_LANGUAGE_FAILURE');
    return state.set('currentLanguage', initialState.getIn('currentLanguage'));
  },
  [CHANGE_LANGUAGE_SUCCESS]: (state, action) => {
    console.log('CHANGE_LANGUAGE_SUCCESS', action.payload);
    const { data } = action.payload.lang;
    return state
      .set('currentLanguage', action.payload.currentLanguage)
      .set('lang', data !== null ? JSON.parse(data) : {});
  },
  [CHANGE_LANGUAGE_FAILURE]: state => {
    console.log('CHANGE_LANGUAGE_FAILURE');
    return state.set('currentLanguage', initialState.getIn('currentLanguage'));
  },
}, initialState);

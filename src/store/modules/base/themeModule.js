import {
  createAction,
  handleActions,
} from 'redux-actions';
import { Map } from 'immutable';

export const CHANGE_THEME = 'lang/CHANGE_THEME';
export const changeTheme = createAction(CHANGE_THEME);

const initialState = Map({
  theme: 'black',
});

// reducer
export default handleActions({
  [CHANGE_THEME]: (state, action) => {
    const { theme, setStorage } = action.payload;
    console.log('CHANGE_THEME', theme, setStorage);
    if (setStorage) {
      localStorage.setItem('WISENET-NVR-THEME', theme);
    }
    return state.set('theme', theme);
  },
}, initialState);

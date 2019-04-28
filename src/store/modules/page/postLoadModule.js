import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const USE_WORKER = 'postLoad/USE_WORKER';
export const CHECK_WORKER = 'postLoad/CHECK_WORKER';
export const SET_CAMERA_LIST_WORKER = 'postLoad/SET_CAMERA_LIST_WORKER';
export const SET_EVENT_WORKER = 'postLoad/SET_EVENT_WORKER';
export const SET_POS_DATA_CHECK = 'postLoad/SET_POS_DATA_CHECK';

// export const useWorker = createAction(USE_WORKER, null, () => ({
//   WebWorker: true,
//   userid: sessionStorage.getItem('WISENET_USER_ID'),
//   password: sessionStorage.getItem('WISENET_USER_PASSWORD'),
//   digestHeader: sessionStorage.getItem('WISENET_AUTH'),
// }));
export const useWorker = createAction(USE_WORKER);
export const checkWorker = createAction(CHECK_WORKER);
export const setCameraListWorker = createAction(SET_CAMERA_LIST_WORKER);
export const setEventWorker = createAction(SET_EVENT_WORKER);
export const setPosDataCheck = createAction(SET_POS_DATA_CHECK);

const initialState = Map({
  useWorker: false,
  cameraListWorker: false,
  eventWorker: false,
  posDataCheck: false,
});

export default handleActions({
  [SET_CAMERA_LIST_WORKER]: (state, { payload: { cameraListWorker } }) => (
    state.set('cameraListWorker', cameraListWorker)
  ),
  [SET_EVENT_WORKER]: (state, { payload: { eventWorker } }) => (
    state.set('eventWorker', eventWorker)
  ),
  [SET_POS_DATA_CHECK]: (state, { payload: { posDataCheck } }) => (
    state.set('posDataCheck', posDataCheck)
  ),
}, initialState);

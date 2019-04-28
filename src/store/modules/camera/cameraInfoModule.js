import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

// action
export const ON_TILE_CAMERA_LIST = 'camera/ON_TILE_CAMERA_LIST';
export const SET_TILE_CAMERA_LIST = 'camera/SET_TILE_CAMERA_LIST';
export const SET_SELECT_TILE_CAMERA = 'camera/SET_SELECT_TILE_CAMERA';
export const SET_TILE_CAMERA_STATE = 'camera/SET_TILE_CAMERA_STATE';
export const DELETE_TILE = 'camera/DELETE_TILE';

export const SET_CAMERA_LIST = 'camera/SET_CAMERA_LIST';
export const SET_CAMERA_EVENT_LIST = 'camera/SET_CAMERA_EVENT_LIST';

// action create
export const onTileCameraList = createAction(ON_TILE_CAMERA_LIST);
export const setTileCameraList = createAction(SET_TILE_CAMERA_LIST);
export const setSelectTileCamera = createAction(SET_SELECT_TILE_CAMERA);
export const deleteTile = createAction(DELETE_TILE);

export const setCameraList = createAction(SET_CAMERA_LIST);
export const setCameraEventList = createAction(SET_CAMERA_EVENT_LIST);

const initialState = Map({
  cameraList: List([]),
  tileCameraListPage: Map({
    1: List([]),
  }),
  selectTileCamera: Map({}),
  cameraEventList: List([]),
});

// reducer
export default handleActions({
  [SET_TILE_CAMERA_LIST]: (state, { payload: { tileCameraListPage } }) => (
    state.set('tileCameraListPage', fromJS(tileCameraListPage))
  ),
  [SET_SELECT_TILE_CAMERA]: (state, { payload: { uid, layoutPageCurrentNumber } }) => {
    const selectTileCamera = state.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`).find(tileCamera => tileCamera.get('uid') === uid);
    return state.set('selectTileCamera', selectTileCamera || Map({}));
  },
  [DELETE_TILE]: (state, { payload: { uid, layoutPageCurrentNumber } }) => {
    const currentTileList = state.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`);
    const newTileList = currentTileList.filter(tile => tile.toJS().uid !== uid);
    return state.setIn(['tileCameraListPage', `${layoutPageCurrentNumber}`], newTileList);
  },
  [SET_CAMERA_LIST]: (state, { payload: { cameraList } }) => (
    state.set('cameraList', fromJS(cameraList))
  ),
  [SET_CAMERA_EVENT_LIST]: (state, { payload: { cameraEventList } }) => (
    state.set('cameraEventList', fromJS(cameraEventList))
  ),
}, initialState);

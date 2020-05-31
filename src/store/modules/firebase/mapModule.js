import { createAction, handleActions } from 'redux-actions';
  import { Map } from 'immutable';
  
export const GET_CURRENT_LOCATION = 'map/GET_CURRENT_LOCATION';
export const GET_CURRENT_LOCATION_SUCCESS = 'map/GET_CURRENT_LOCATION_SUCCESS';
export const GET_CURRENT_LOCATION_FAILURE = 'map/GET_CURRENT_LOCATION_FAILURE';
export const GET_MAP_GEOCODE = 'map/GET_MAP_GEOCODE';
export const GET_MAP_GEOCODE_SUCCESS = 'map/GET_MAP_GEOCODE_SUCCESS';
export const UPDATE_MAP_DATA = 'map/UPDATE_MAP_DATA';
export const UPDATE_MAP_DATA_SUCCESS = 'map/UPDATE_MAP_DATA_SUCCESS';
export const SHOW_MAP_DATA = 'map/SHOW_MAP_DATA';
export const DELETE_MAP_DATA = 'map/DELETE_MAP_DATA';
export const DELETE_MAP_DATA_SUCCESS = 'map/DELETE_MAP_DATA_SUCCESS';

export const SET_POSITION_SEARCH_OPEN = 'map/SET_POSITION_SEARCH_OPEN';

export const SET_MARKER_FILTER = 'map/SET_MARKER_FILTER';

export const getCurrentLocation = createAction(GET_CURRENT_LOCATION);
export const getCurrentLocationSuccess = createAction(GET_CURRENT_LOCATION_SUCCESS);
export const getCurrentLocationFailure = createAction(GET_CURRENT_LOCATION_FAILURE);
export const getMapGeocode = createAction(GET_MAP_GEOCODE);
export const getMapGeocodeSuccess = createAction(GET_MAP_GEOCODE_SUCCESS);
export const updateMapData = createAction(UPDATE_MAP_DATA);
export const updateMapDataSuccess = createAction(UPDATE_MAP_DATA_SUCCESS);
export const showMapData = createAction(SHOW_MAP_DATA);
export const deleteMapData = createAction(DELETE_MAP_DATA);
export const deleteMapDataSuccess = createAction(DELETE_MAP_DATA_SUCCESS);

export const setPositionSearchOpen = createAction(SET_POSITION_SEARCH_OPEN);

export const setMarkerFilter = createAction(SET_MARKER_FILTER);
  
const initialState = Map({
  modifyMapList: [],
  currentPosion: {
    lat: 37,
    lng: 127,
  },
  load: false,
  showPlaceId: '',

  positionSearchListOpen: false,
  positionSearchList: [],
  filter: {
    status: 'all',
  }
});

const mapListSplice = (mapList, placeId) => {
  const copyMapList = mapList.slice();
  const findIndex = mapList.findIndex(mapData => mapData.placeId === placeId);
  copyMapList.splice(findIndex, 1);
  return copyMapList;
}

// reducer
export default handleActions({
  [GET_MAP_GEOCODE]: state => state.set('load', true),
  [GET_MAP_GEOCODE_SUCCESS]: (state, { payload: mapData }) => {
    const currentModifyMapList = state.get('modifyMapList');
    return state.set('modifyMapList', [...currentModifyMapList, mapData]).set('load', false);
  },
  [GET_CURRENT_LOCATION_SUCCESS]: (state, { payload }) => state.set('currentPosion', payload),
  [UPDATE_MAP_DATA]: state => state.set('showPlaceId', '').set('load', true),
  [UPDATE_MAP_DATA_SUCCESS]: (state, { payload: { placeId } }) => {
    const currentModifyMapList = state.get('modifyMapList');
    return state.set('modifyMapList', mapListSplice(currentModifyMapList, placeId))
      .set('showPlaceId', placeId)
      .set('load', false);
  },
  [SHOW_MAP_DATA]: (state, { payload: { placeId } }) => state.set('showPlaceId', placeId),
  [DELETE_MAP_DATA]: (state, { payload: { placeId } }) => {
    const currentModifyMapList = state.get('modifyMapList');
    return state.set('modifyMapList', mapListSplice(currentModifyMapList, placeId))
      .set('showPlaceId', '')
      .set('load', false);
  },
  [SET_POSITION_SEARCH_OPEN]: (state, { payload: { isOpen, positionSearchList }}) => {
    return positionSearchList
      ? state.set('positionSearchListOpen', isOpen).set('positionSearchList', positionSearchList)
      : state.set('positionSearchListOpen', isOpen);
  },
  [SET_MARKER_FILTER]: (state, { payload }) => {
    const originFilter = state.get('filter');
    return state.set('filter', { ...originFilter, ...payload });
  }
}, initialState);
  
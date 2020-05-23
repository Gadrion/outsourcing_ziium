import { createAction, handleActions } from 'redux-actions';
  import { Map } from 'immutable';
  
export const GET_CURRENT_LOCATION = 'map/GET_CURRENT_LOCATION';
export const GET_CURRENT_LOCATION_SUCCESS = 'map/GET_CURRENT_LOCATION_SUCCESS';
export const GET_CURRENT_LOCATION_FAILURE = 'map/GET_CURRENT_LOCATION_FAILURE';
export const GET_MAP_GEOCODE = 'map/GET_MAP_GEOCODE';
export const GET_MAP_GEOCODE_SUCCESS = 'map/GET_MAP_GEOCODE_SUCCESS';

export const getCurrentLocation = createAction(GET_CURRENT_LOCATION);
export const getCurrentLocationSuccess = createAction(GET_CURRENT_LOCATION_SUCCESS);
export const getCurrentLocationFailure = createAction(GET_CURRENT_LOCATION_FAILURE);
export const getMapGeocode = createAction(GET_MAP_GEOCODE);
export const getMapGeocodeSuccess = createAction(GET_MAP_GEOCODE_SUCCESS);
  
  const initialState = Map({
		modifyMapList: [],
		currentPosion: {
			lat: 37,
			lng: 127,
    },
    load: false,
  });
  
  // reducer
  export default handleActions({
    [GET_MAP_GEOCODE]: state => state.set('load', true),
    [GET_MAP_GEOCODE_SUCCESS]: (state, { payload: mapData }) => {
			const currentModifyMapList = state.get('modifyMapList');
			return state.set('modifyMapList', [...currentModifyMapList, mapData]).set('load', false);
		},
    [GET_CURRENT_LOCATION_SUCCESS]: (state, { payload }) => state.set('currentPosion', payload),
  }, initialState);
  
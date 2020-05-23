import {
	take, all, put,
} from 'redux-saga/effects';
import {
	GET_MAP_GEOCODE, getMapGeocodeSuccess,
	GET_CURRENT_LOCATION, getCurrentLocationSuccess,
} from 'store/modules/firebase/mapModule';
import Geocode from 'react-geocode';
import { googleMapsApiKey } from '../../../firebase/config';

const getPosition = () => new Promise(resolve => {
	navigator.geolocation.getCurrentPosition(position => {
		resolve(position);
	})
});

function* asyncGetPositionSaga() {
	while (true) {
		yield take(GET_CURRENT_LOCATION);

		try {
			const result = yield getPosition();
			console.log('result', result);

			yield put(getCurrentLocationSuccess({
				lat: result.coords.latitude, lng: result.coords.longitude,
			}));
		} catch (err) {
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

function* asyncGetMapGeocodeSaga() {
	while (true) {
		const { payload: { lat, lng } } = yield take(GET_MAP_GEOCODE);

		try {
			const result = yield Geocode.fromLatLng(lat, lng, googleMapsApiKey, 'ko');
			console.log('result', result);
			const { results } = result;

			yield put(getMapGeocodeSuccess({
				userId: sessionStorage.getItem('id'),
				position: { lat, lng },
				address: results[0].formatted_address,
				label: '',
				placeId: results[0].place_id,
			}));
		} catch (err) {
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

export default function* rootMapSaga() {
	yield all([
		asyncGetPositionSaga(),
		asyncGetMapGeocodeSaga(),
	]);
}
  
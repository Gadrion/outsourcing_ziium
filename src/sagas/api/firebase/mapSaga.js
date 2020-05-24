import {
	take, all, put,
} from 'redux-saga/effects';
import {
	GET_MAP_GEOCODE, getMapGeocodeSuccess,
	GET_CURRENT_LOCATION, getCurrentLocationSuccess,
	UPDATE_MAP_DATA, updateMapDataSuccess,
	DELETE_MAP_DATA, deleteMapDataSuccess,
} from 'store/modules/firebase/mapModule';
import Geocode from 'react-geocode';
import * as firebase from 'firebase';
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
				memo: '상세정보를 입력하세요',
				history: [],
			}));
		} catch (err) {
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

const firebaseDatabaseUpdate = mapData => new Promise((resolve, reject) => {
	// firebase.database.ServerValue.TIMESTAMP
	console.log('mapData', mapData)
	const mapRef = firebase.database().ref(`map/${mapData.placeId}`);
	const currentUser = firebase.auth().currentUser;
	console.log('user', currentUser);
	const authInfo = {
		email: currentUser.email,
		updateData: firebase.database.ServerValue.TIMESTAMP,
	}
	console.log('authInfo', authInfo);
	// history 관리
	mapData.history.push(authInfo);
	mapRef.update({
		...mapData,
	}, error => {
		if (error) {
			console.log('error???', error);
			reject(error);
		} else {
			resolve('sucess');
		}
	});
});

function* asyncUpdateMapDataSaga() {
	while (true) {
		const { payload } = yield take(UPDATE_MAP_DATA);

		try {
			const result = yield firebaseDatabaseUpdate(payload);
			console.log('result', result);
			yield put(updateMapDataSuccess(payload));

		} catch (err) {
			console.log('err', err);
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

const firebaseDatabaseDelete = mapData => new Promise((resolve, reject) => {
	// console.log('mapData', mapData);
	firebase.database().ref(`map/${mapData.placeId}`).remove(error => {
		if (error) {
			console.log('error???', error);
			reject(error);
		} else {
			resolve('sucess');
		}
	})
});

function* asyncDeleteMapDataSaga() {
	while (true) {
		const { payload } = yield take(DELETE_MAP_DATA);

		try {
			const result = yield firebaseDatabaseDelete(payload);
			console.log('result', result);
			// yield put(updateMapDataSuccess(payload));

		} catch (err) {
			console.log('err', err);
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

export default function* rootMapSaga() {
	yield all([
		asyncGetPositionSaga(),
		asyncGetMapGeocodeSaga(),
		asyncUpdateMapDataSaga(),
		asyncDeleteMapDataSaga(),
	]);
}
  
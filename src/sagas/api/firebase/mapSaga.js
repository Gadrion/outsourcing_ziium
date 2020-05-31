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
				option: {},
				imageFiles: [],
			}));
		} catch (err) {
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

const firebaseDatabaseUpdate = mapData => new Promise((resolve, reject) => {
	console.log('mapData', mapData);
	const mapRef = firebase.database().ref(`map/${mapData.placeId}`);
	const currentUser = firebase.auth().currentUser;
	// console.log('user', currentUser);
	const authInfo = {
		userId: currentUser.email,
		updateData: firebase.database.ServerValue.TIMESTAMP,
	}
	const imageFiles = [];
	if (mapData.imageFiles.length !== 0) {
		mapData.imageFiles.map(imageFile => {
			if (imageFile.status !== 'delete') {
				imageFiles.push({
					name: imageFile.file ? imageFile.file.name : imageFile.name,
					type: imageFile.file ? imageFile.file.type : imageFile.type,
				});
			}
		});
	}
	// console.log('authInfo', authInfo);
	// history 관리
	mapData.history.push(authInfo);
	mapRef.update({
		...mapData,
		imageFiles,
	}, error => {
		if (error) {
			console.log('error???', error);
			reject(error);
		} else {
			resolve('sucess');
		}
	});
});

const firebaseStorageUpdate = (placeId, imageData) => new Promise((resolve, reject) => {
	const mapRef = firebase.storage().ref().child(`map/${placeId}/${imageData.name}`);
	mapRef.put(imageData).then(snapshot => {
		console.log('snapshot', snapshot);
		resolve('sucess');
	}).catch(error => {
		console.log('error???', error);
			reject(error);
	});
});

const mapdataImageUpdate = async mapData => {
	let updateResult = 'sucess';
	for(let i = mapData.imageFiles.length - 1; i >= 0; i--) {
		const imageData = mapData.imageFiles[i];
		console.log('imageData', imageData);
		if (imageData.file) {
			const result = await firebaseStorageUpdate(mapData.placeId, imageData.file);
			console.log('result', result);
		}
	}
	return updateResult;
}

function* asyncUpdateMapDataSaga() {
	while (true) {
		const { payload } = yield take(UPDATE_MAP_DATA);

		try {
			const result = yield firebaseDatabaseUpdate(payload);
			if (payload.imageFiles && payload.imageFiles.length !== 0) {
				const result2 = yield mapdataImageUpdate(payload);
				console.log('result2', result2);
			}
			console.log('result', result);
			yield put(updateMapDataSuccess(payload));

		} catch (err) {
			console.log('err', err);
			// yield put(preLoadActions.sessionKeyGetFailure(''));
		}
	}
}

// 삭제 할 때 사용하던것
// const firebaseDatabaseDelete = mapData => new Promise((resolve, reject) => {
// 	// console.log('mapData', mapData);
// 	firebase.database().ref(`map/${mapData.placeId}`).remove(error => {
// 		if (error) {
// 			console.log('error???', error);
// 			reject(error);
// 		} else {
// 			resolve('sucess');
// 		}
// 	});
// });

const firebaseDatabaseDelete = mapData => new Promise((resolve, reject) => {
	console.log('mapData', mapData);
	const mapRef = firebase.database().ref(`map/${mapData.placeId}`);
	const currentUser = firebase.auth().currentUser;
	// console.log('user', currentUser);
	const authInfo = {
		userId: currentUser.email,
		updateData: firebase.database.ServerValue.TIMESTAMP,
	}
	mapData.history.push(authInfo);
	mapRef.child('history').set(mapData.history, error => {
		if (error) {
			console.log('error???', error);
			reject(error);
		} else {
			mapRef.child('status').set('close', error => {
				if (error) {
					console.log('error???', error);
					reject(error);
				} else {
					resolve('sucess');
				}
			});
		}
	});
});

function* asyncDeleteMapDataSaga() {
	while (true) {
		const { payload } = yield take(DELETE_MAP_DATA);

		try {
			if (payload.history.length !== 0) {
				const result = yield firebaseDatabaseDelete(payload);
				console.log('result', result);
			}
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
  
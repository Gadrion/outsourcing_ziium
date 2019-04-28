// import {
//   take, all, put, call,
// } from 'redux-saga/effects';
// import { SunapiClient } from 'util/lib';
// import * as umpInitailizeActions from 'store/modules/ump/initialize/umpInitailizeModule';

// const onloadCheck = () => new Promise(resolve => {
//   document.body.onload = event => {
//     resolve(event);
//   };
// });

// const onerrorCheck = () => new Promise(resolve => {
//   document.body.onerror = event => {
//     resolve(event);
//   };
// });

// const onUmploadCheck = scriptTag => new Promise(resolve => {
//   const scriptTag2 = scriptTag; // ... lint error 때문에 이렇게.... 수정 필요
//   scriptTag2.onload = event => {
//     resolve(event);
//   };
// });

// function* asyncUmpFileLoadCheckSaga() {
//   while (true) {
//     yield take(umpInitailizeActions.FILE_LOAD_CHECK);
//     yield put(umpInitailizeActions.fileOnErrorCheck());
//     yield put(umpInitailizeActions.fileOnLoadCheck());
//   }
// }

// function* asyncBodyOnLoadCheckSaga() {
//   while (true) {
//     yield take(umpInitailizeActions.FILE_ONLOAD_CHECK);

//     const event = yield call(onloadCheck);
//     yield put(umpInitailizeActions.fileLoadCheckSuccess(event.returnValue));
//   }
// }

// function* asyncBodyOnErrorCheckSaga() {
//   while (true) {
//     yield take(umpInitailizeActions.FILE_ONERROR_CHECK);

//     const event = yield call(onerrorCheck);

//     yield put(umpInitailizeActions.fileLoadCheckFailure({
//       event,
//       error: true,
//     }));
//   }
// }

// function* asyncUmpOnLoadCheckSaga() {
//   while (true) {
//     const action = yield take(umpInitailizeActions.FILE_UMP_LOAD_CHECK);
//     try {
//       const event = yield call(onUmploadCheck, action.payload);
//       yield put(umpInitailizeActions.fileUMPLoadSuccess(event.returnValue));
//     } catch (err) {
//       yield put(umpInitailizeActions.fileLoadCheckFailure(false));
//     }
//   }
// }

// function* asyncUmpSessionKeyGetSaga() {
//   while (true) {
//     yield take(umpInitailizeActions.SESSION_KEY_GET);

//     try {
//       const sessionkey = yield SunapiClient.get
// ('/stw-cgi/media.cgi?msubmenu=sessionkey&action=view');

//       yield put(umpInitailizeActions.sessionKeyGetSucces(sessionkey.data));
//     } catch (err) {
//       yield put(umpInitailizeActions.sessionKeyGetFailure(''));
//     }
//   }
// }

// export default function* rootUmpInitailizeSaga() {
//   yield all([
//     asyncUmpFileLoadCheckSaga(),
//     asyncBodyOnLoadCheckSaga(),
//     asyncBodyOnErrorCheckSaga(),
//     asyncUmpOnLoadCheckSaga(),
//     asyncUmpSessionKeyGetSaga(),
//   ]);
// }

import {
  take,
  call,
  put,
  all,
} from 'redux-saga/effects';
import {
  delay,
} from 'redux-saga';
import Attributes from 'util/lib/Attributes';
import * as sunapiActions from 'store/modules/sunapi/sunapiModule';

const callInterval = 500;

function* asyncLoadAttributesSaga() {
  while (true) {
    const action = yield take(sunapiActions.LOAD_ATTRIBUTES);

    yield put(sunapiActions.loadAttributesPendding(true));

    const isLoaded = yield Attributes.load(action.payload);

    if (isLoaded) {
      yield put(sunapiActions.loadAttributesSuccess());
    } else {
      yield put(sunapiActions.waitAttributes(callInterval));
    }
  }
}

function* asyncWaitAttributesSaga() {
  while (true) {
    yield take(sunapiActions.LOAD_ATTRIBUTES_WAIT);
    let result = null;

    result = yield Attributes.wait();

    switch (result) {
      case 'READY':
        yield put(sunapiActions.loadAttributesSuccess(Attributes.get()));
        break;
      case 'RETRY':
        yield put(sunapiActions.loadAttributes(callInterval));
        break;
      case 'WAIT':
        yield put(sunapiActions.waitThenAttributes());
        break;
      default:
        yield put(sunapiActions.loadAttributesFailure());
        break;
    }
  }
}

function* asyncWaitThenAttributesSaga() {
  while (true) {
    yield take(sunapiActions.LOAD_ATTRIBUTES_WAIT_THEN);

    yield call(delay, callInterval);

    yield put(sunapiActions.waitAttributes(callInterval));
  }
}

export default function* rootAttributesSaga() {
  yield all([
    asyncLoadAttributesSaga(),
    asyncWaitAttributesSaga(),
    asyncWaitThenAttributesSaga(),
  ]);
}

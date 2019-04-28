import {
  take,
  put,
  all,
  select,
  call,
} from 'redux-saga/effects';
import * as cameraInfoActions from 'store/modules/camera/cameraInfoModule';
import * as liveMediaControlActions from 'store/modules/mediaControl/liveMediaControlModule';
import { makeCameraUID } from 'wisenet-ui/util/function/make';

function* haveEmptyLayoutCount(layoutPageNumber) {
  const moduleState = yield select(state => ({
    tileCameraListPage: state.cameraInfoModule.toJS().tileCameraListPage,
    patternTileCount: state.liveMediaControlModule.get('layoutPageInfo').get('patternTileCount'),
  }));

  const { tileCameraListPage, patternTileCount } = moduleState;
  const currentPageNumberLayoutCameraList = tileCameraListPage[layoutPageNumber];
  if (currentPageNumberLayoutCameraList) {
    return {
      layoutPageTileCameraList: tileCameraListPage[layoutPageNumber],
      emptyCount: patternTileCount - currentPageNumberLayoutCameraList.length,
    };
  }
  return {
    layoutPageTileCameraList: [],
    emptyCount: patternTileCount,
  };
}

function* spreadTileCameraList(makeCameraList) {
  let pageCount = 1;
  const spreadTileCameraListObject = {};
  while (makeCameraList.length !== 0) {
    const { layoutPageTileCameraList, emptyCount } = yield call(haveEmptyLayoutCount, pageCount);
    const sliceCameraList = makeCameraList.splice(0, emptyCount);
    spreadTileCameraListObject[pageCount] = [...layoutPageTileCameraList, ...sliceCameraList];
    pageCount += 1;
  }
  return spreadTileCameraListObject;
}

function* asyncOnTileCameraListSaga() {
  while (true) {
    const action = yield take(cameraInfoActions.ON_TILE_CAMERA_LIST);
    const { selectCameraList, toItem } = action.payload;
    const moduleState = yield select(state => ({
      cameraList: state.cameraInfoModule.get('cameraList').toJS(),
      layoutPageMaxNumber: state.liveMediaControlModule.get('layoutPageInfo').get('patternTileCount'),
      layoutPageCurrentNumber: state.liveMediaControlModule.get('layoutPageInfo').get('currentNumber'),
    }));

    const { cameraList, layoutPageMaxNumber, layoutPageCurrentNumber } = moduleState;

    const newSelectCameraList = selectCameraList.map(selectIndex => {
      const selectCamera = cameraList[selectIndex];
      const uid = makeCameraUID(selectCamera.channel);
      selectCamera.uid = uid;
      if (selectCameraList.length === 1 && toItem) {
        return {
          ...selectCamera,
          ...toItem,
        };
      }
      return selectCamera;
    });

    const tileCameraListPage = yield call(spreadTileCameraList, newSelectCameraList);
    const currentLayoutPageMaxNumber = Object.keys(tileCameraListPage).length;

    if (currentLayoutPageMaxNumber === 0) {
      tileCameraListPage[layoutPageCurrentNumber] = [];
    } else if (layoutPageMaxNumber !== currentLayoutPageMaxNumber) {
      yield put(liveMediaControlActions.setLayoutPageMaxNumber({
        layoutPageMaxNumber: currentLayoutPageMaxNumber,
      }));
    }

    yield put(cameraInfoActions.setTileCameraList({
      tileCameraListPage,
    }));
  }
}

export default function* rootCameraInfoSaga() {
  yield all([
    asyncOnTileCameraListSaga(),
  ]);
}

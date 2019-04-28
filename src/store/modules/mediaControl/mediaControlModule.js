import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// action
export const ASPECT_RATIO_CONTROL = 'mediaControl/ASPECT_RATIO_CONTROL';
export const ASPECT_RATIO_ALL_CONTROL = 'mediaControl/ASPECT_RATIO_ALL_CONTROL';
export const CAPTURE_CONTROL = 'mediaControl/CAPTURE_CONTROL';
export const PCRECORD_CONTROL = 'mediaControl/PCRECORD_CONTROL';

// action create
export const aspectRatioControl = createAction(ASPECT_RATIO_CONTROL);
export const aspectRatioAllControl = createAction(ASPECT_RATIO_ALL_CONTROL);
export const captureControl = createAction(CAPTURE_CONTROL);
export const pcrecordControl = createAction(PCRECORD_CONTROL);

const initialState = Map({
  aspectRatioList: List([]),
  isAllAspectRatio: false,
  captureUidList: List([]),
  pcrecordUidList: List([]),
});

// reducer
export default handleActions({
  [CAPTURE_CONTROL]: (state, { payload: { uid, type = 'add' } }) => {
    const captureUidList = state.get('captureUidList');
    if (type === 'add') {
      return state.set('captureUidList', captureUidList.push(uid));
    }
    const findUid = captureUidList.findIndex(captureUid => captureUid === uid);
    return state.set('captureUidList', captureUidList.delete(findUid));
  },
  [PCRECORD_CONTROL]: (state, { payload: { uid, time, type = 'add' } }) => {
    const pcrecordUidList = state.get('pcrecordUidList');
    console.log(' pcrecordUidList : ', pcrecordUidList.toJS(), 'time :', time);
    if (type === 'add') {
      return state.set('pcrecordUidList', pcrecordUidList.push(uid, time));
    }
    const findUid = pcrecordUidList.findIndex(pcrecordUid => pcrecordUid === uid);
    return state.set('pcrecordUidList', pcrecordUidList.delete(findUid));
  },
  [ASPECT_RATIO_CONTROL]: (state, { payload: { uid } }) => {
    const aspectRatioList = state.get('aspectRatioList');
    const findUid = aspectRatioList.findIndex(aspectUid => aspectUid === uid);
    if (findUid === -1) {
      return state.set('aspectRatioList', aspectRatioList.push(uid));
    }

    return state.set('aspectRatioList', aspectRatioList.delete(findUid))
      .set('isAllAspectRatio', false);
  },
  [ASPECT_RATIO_ALL_CONTROL]: (state, { payload: { tileCameraList } }) => {
    const isAllAspectRatio = state.get('isAllAspectRatio');
    const aspectRatioList = state.get('aspectRatioList');
    if (isAllAspectRatio) {
      return state.set('aspectRatioList', List([]))
        .set('isAllAspectRatio', false);
    }
    const uidList = tileCameraList.map(selectItem => selectItem.get('uid'));
    return state.set('aspectRatioList', aspectRatioList.push(...uidList))
      .set('isAllAspectRatio', true);
  },
}, initialState);

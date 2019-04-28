import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// action
export const PATTERN_CONTROL = 'liveMediaControl/PATTERN_CONTROL';
export const BACKUP_CURRENT_LAYOUT_CONTROL = 'liveMediaControl/BACKUP_CURRENT_LAYOUT_CONTROL';
export const OSD_DISPLAY_CONTROL = 'liveMediaControl/OSD_DISPLAY_CONTROL';
export const CHANNEL_INFO_VISIBLE_CONTROL = 'liveMediaControl/CHANNEL_INFO_VISIBLE_CONTROL';
export const CHANNEL_INFO_MODE_CONTROL = 'liveMediaControl/CHANNEL_INFO_MODE_CONTROL';
export const ALARM_STOP = 'liveMediaControl/ALARM_STOP';
export const SET_LAYOUT_PAGE_MAX_NUMBER = 'liveMediaControl/SET_LAYOUT_PAGE_MAX_NUMBER';
export const SET_LAYOUT_PAGE_CURRENT_NUMBER = 'liveMediaControl/SET_LAYOUT_PAGE_CURRENT_NUMBER';
export const SET_LAYOUT_PAGE_INFO = 'liveMediaControl/SET_LAYOUT_PAGE_INFO';

export const MANULA_RECORDING_START = 'liveMediaControl/MANULA_RECORDING_START';
export const MANULA_RECORDING_STOP = 'liveMediaControl/MANULA_RECORDING_STOP';

// action create
export const patternControl = createAction(PATTERN_CONTROL);
export const backupLayoutControl = createAction(BACKUP_CURRENT_LAYOUT_CONTROL);
export const OSDDisplayControl = createAction(OSD_DISPLAY_CONTROL);
export const channelInfoVisibleControl = createAction(CHANNEL_INFO_VISIBLE_CONTROL);
export const channelInfoModeControl = createAction(CHANNEL_INFO_MODE_CONTROL);
export const alarmStop = createAction(ALARM_STOP);
export const setLayoutPageMaxNumber = createAction(SET_LAYOUT_PAGE_MAX_NUMBER);
export const setLayoutPageCurrentNumber = createAction(SET_LAYOUT_PAGE_CURRENT_NUMBER);
export const setLayoutPageInfo = createAction(SET_LAYOUT_PAGE_INFO);

export const manualRecordingStart = createAction(MANULA_RECORDING_START);
export const manualRecordingStop = createAction(MANULA_RECORDING_STOP);

const initialState = Map({
  pattern: '4_3X3',
  layoutType: 'static',
  needBackupLayoutData: false,
  backupPattern: '4_3X3',
  backupLayout: Map({}),
  OSDDisplay: true,
  channelInfoDisplay: Map({
    isVisible: true,
    isDevelopMode: false,
  }),
  layoutPageInfo: Map({
    currentNumber: 1,
    maxNumber: 1,
    patternTileCount: 9,
  }),
  isMaunalBackup: false,
});

// reducer
export default handleActions({
  [PATTERN_CONTROL]: (state, { payload: { pattern } }) => {
    const layoutType = state.get('layoutType');
    const isBeforeDynamic = layoutType === 'dynamic';
    const isAfterDynamic = pattern === 'dynamic';

    if (isBeforeDynamic !== isAfterDynamic) {
      return state.set('layoutType', isAfterDynamic ? 'dynamic' : 'static')
        .set('pattern', pattern);
    }

    return state.set('backupPattern', pattern === 'SPECIAL' ? state.get('pattern') : '4_3X3')
      .set('pattern', pattern);
  },
  [BACKUP_CURRENT_LAYOUT_CONTROL]: (state, { payload: { needBackupLayoutData, backupLayout } }) => (
    state.set('needBackupLayoutData', needBackupLayoutData)
      .set('backupLayout', backupLayout || Map({}))
  ),
  [OSD_DISPLAY_CONTROL]: state => state.set('OSDDisplay', !state.get('OSDDisplay')),
  [CHANNEL_INFO_VISIBLE_CONTROL]: state => {
    const channelInfoDisplay = state.get('channelInfoDisplay').toJS();
    return state.set('channelInfoDisplay', Map({
      ...channelInfoDisplay,
      isVisible: !channelInfoDisplay.isVisible,
    }));
  },
  [CHANNEL_INFO_MODE_CONTROL]: state => {
    const channelInfoDisplay = state.get('channelInfoDisplay').toJS();
    return state.set('channelInfoDisplay', Map({
      ...channelInfoDisplay,
      isDevelopMode: !channelInfoDisplay.isDevelopMode,
    }));
  },
  [SET_LAYOUT_PAGE_MAX_NUMBER]: (state, { payload: { layoutPageMaxNumber } }) => (
    state.setIn(['layoutPageInfo', 'maxNumber'], layoutPageMaxNumber)
  ),
  [SET_LAYOUT_PAGE_CURRENT_NUMBER]: (state, { payload: { layoutPageCurrentNumber } }) => (
    state.setIn(['layoutPageInfo', 'currentNumber'], layoutPageCurrentNumber)
  ),
  [SET_LAYOUT_PAGE_INFO]: (
    state,
    {
      payload: {
        layoutPageMaxNumber,
        layoutPageCurrentNumber,
        layoutPagePatternTileCount,
      },
    },
  ) => (
    state.set('layoutPageInfo', Map({
      currentNumber: layoutPageCurrentNumber,
      maxNumber: layoutPageMaxNumber,
      patternTileCount: layoutPagePatternTileCount,
    }))
  ),
}, initialState);

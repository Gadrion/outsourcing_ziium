import { bindActionCreators } from 'redux';
import store from './index';
import * as loginActions from './modules/login/loginModule';
import * as langActions from './modules/base/langModule';
import * as themeActions from './modules/base/themeModule';
import * as headerActions from './modules/header/headerModule';
import * as sunapiActions from './modules/sunapi/sunapiModule';
import * as cameraInfoActions from './modules/camera/cameraInfoModule';
import * as preLoadActions from './modules/page/preLoadModule';
import * as ptzControlActions from './modules/ptz/ptzControlModule';
import * as ptzSequenceActions from './modules/ptz/ptzSequenceModule';
import * as ptzZoomFocusActions from './modules/ptz/ptzZoomFocusModule';

import * as eventSearchActions from './modules/eventSearch/eventSearchModule';
import * as textSearchActions from './modules/textSearch/textSearchModule';
import * as searchMediaControlActions from './modules/mediaControl/searchMediaControlModule';
import * as searchTimelineActions from './modules/mediaControl/searchTimelineModule';
import * as liveMediaControlActions from './modules/mediaControl/liveMediaControlModule';
import * as mediaControlActions from './modules/mediaControl/mediaControlModule';
import * as eventStatusActions from './modules/eventStatus/eventStatusModule';
import * as postLoadActions from './modules/page/postLoadModule';
import * as systemInfomationActions from './modules/system/systemInfomationModule';
import * as layoutActions from './modules/page/layoutModule';
import * as liveRecordStatusActions from './modules/liveRecordStatus/liveRecordStatusModule';

import * as mapActions from './modules/firebase/mapModule';
import * as stuffActions from './modules/stuff/stuffModule';

const { dispatch } = store;

export const LoginActions = bindActionCreators(loginActions, dispatch);
export const LangActions = bindActionCreators(langActions, dispatch);
export const ThemeActions = bindActionCreators(themeActions, dispatch);
export const HeaderActions = bindActionCreators(headerActions, dispatch);
export const SunapiActions = bindActionCreators(sunapiActions, dispatch);
export const CameraInfoActions = bindActionCreators(cameraInfoActions, dispatch);
export const PreLoadActions = bindActionCreators(preLoadActions, dispatch);
export const PTZControlActions = bindActionCreators(ptzControlActions, dispatch);
export const PTZSequenceActions = bindActionCreators(ptzSequenceActions, dispatch);
export const PTZZoomFocusActions = bindActionCreators(ptzZoomFocusActions, dispatch);

export const EventSearchActions = bindActionCreators(eventSearchActions, dispatch);
export const TextSearchActions = bindActionCreators(textSearchActions, dispatch);
export const SearchMediaControlActions = bindActionCreators(searchMediaControlActions, dispatch);
export const SearchTimelineActions = bindActionCreators(searchTimelineActions, dispatch);
export const LiveMediaControlActions = bindActionCreators(liveMediaControlActions, dispatch);
export const MediaControlActions = bindActionCreators(mediaControlActions, dispatch);
export const EventStatusActions = bindActionCreators(eventStatusActions, dispatch);
export const PostLoadActions = bindActionCreators(postLoadActions, dispatch);
export const SystemInfomationActions = bindActionCreators(systemInfomationActions, dispatch);
export const LayoutActions = bindActionCreators(layoutActions, dispatch);
export const LiveRecordStatusActions = bindActionCreators(liveRecordStatusActions, dispatch);

export const MapActions = bindActionCreators(mapActions, dispatch);
export const StuffActions = bindActionCreators(stuffActions, dispatch);

export const MediaControlIDList = {
  CAPTURE: 'capture',
  PC_RECORD: 'pcRecord',
  INSTANT_PLAYBACK: 'instantPlayback',
  PTZ_CONTROL: 'ptzControl',
  D_ZOOM: 'dZoom',
  SOUND: 'sound',
  ROTATE: 'rotate',
  // FIT: 'fit',
  ASPECT_RATIO: 'aspectRatio',
  EXPORT: 'export',
  OSD: 'osd',
  CH_INFO: 'chInfo',
  STATUS: 'status',
  LAYOUT_PAGE_LEFT: 'layoutPageLeft',
  LAYOUT_PAGE_INPUT: 'layoutPageInput',
  LAYOUT_PAGE_RIGHT: 'layoutPageRight',
  PATTERN: 'pattern',
  FULLSCREEN: 'fullscreen',
  AREA: 'area',
  PREV_EVENT: 'prevEvent',
  BACKWARD: 'backward',
  PAUSE: 'pause',
  PLAY: 'play',
  FORWARD: 'forward',
  AFTER_EVENT: 'afterEvent',
  PLAY_SPEED: 'playSpeed',
  PLAY_SPEED_LIST: ['x0.125', 'x0.25', 'x0.50', 'x1', 'x2', 'x4', 'x8', 'x16', 'x32', 'x64'],
  PLAY_SPEED_FRACTION_LIST: ['x1/8', 'x1/4', 'x1/2', 'x1', 'x2', 'x4', 'x8', 'x16', 'x32', 'x64'],
  PLAY_SPEED_M_FRACTION_LIST: ['-x1/8', '-x1/4', '-x1/2', '-x1', '-x2', '-x4', '-x8', '-x16', '-x32', '-x64'],
  RECORD: 'record',
  ALARM: 'alarm',
  PIXEL: 'pixel',
  MIC: 'mic',
  SETUP: 'setup',
  TIMELINE_FOLD: 'tilelineFold',
};

export const MediaControlIconButtonList = {
  [MediaControlIDList.CAPTURE]: {
    clickId: MediaControlIDList.CAPTURE,
    iconId: 'wni wni-capture',
  },
  [MediaControlIDList.PC_RECORD]: {
    clickId: MediaControlIDList.PC_RECORD,
    iconId: 'wni wni-recording',
  },
  [MediaControlIDList.INSTANT_PLAYBACK]: {
    clickId: MediaControlIDList.INSTANT_PLAYBACK,
    iconId: 'wni wni-instant-playback',
  },
  [MediaControlIDList.PTZ_CONTROL]: {
    clickId: MediaControlIDList.PTZ_CONTROL,
    iconId: 'wni wni-ptz-control',
  },
  [MediaControlIDList.D_ZOOM]: {
    clickId: MediaControlIDList.D_ZOOM,
    iconId: 'wni wni-areazoom', // 임시
  },
  [MediaControlIDList.SOUND]: {
    clickId: MediaControlIDList.SOUND,
    iconId: 'wni wni-sound',
  },
  [MediaControlIDList.ROTATE]: {
    clickId: MediaControlIDList.ROTATE,
    iconId: 'wni wni-rotate',
  },
  // [MediaControlIDList.FIT]: {
  //   clickId: MediaControlIDList.FIT,
  //   iconId: 'tui-ch-live-view-fit',
  // },
  [MediaControlIDList.ASPECT_RATIO]: {
    clickId: MediaControlIDList.ASPECT_RATIO,
    iconId: 'wni wni-aspact-ratio',
  },
  [MediaControlIDList.EXPORT]: {
    clickId: MediaControlIDList.EXPORT,
    iconId: 'wni wni-export',
  },
  [MediaControlIDList.OSD]: {
    clickId: MediaControlIDList.OSD,
    iconId: 'wni wni-osd-showhide',
  },
  [MediaControlIDList.CH_INFO]: {
    clickId: MediaControlIDList.CH_INFO,
    iconId: 'wni wni-camerainfo-showhide',
  },
  [MediaControlIDList.STATUS]: {
    clickId: MediaControlIDList.STATUS,
    iconId: 'wni wni-status',
  },
  [MediaControlIDList.LAYOUT_PAGE_LEFT]: {
    clickId: MediaControlIDList.LAYOUT_PAGE_LEFT,
    iconId: 'wni wni-arrow-left', // 임시
  },
  [MediaControlIDList.LAYOUT_PAGE_RIGHT]: {
    clickId: MediaControlIDList.LAYOUT_PAGE_RIGHT,
    iconId: 'wni wni-arrow-right',
  },
  [MediaControlIDList.PATTERN]: {
    clickId: MediaControlIDList.PATTERN,
    iconId: 'wni wni-pattern-1',
  },
  [MediaControlIDList.FULLSCREEN]: {
    clickId: MediaControlIDList.FULLSCREEN,
    iconId: 'wni wni-full-screen',
  },
  [MediaControlIDList.AREA]: {
    clickId: MediaControlIDList.AREA,
    iconId: 'wni wni-close', // 임시
  },
  [MediaControlIDList.PREV_EVENT]: {
    clickId: MediaControlIDList.PREV_EVENT,
    iconId: 'wni wni-backward-fast',
  },
  [MediaControlIDList.BACKWARD]: {
    clickId: MediaControlIDList.BACKWARD,
    iconId: 'wni wni-backward-slow',
  },
  [MediaControlIDList.PAUSE]: {
    clickId: MediaControlIDList.PAUSE,
    iconId: 'wni wni-status', // 임시
  },
  [MediaControlIDList.PLAY]: {
    clickId: MediaControlIDList.PLAY,
    iconId: 'wni wni-play',
  },
  [MediaControlIDList.FORWARD]: {
    clickId: MediaControlIDList.FORWARD,
    iconId: 'wni wni-forward-slow',
  },
  [MediaControlIDList.AFTER_EVENT]: {
    clickId: MediaControlIDList.AFTER_EVENT,
    iconId: 'wni wni-forward-fast',
  },
  [MediaControlIDList.RECORD]: {
    clickId: MediaControlIDList.RECORD,
    iconId: 'wni wni-recording',
  },
  [MediaControlIDList.ALARM]: {
    clickId: MediaControlIDList.ALARM,
    iconId: 'wni wni-alarm',
  },
  [MediaControlIDList.SETUP]: {
    clickId: MediaControlIDList.SETUP,
    iconId: 'wni wni-setup',
  },
  [MediaControlIDList.TIMELINE_FOLD]: {
    clickId: MediaControlIDList.TIMELINE_FOLD,
    iconId: 'wni wni-arrow',
  },
};

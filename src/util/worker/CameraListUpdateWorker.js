const cameraListUpdateWorker = () => {
  const beforCheck = {
    cameraInfo: false,
    cameraEventInfo: false,
  };
  let beforeCameraInfoList = [];
  let beforeCameraEventInfoList = [];

  onmessage = receiveData => {
    const {
      ptzInfoList,
      registerCamInfoList,
      cameraSourceInfoList,
      recordGeneralInfoList,
      channelEventInfoList,
    } = receiveData.data;

    const cameraList = [];
    const cameraEventList = [];

    registerCamInfoList.map(registerCameraInfo => {
      const channel = registerCameraInfo.Channel;
      const channelEventInfo = channelEventInfoList ? channelEventInfoList[channel] : null;
      const recordChannel = recordGeneralInfoList.find(recordInfo => (
        recordInfo.Channel === channel
      ));
      const { isOpticalPTZ, ptzInfo } = cameraListUpdateWorker.convertPtzInfo(
        registerCameraInfo, ptzInfoList[channel],
      );

      const status = cameraListUpdateWorker.convertStatus(
        registerCameraInfo, cameraSourceInfoList[channel], channelEventInfo,
      );

      cameraList.push({
        addressType: registerCameraInfo.AddressType,
        channel,
        channelName: cameraSourceInfoList[channel].Name,
        devicePort: registerCameraInfo.DevicePort,
        httpPort: registerCameraInfo.HTTPPort,
        ipAddress: registerCameraInfo.IPAddress,
        model: registerCameraInfo.Model,
        protocol: registerCameraInfo.Protocol,
        isOpticalPTZ,
        ptzInfo,
        recordStatus: recordChannel ? recordChannel.RecordOverlap : undefined,
        status,
        userId: registerCameraInfo.UserID,
      });

      if (channelEventInfo) {
        const eventInfo = cameraListUpdateWorker.convertEventInfo(channelEventInfo);
        cameraEventList.push(eventInfo);
      }

      return null;
    });

    beforCheck.cameraInfo = JSON.stringify(beforeCameraInfoList) === JSON.stringify(cameraList);
    beforCheck.cameraEventInfo = (
      JSON.stringify(beforeCameraEventInfoList) === JSON.stringify(cameraEventList)
    );

    beforeCameraInfoList = beforCheck.cameraInfo ? beforeCameraInfoList : cameraList;
    beforeCameraEventInfoList = (
      beforCheck.cameraEventInfo ? beforeCameraEventInfoList : cameraEventList
    );

    postMessage({
      cameraList: beforCheck.cameraInfo ? null : cameraList,
      cameraEventList: beforCheck.cameraEventInfo ? null : cameraEventList,
    });
  };

  cameraListUpdateWorker.convertStatus = (cameraInfo, cameraSourceInfo, channelEventInfo) => {
    const sourceState = cameraSourceInfo.State;
    if (sourceState.includes('Covert')) {
      return sourceState;
    }

    if (channelEventInfo && channelEventInfo.Videoloss) {
      return 'VideoLoss';
    }

    return cameraInfo.Status;
  };

  cameraListUpdateWorker.convertPtzInfo = (cameraInfo, ptzInfo) => {
    const getModelName = cameraInfo.Model.split('-')[0];
    const isOpticalPTZ = getModelName.includes('P', getModelName.length - 1) || (
      ptzInfo.Continuous.Pan || ptzInfo.Continuous.Tilt || ptzInfo.Continuous.Zoom
    );

    return isOpticalPTZ || ptzInfo.DigitalPTZ ? {
      isOpticalPTZ,
      ptzInfo: {
        areaZoom: ptzInfo.AreaZoom,
        digitalAutoTracking: ptzInfo.DigitalAutoTracking,
        digitalPTZ: ptzInfo.DigitalPTZ,
        focus: ptzInfo.Continuous.Focus,
        group: ptzInfo.Group,
        home: ptzInfo.Home,
        iris: ptzInfo.Continuous.Iris,
        pan: ptzInfo.Continuous.Pan,
        panSpeed: ptzInfo.Continuous.PanSpeed,
        preset: ptzInfo.Preset,
        ptzLimit: ptzInfo.PTZLimit,
        swing: ptzInfo.Swing,
        tilt: ptzInfo.Continuous.Tilt,
        tiltSpeed: ptzInfo.Continuous.TiltSpeed,
        tour: ptzInfo.Tour,
        trace: ptzInfo.Trace,
        zoom: ptzInfo.Continuous.Zoom,
        zoomSpeed: ptzInfo.Continuous.ZoomSpeed,
      },
    } : {
      isOpticalPTZ,
      ptzInfo: undefined,
    };
  };

  cameraListUpdateWorker.convertEventInfo = eventInfo => ({
    channel: eventInfo.Channel,
    AMDStart: eventInfo.AMDStart,
    audioAnalytics: {
      scream: eventInfo.AudioAnalytics.Scream,
      gunshot: eventInfo.AudioAnalytics.Gunshot,
      explosion: eventInfo.AudioAnalytics.Explosion,
      glassBreak: eventInfo.AudioAnalytics.GlassBreak,
    },
    audioDetection: eventInfo.AudioDetection,
    defocusDetection: eventInfo.DefocusDetection,
    faceDetection: eventInfo.FaceDetection,
    fogDetection: eventInfo.FogDetection,
    lowFps: eventInfo.LowFps,
    motionDetection: eventInfo.MotionDetection,
    networkAlarmInput: eventInfo.NetworkAlarmInput,
    networkCameraConnect: eventInfo.NetworkCameraConnect,
    sdFail: eventInfo.SDFail,
    sdFull: eventInfo.SDFull,
    tampering: eventInfo.Tampering,
    tracking: eventInfo.Tracking,
    videoAnalytics: {
      appearing: eventInfo.VideoAnalytics.Appearing,
      disappearing: eventInfo.VideoAnalytics.Disappearing,
      entering: eventInfo.VideoAnalytics.Entering,
      exiting: eventInfo.VideoAnalytics.Exiting,
      intrusion: eventInfo.VideoAnalytics.Intrusion,
      loitering: eventInfo.VideoAnalytics.Loitering,
      passing: eventInfo.VideoAnalytics.Passing,
    },
  });
};

export default cameraListUpdateWorker;

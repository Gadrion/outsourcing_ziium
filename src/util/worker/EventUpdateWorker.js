const eventUpdateWorker = () => {
  const beforeDeviceEvent = {
    alarmInput: {},
    alarmOutput: {},
    audioOutput: {},
    systemEvent: {},
  };

  let beforPosEventLength = 0;

  onmessage = receiveData => {
    const {
      type,
      messageData,
    } = receiveData.data;

    switch (type) {
      case 'deviceEvent': {
        eventUpdateWorker.checkDeviceSystemEvent(messageData);
        break;
      }
      case 'posEvent': {
        eventUpdateWorker.checkPosEvent(messageData);
        break;
      }
      default:
        break;
    }
  };

  eventUpdateWorker.checkDeviceSystemEvent = deviceEvent => {
    const {
      alarmInput,
      alarmOutput,
      audioOutput,
      systemEvent,
    } = deviceEvent;
    const beforeEvent = beforeDeviceEvent;

    const convertSystemEvent = eventUpdateWorker.convertSystemEvent(systemEvent);

    const alarmInputChange = (
      JSON.stringify(beforeEvent.alarmInput) !== JSON.stringify(alarmInput)
    );
    const alarmOutputChange = (
      JSON.stringify(beforeEvent.alarmOutput) !== JSON.stringify(alarmOutput)
    );
    const audioOutputChange = (
      JSON.stringify(beforeEvent.audioOutput) !== JSON.stringify(audioOutput)
    );
    const systemEventChange = (
      JSON.stringify(beforeEvent.systemEvent) !== JSON.stringify(convertSystemEvent)
    );

    beforeEvent.alarmInput = alarmInputChange ? alarmInput : beforeEvent.alarmInput;
    beforeEvent.alarmOutput = alarmOutputChange ? alarmOutput : beforeEvent.alarmOutput;
    beforeEvent.audioOutput = audioOutputChange ? audioOutput : beforeEvent.audioOutput;
    beforeEvent.systemEvent = systemEventChange ? convertSystemEvent : beforeEvent.systemEvent;

    postMessage({
      type: 'deviceEvent',
      postData: {
        alarmInput: alarmInputChange ? alarmInput : null,
        alarmOutput: alarmOutputChange ? alarmOutput : null,
        audioOutput: audioOutputChange ? audioOutput : null,
        systemEvent: systemEventChange ? convertSystemEvent : null,
      },
    });
  };

  eventUpdateWorker.convertSystemEvent = systemEvent => ({
    AMDLoadFail: systemEvent.AMDLoadFail,
    adminLogin: systemEvent.AdminLogin,
    alarmReset: systemEvent.AlarmReset,
    backup: systemEvent.Backup,
    batteryFail: systemEvent.BatteryFail,
    beingUpdate: systemEvent.BeingUpdate,
    // configChange: systemEvent.ConfigChange, 현재는 의미 없음
    configRestore: systemEvent.ConfigRestore,
    dspDisplayStart: systemEvent.DSPDisplayStart,
    dspVASystemStart: systemEvent.DSPVASystemStart,
    endofFrame: systemEvent.EndofFrame,
    fwUpdate: systemEvent.FWUpdate,
    factoryReset: systemEvent.FactoryReset,
    hddFail: systemEvent.HDDFail,
    hddFull: systemEvent.HDDFull,
    hddNone: systemEvent.HDDNone,
    internalHDDConnect: systemEvent.InternalHDDConnect,
    internalHDDErase: systemEvent.InternalHDDErase,
    leftFanError: systemEvent.LeftFanError,
    netCamTrafficOverFlow: systemEvent.NetCamTrafficOverFlow,
    network: systemEvent.Network,
    newFWAvailable: systemEvent.NewFWAvailable,
    overwriteDecoding: systemEvent.OverwriteDecoding,
    passwordChange: systemEvent.PasswordChange,
    powerOn: systemEvent.PowerOn,
    powerReboot: systemEvent.PowerReboot,
    hddRaidDeviceAdd: systemEvent.RAIDDeviceAdd,
    hddRaidEvents: eventUpdateWorker.convertSystemEventRAIDEvents(systemEvent.RAIDEvents),
    hddRaidRecordRestriction: systemEvent.RAIDRecordRestriction,
    recordFiltering: systemEvent.RecordFiltering,
    recordFrameDrop: systemEvent.RecordFrameDrop,
    recording: systemEvent.Recording,
    recordingError: systemEvent.RecordingError,
    rightFanError: systemEvent.RightFanError,
    timeChange: systemEvent.TimeChange,
    usbHDDConnect: systemEvent.USBHDDConnect,
    iSCSIDisconnect: systemEvent.iSCSIDisconnect,
  });

  eventUpdateWorker.convertSystemEventRAIDEvents = raidEvents => (
    raidEvents && raidEvents.map(raidEvent => ({
      hddRaid: raidEvent.RAID,
      hddRaidBuildCancel: raidEvent.RAIDBuildCancel,
      hddRaidBuildFail: raidEvent.RAIDBuildFail,
      hddRaidBuilding: raidEvent.RAIDBuilding,
      hddRaidDegrade: raidEvent.RAIDDegrade,
      hddRaidEnable: raidEvent.RAIDEnable,
      hddRaidFail: raidEvent.RAIDFail,
      hddRaidRebuildEnd: raidEvent.RAIDRebuildEnd,
      hddRaidRebuildFail: raidEvent.RAIDRebuildFail,
      hddRaidRebuildStart: raidEvent.RAIDRebuildStart,
      hddRaidSetup: raidEvent.RAIDSetup,
    }))
  );

  eventUpdateWorker.checkPosEvent = checkPosEvent => {
    const { responseText } = checkPosEvent;
    const removeTrim = responseText.replace(/\n/gi, '').replace(/\t/gi, '').replace(/\r/gi, ''); // 2개 같이 선언시 안먹는다.
    const makeJSONDataList = removeTrim.match(/\{(.*?)\}/g);

    if (makeJSONDataList) {
      const posEventChange = beforPosEventLength !== makeJSONDataList.length;
      beforPosEventLength = posEventChange ? makeJSONDataList.length : beforPosEventLength;

      if (posEventChange) {
        const convertChangePosEvent = JSON.parse(makeJSONDataList[makeJSONDataList.length - 1]);

        postMessage({
          type: 'posEvent',
          postData: {
            posEvent: {
              deviceID: convertChangePosEvent.DeviceID,
              receipt: convertChangePosEvent.Receipt,
              receivedDate: convertChangePosEvent.ReceivedDate,
            },
          },
        });
      }
    }
  };
};

export default eventUpdateWorker;

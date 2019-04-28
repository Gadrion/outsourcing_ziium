import xmlParser from './XMLParser';
import sunapiClient from './SunapiClient';

class Attributes {
  constructor() {
    this.TIMEOUT = 500;
    this.RETRY_COUNT = 100;
    this.loginInfo = {};
    this.readyStatusCallbacks = [];
    this.index = 0;
    this.mAttributes = {
      Ready: false,
      GetFail: false,
      CgiSectionReady: false,
      AttributeSectionReady: false,
      DeviceInfoReady: false,
      EventSourceOptionsReady: false,
      CurrentLanguage: 'English',
      DefaultAlarmIndex: 0,
      DefaultPresetNumber: 0,
      DefaultPresetSpeed: 64,
      DefaultDwellTime: 3,
      MaxIPV4Len: 15,
      MaxIPV6Len: 45,
      MaxSequences: 5,
      MaxHours: 24,
      MaxMinutes: 60,
      EnableOptions: [true, false],
      EnableDropdownOptions: [
        {
          text: 'lang_on',
          value: true,
        },
        {
          text: 'lang_off',
          value: false,
        },
      ],
      UseOptions: ['On', 'Off'],
      PTLimitModes: ['PanLimit', 'TiltLimit'],
      BwOptions: ['Mbps', 'Kbps'],
      VideoAnalyticTypes: ['Passing', 'EnterExit', 'AppearDisapper'],
      AlarmoutModes: ['Pulse', 'ActiveInactive'],
      AutoManualOptions: ['Auto', 'Manual'],
      WeekDays: ['lang_sun', 'lang_mon', 'lang_tue', 'lang_wed', 'lang_thu', 'lang_fri', 'lang_sat'],
      PTZModeOptions: ['ExternalPTZ', 'DigitalPTZ'],
      sliderEnableColor: 'orange',
      sliderDisableColor: 'grey',
      MAX_RESOL_ONE_MEGA: 1,
      MAX_RESOL_TWO_MEGA: 2,
      MAX_RESOL_THREE_MEGA: 3,
      MAX_RESOL_8_MEGA: 4,
      MAX_RESOL_12_MEGA: 5,
      FriendlyNameCharSet: new RegExp(/^[a-zA-Z0-9-\s~!@$_-|{},./?\]]*$/),
      FriendlyNameCharSetExpanded: new RegExp(/^[a-zA-Z0-9-\s~`!@()$^_-|{};,./?\]]*$/),
      AlphaNumeric: new RegExp(/^[a-zA-Z0-9]*$/),
      AlphaNumericWithHiphen: new RegExp(/^[a-zA-Z0-9-]*$/),
      AlphaNumericWithHiphenSpace: new RegExp(/^[a-zA-Z0-9-\s]*$/),
      AlphaNumericWithSpace: new RegExp(/[^\s:\\,a-zA-Z0-9]/),
      IPv4: new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/),
      IPv6: new RegExp(/([A-Fa-f0-9]{1,4}::?){1,7}[A-Fa-f0-9]{1,4}/),
      UpperAlpha: new RegExp(/[A-Z]/),
      LowerAlpha: new RegExp(/[a-z]/),
      OnlyNumber: new RegExp(/\d+/),
      AlphaNumericWithFirstAlpha: new RegExp(/^[a-zA-Z][a-zA-Z0-9]*$/),
      SpecialSymbol: new RegExp(/[`~!@#$%^&*()_|+\-=?;:'",.<>\\/]/),
      ConstantSymbol1: new RegExp(/(\w)\1\1/),
      ConstantSymbol2: new RegExp(/(\d)\1\1/),
      CannotNumberDashFirst: new RegExp(/^[0-9-]{1}$/),
      OSDCharSet: '^[a-zA-Z0-9-.]*$',
      OnlyNumStr: '^[0-9]*$',
      AlphaNumericStr: '^[a-zA-Z0-9]*$',
      AlphaNumericDashDotStr: '^[a-zA-Z0-9-_.]*$',
      AlphaNumericDashStr: '^[a-zA-Z0-9-]*$',
      IPv4PatternStr: '^[0-9.]*$',
      IPv6PatternStr: '^[a-fA-F0-9:]*$',
      ServerNameCharSet: '^[a-zA-Z0-9\\-./_]*?$',
      HostNameCharSet: '^[a-zA-Z0-9~`!@$^()_\\-|{}\\[\\];,./?]*?$',
      SSL802XIDPWSet: '^[a-zA-Z0-9`~!@#$%^*()_|+\\-=?.{}\\[\\]/:;&"<>,]*$',
      FriendlyNameCharSetStr: '^[a-zA-Z0-9- ~!@$_\\-|{},./?\\[\\]]*$',
      FriendlyNameCharSetNoSpaceStr: '^[a-zA-Z0-9-~!@$_\\-|{},./?\\[\\]]*$',
      FriendlyNameCharSetExpandedStr: '^[a-zA-Z0-9~`!@$()^ _\\-|\\[\\]{};,./?]*$',
      FriendlyNameCharSetExpandedStr2: '^[a-zA-Z0-9~*#!%&@$()^_\\-|\\[\\]{};,./?]*$',
      FriendlyNameCharSetNoNewLineStr: "^[a-zA-Z0-9~`!@%&*#<>+=:'$()^ _\\-|\\[\\]{};,./?\"]*$",
      FriendlyNameCharSetSupportedStr: "^[\\r\\na-zA-Z0-9~`!@%&*#<>+=:'$()^ _\\-|\\[\\]{};,./?\"]*$",
      URLSet: '^[a-zA-Z0-9\\-.:\\[\\]{}/]*$',
      PasswordCharSet: '^[a-zA-Z0-9~*`!@#$%()^_\\-\\+=|{}\\[\\].?/]*$',
    };
  }

  getCgiSection = () => {
    this.mAttributes.systemCgiAttrReady = false;
    this.mAttributes.mediaCgiAttrReady = false;
    this.mAttributes.networkCgiAttrReady = false;
    this.mAttributes.transferCgiAttrReady = false;
    this.mAttributes.secuirityCgiAttrReady = false;
    this.mAttributes.eventstatusCgiAttrReady = false;
    this.mAttributes.ioCgiAttrReady = false;
    this.mAttributes.eventsourceCgiAttrReady = false;
    this.mAttributes.recordingCgiAttrReady = false;
    this.mAttributes.eventrulesCgiAttrReady = false;
    this.mAttributes.eventactionsCgiAttrReady = false;
    this.mAttributes.imageCgiAttrReady = false;
    this.mAttributes.ptzCgiAttrReady = false;
    this.mAttributes.openSDKCgiAttrReady = false;

    const getData = {};

    return sunapiClient.get('/stw-cgi/attributes.cgi/cgis', getData)
      .then(response => {
        this.mAttributes.cgiSection = response.data;
        this.mAttributes.CgiSectionReady = true;
        console.log('Cgi Section Ready');

        this.parseSystemCgiAttributes();
        this.parseMediaCgiAttributes();
        this.parseNetworkCgiAttributes();
        this.parseTransferCgiAttributes();
        this.parseSecurityCgiAttributes();
        this.parseEventStatusCgiAttributes();
        this.parseIOCgiAttributes();
        this.parseEventSourceCgiAttributes();
        this.parseRecordingCgiAttributes();
        this.parseEventRulesCgiAttributes();
        this.parseEventActionsCgiAttributes();
        this.parseImageCgiAttributes();
        this.parsePTZCgiAttributes();
        this.parseOpenSDKCgiAttributes();
      })
      .catch(error => {
        console.log('Cgi Section error', error);
      });
  }

  getDeviceInfo = () => {
    const getData = {};

    return sunapiClient.get('/stw-cgi/system.cgi?msubmenu=deviceinfo&action=view', getData)
      .then(response => {
        this.mAttributes.ModelName = response.data.Model;
        // Temp
        this.mAttributes.CameraType = response.data.Model === 'PNM-9030V' ? 'Panorama' : 'Basic';
        this.mAttributes.DeviceType = response.data.DeviceType;
        this.mAttributes.FirmwareVersion = response.data.FirmwareVersion;
        this.mAttributes.CurrentLanguage = response.data.Language;
        if (typeof response.data.ISPVersion !== 'undefined') {
          this.mAttributes.ISPVersion = response.data.ISPVersion;
        }

        if (typeof response.data.PTZISPVersion !== 'undefined') {
          this.mAttributes.PTZISPVersion = response.data.PTZISPVersion;
        }

        if (typeof response.data.CGIVersion !== 'undefined') {
          this.mAttributes.CGIVersion = response.data.CGIVersion;
        }

        if (typeof response.data.TrackingVersion !== 'undefined') {
          this.mAttributes.TrackingVersion = response.data.TrackingVersion;
        }

        if (typeof response.data.BuildDate !== 'undefined') {
          this.mAttributes.BuildDate = response.data.BuildDate;
        }

        if (typeof response.data.ONVIFVersion !== 'undefined') {
          this.mAttributes.ONVIFVersion = response.data.ONVIFVersion;
        }

        if (typeof response.data.OpenSDKVersion !== 'undefined') {
          this.mAttributes.OpenSDKVersion = response.data.OpenSDKVersion;
        }

        console.log('Device Info Ready');

        this.mAttributes.LiteModel = false;
        this.mAttributes.X_LiteModel = false;
        try {
          this.mAttributes.LiteModel = /^(L)/.test(this.mAttributes.ModelName);
          this.mAttributes.X_LiteModel = /^(X)..-[L]/g.test(this.mAttributes.ModelName);
        } catch (e) {
          console.error(e);
        }

        this.mAttributes.DeviceInfoReady = true;
      })
      .catch(error => {
        this.mAttributes.GetFail = true;
        console.log('Device Info : ', error);
      });
  }

  getEventSourceOptions = () => {
    const getData = {};
    return sunapiClient.get('/stw-cgi/eventsources.cgi?msubmenu=sourceoptions&action=view', getData)
      .then(response => {
        this.mAttributes.EventSourceOptions = response.data.EventSources;

        console.log('EventSourceOptions Ready');
        this.mAttributes.EventSourceOptionsReady = true;
      })
      .catch(error => {
        if (this.mAttributes.DeviceType === 'NWC') {
          if (error !== 'Not Authorized') {
            this.mAttributes.GetFail = true;
            console.log('EventSourceOptions : ', error);
          }
        } else {
          this.mAttributes.EventSourceOptionsReady = true;
        }
      });
  };

  getAttributeSection = () => {
    const getData = {};
    return sunapiClient.get('/stw-cgi/attributes.cgi/attributes', getData)
      .then(response => {
        this.mAttributes.MicomSupport = xmlParser.parseAttributeSection(response.data, 'System/Property/MicomVersion');
        this.mAttributes.LogServerSupport = xmlParser.parseAttributeSection(response.data, 'System/Support/LogServer');
        this.mAttributes.ModelType = xmlParser.parseAttributeSection(response.data, 'System/Property/ModelType');
        this.mAttributes.IsAdminUse = xmlParser.parseAttributeSection(response.data, 'System/Support/FWUpdate');
        this.mAttributes.FWUpdateSupport = xmlParser.parseAttributeSection(response.data, 'System/Support/FWUpdate');
        this.mAttributes.MaxChannel = xmlParser.parseAttributeSection(response.data, 'System/Limit/MaxChannel');
        this.mAttributes.MaxHDMIOut = xmlParser.parseAttributeSection(response.data, 'System/Limit/MaxHDMIOut');
        const TDSupportCh = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/TamperingDetection', this.mAttributes.MaxChannel,
        );
        this.mAttributes.TamperingDetectionSupportByChannel = TDSupportCh;
        const TDSupport = this.mAttributes.TamperingDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.TamperingDetectionSupport = TDSupport;
        this.mAttributes.FaceDetectionSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/FaceDetection', this.mAttributes.MaxChannel,
        );
        this.mAttributes.FaceDetectionSupport = this.mAttributes.FaceDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.DynamicAreaOptionsByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/DynamicArea', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AudioDetection = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/AudioDetection',
        );
        this.mAttributes.AudioAnalysis = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/AudioAnalysis',
        );
        this.mAttributes.NetworkDisconnect = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/NetworkDisconnect',
        );
        this.mAttributes.VideoLoss = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VideoLoss',
        );
        this.mAttributes.OpenSDKSupport = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/OpenSDK',
        );
        this.mAttributes.ShockDetectionSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/ShockDetection', this.mAttributes.MaxChannel,
        );
        const SDSupport = this.mAttributes.ShockDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.ShockDetectionSupport = SDSupport;
        const TCDSupportCh = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/TemperatureChangeDetection', this.mAttributes.MaxChannel,
        );
        this.mAttributes.TemperatureChangeDetectionSupportByChannel = TCDSupportCh;
        const TCDSupport = this.mAttributes.TemperatureChangeDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.TemperatureChangeDetectionSupport = TCDSupport;
        this.mAttributes.OpenSDKMaxApps = xmlParser.parseAttributeSection(
          response.data, 'System/Limit/OpenSDK.MaxApps',
        );
        const DDSupport = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/DefocusDetection', this.mAttributes.MaxChannel,
        );
        this.mAttributes.DefocusDetectionSupportByChannel = DDSupport;
        const DDSupportCh = this.mAttributes.DefocusDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.DefocusDetectionSupport = DDSupportCh;
        this.mAttributes.FogDetectionSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/FogDetection', this.mAttributes.MaxChannel,
        );
        this.mAttributes.FogDetectionSupport = this.mAttributes.FogDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.MaxROI = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxROI',
        );
        this.mAttributes.MaxROICoordinateX = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/ROICoordinate.MaxX',
        );
        this.mAttributes.MaxROICoordinateY = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/ROICoordinate.MaxY',
        );
        this.mAttributes.MaxROICoordinateXByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/ROICoordinate.MaxX', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxROICoordinateYByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/ROICoordinate.MaxY', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxROIInclude = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/MaxROI.Include', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxROIExclude = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/MaxROI.Include', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxTemperatureChangeDetectionArea = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxTemperatureChangeDetectionArea',
        );
        this.mAttributes.MaxIVRule = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxIVRule',
        );
        this.mAttributes.IVRuleSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/IVRule', this.mAttributes.MaxChannel,
        );
        this.mAttributes.IVRuleSupport = this.mAttributes.IVRuleSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.MaxIVRuleLine = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/MaxIVRule.Line', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxIVRuleArea = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Limit/MaxIVRule.Area.Include', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxFaceDetectionArea = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxFaceDetectionArea',
        );
        this.mAttributes.VAPassing = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.Passing',
        );
        this.mAttributes.VAEnter = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.Enter',
        );
        this.mAttributes.VAExit = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.Exit',
        );
        this.mAttributes.VAAppear = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.Appear',
        );
        this.mAttributes.VADisappear = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.Disappear',
        );
        this.mAttributes.MotionDetectionSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/VA.MotionDetection', this.mAttributes.MaxChannel,
        );
        const MDSupportCh = this.mAttributes.MotionDetectionSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.MotionDetectionSupport = MDSupportCh;
        if ((this.mAttributes.VAPassing === true) || (this.mAttributes.VAEnter === true)
          || (this.mAttributes.VAExit === true) || (this.mAttributes.VAAppear === true)
          || (this.mAttributes.VADisappear === true)) {
          this.mAttributes.VideoAnalyticsSupport = true;
        } else {
          this.mAttributes.VideoAnalyticsSupport = false;
        }
        this.mAttributes.MotionDetectionOverlay = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/VA.MotionDetection.Overlay',
        );
        this.mAttributes.AdjustMDIVRuleOnFlipMirror = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/AdjustMDIVRuleOnFlipMirror',
        );
        const onFlipMirror = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/AdjustMDIVRuleOnFlipMirror',
        );
        this.mAttributes.AdjustMDIVRuleOnFlipMirrorByChannel = onFlipMirror;
        this.mAttributes.ROIType = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/ROIType',
        );
        this.mAttributes.MaxAlarmInput = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxAlarmInput',
        );
        this.mAttributes.MaxAlarmInputOriginal = this.mAttributes.MaxAlarmInput;
        this.mAttributes.MaxTrackingArea = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Limit/MaxTrackingArea',
        );

        this.mAttributes.MaxAlarmOutput = xmlParser.parseAttributeSection(
          response.data, 'IO/Limit/MaxAlarmOutput',
        );
        this.mAttributes.RS485Support = xmlParser.parseAttributeSection(
          response.data, 'IO/Support/RS485',
        );
        this.mAttributes.RS422Support = xmlParser.parseAttributeSection(
          response.data, 'IO/Support/RS422',
        );

        this.mAttributes.MaxUser = xmlParser.parseAttributeSection(
          response.data, 'Security/Limit/MaxUser',
        );

        this.mAttributes.SupportAudioInputByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Limit/MaxAudioInput', this.mAttributes.MaxChannel,
        );
        this.mAttributes.SupportAudioInput = this.mAttributes.SupportAudioInputByChannel.some(
          this.getIsSupport,
        );

        const audioInput = this.mAttributes.SupportAudioInputByChannel.filter(value => value === 1);
        this.mAttributes.MaxAudioInput = audioInput.length;

        this.mAttributes.SupportAudioOutputByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Support/DeviceAudioOutput', this.mAttributes.MaxChannel,
        );
        this.mAttributes.SupportAudioOutput = this.mAttributes.SupportAudioOutputByChannel.some(
          this.getIsSupport,
        );

        const audioOutput = this.mAttributes.SupportAudioOutputByChannel.filter(value => value);
        this.mAttributes.MaxAudioOutput = audioOutput.length;

        this.mAttributes.MaxProfile = xmlParser.parseAttributeSection(
          response.data, 'Media/Limit/MaxProfile',
        );
        this.mAttributes.MaxProfileByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Limit/MaxProfile', this.mAttributes.MaxChannel,
        );
        this.mAttributes.CropSupport = xmlParser.parseAttributeSection(
          response.data, 'Media/Support/Crop',
        );
        this.mAttributes.CropSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Support/Crop', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxResolution = xmlParser.parseAttributeSection(
          response.data, 'Media/Limit/MaxResolution',
        );
        if (typeof this.mAttributes.MaxResolution !== 'undefined') {
          [this.mAttributes.MaxResolution] = this.mAttributes.MaxResolution;
        }
        this.mAttributes.MaxResolutionByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Limit/MaxResolution', this.mAttributes.MaxChannel,
        );

        // 2018.07.09. DSKIM: 와이즈스트림 설정 채널 분기
        this.mAttributes.WiseStreamSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Support/WiseStream', this.mAttributes.MaxChannel,
        );
        if (typeof this.mAttributes.WiseStreamSupportByChannel !== 'undefined'
          && this.mAttributes.WiseStreamSupportByChannel.constructor === Array) {
          this.mAttributes.WiseStreamSupport = this.mAttributes.WiseStreamSupportByChannel.some(
            this.getIsSupport,
          );
        }
        this.mAttributes.DynamicGOVSupport = xmlParser.parseAttributeSection(
          response.data, 'Media/Support/DynamicGOV',
        );
        this.mAttributes.DynamicFPSSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Media/Support/DynamicFPS', this.mAttributes.MaxChannel,
        );
        this.mAttributes.FixedProfileCodecChange = xmlParser.parseAttributeSection(
          response.data, 'Media/Support/FixedProfileCodecChange',
        );

        this.mAttributes.MaxIPv4Filter = xmlParser.parseAttributeSection(
          response.data, 'Network/Limit/MaxIPv4Filter',
        );
        this.mAttributes.MaxIPv6Filter = xmlParser.parseAttributeSection(
          response.data, 'Network/Limit/MaxIPv6Filter',
        );
        this.mAttributes.MaxIPv4QoS = xmlParser.parseAttributeSection(
          response.data, 'Network/Limit/MaxIPv4QoS',
        );
        this.mAttributes.MaxIPv6QoS = xmlParser.parseAttributeSection(
          response.data, 'Network/Limit/MaxIPv6QoS',
        );
        this.mAttributes.CamSpecialModel = false; // Need for S1 model kept for future reference.

        this.mAttributes.SMTPSupport = xmlParser.parseAttributeSection(
          response.data, 'Transfer/Support/SMTP',
        );
        this.mAttributes.FTPSupport = xmlParser.parseAttributeSection(
          response.data, 'Transfer/Support/FTP',
        );

        this.mAttributes.PrivacyMasGlobalColor = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/Privacy.MaskColor.Global',
        );
        this.mAttributes.SimpleFocus = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/SimpleFocus',
        );
        this.mAttributes.SimpleFocusByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/SimpleFocus', this.mAttributes.MaxChannel,
        );
        this.mAttributes.IRLedSupport = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/IRLED',
        );
        this.mAttributes.FisheyeLens = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/FisheyeLens',
        );
        this.mAttributes.MultiImager = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/MultiImager',
        );
        this.mAttributes.NormalizedOSDRange = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/NormalizedOSDRange',
        );
        this.mAttributes.PIris = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/P-Iris',
        );
        this.mAttributes.ZoomAdjust = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/ZoomAdjust',
        );
        this.mAttributes.DIS = xmlParser.parseAttributeSection(
          response.data, 'Image/Support/DIS',
        );
        this.mAttributes.IrisSupport = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/Iris', this.mAttributes.MaxChannel,
        );
        this.mAttributes.IrisFnoSupport = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/Iris-Fno', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AutoFocusSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/AutoFocus', this.mAttributes.MaxChannel,
        );

        this.mAttributes.MaxSmartCodecArea = xmlParser.parseAttributeSection(
          response.data, 'Image/Limit/MaxSmartCodecArea',
        );
        const MSCAreaCh = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Limit/MaxSmartCodecArea', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxSmartCodecAreaByChannel = MSCAreaCh;
        // this.mAttributes.MaxPrivacyMask = xmlParser.parseAttributeSection(
        //   response.data, 'Image/Limit/MaxPrivacyMask',
        // );
        this.mAttributes.MaxPrivacyMaskByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Limit/MaxPrivacyMask', this.mAttributes.MaxChannel,
        );
        this.mAttributes.PrivacyMaskRectangle = xmlParser.parseAttributeSection(
          response.data, 'Image/Limit/MaxPrivacyMask.Rectangle',
        );
        this.mAttributes.PrivacyMaskRectangleByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Limit/MaxPrivacyMask.Rectangle', this.mAttributes.MaxChannel,
        );
        this.mAttributes.PrivacyMaskPolygon = xmlParser.parseAttributeSection(
          response.data, 'Image/Limit/MaxPrivacyMask.Polygon',
        );
        this.mAttributes.PrivacyMaskPolygonByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Limit/MaxPrivacyMask.Polygon', this.mAttributes.MaxChannel,
        );

        this.mAttributes.MaxOSDTitles = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Limit/MaxOSDTitles', this.mAttributes.MaxChannel,
        );

        this.mAttributes.AbsolutePan = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Absolute.Pan',
        );
        this.mAttributes.AbsoluteTilt = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Absolute.Tilt',
        );
        this.mAttributes.AbsoluteZoom = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Absolute.Zoom',
        );
        this.mAttributes.RealPTZByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/RealPTZ', this.mAttributes.MaxChannel,
        );
        this.mAttributes.RealPTZ = this.mAttributes.RealPTZByChannel.some(support => support);
        this.mAttributes.ExternalPTZ = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/ExternalPTZ',
        );
        this.mAttributes.ZoomOnly = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/ZoomOnly',
        );
        this.mAttributes.PanTiltOnly = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/PanTiltOnly',
        );
        this.mAttributes.HomeSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Home',
        );

        this.mAttributes.MaxPreset = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Limit/MaxPreset',
        );

        this.mAttributes.RecordStreamLimitation = xmlParser.parseAttributeSection(
          response.data, 'Recording/Support/RecordStreamLimitation',
        );
        this.mAttributes.RecordingByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Recording/Support/Backup', this.mAttributes.MaxChannel,
        );
        this.mAttributes.Recording = this.mAttributes.RecordingByChannel.some(support => support);
        this.mAttributes.PlaybackSpeed = xmlParser.parseAttributeSection(
          response.data, 'Recording/Support/PlaybackSpeed',
        );
        this.mAttributes.QueueManagement = xmlParser.parseAttributeSection(
          response.data, 'Recording/Support/QueueManagement',
        );
        this.mAttributes.NAS = xmlParser.parseAttributeSection(
          response.data, 'Recording/Support/NAS',
        );
        this.mAttributes.isDigitalPTZ = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/DigitalPTZ',
        );
        this.mAttributes.DigitalAutoTracking = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/DigitalAutoTracking',
        );
        this.mAttributes.DigitalAutoTrackingByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/DigitalAutoTracking', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxGroupCount = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Limit/MaxGroupCount',
        );
        this.mAttributes.MaxPresetsPerGroup = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Limit/MaxPresetCountPerGroup',
        );

        this.mAttributes.AuxCommands = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/AuxCommands',
        );

        // Attribute by Channel
        this.mAttributes.MaxPresetByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Limit/MaxPreset', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxGroupCountByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Limit/MaxGroupCount', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxPresetsPerGroupByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Limit/MaxPresetCountPerGroup', this.mAttributes.MaxChannel,
        );

        this.mAttributes.FisheyeLensByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/FisheyeLens', this.mAttributes.MaxChannel,
        );
        this.mAttributes.isDigitalPTZByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/DigitalPTZ', this.mAttributes.MaxChannel,
        );

        this.mAttributes.AbsolutePanByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Absolute.Pan', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AbsoluteTiltByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Absolute.Tilt', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AbsoluteZoomByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Absolute.Zoom', this.mAttributes.MaxChannel,
        );
        this.mAttributes.HomeSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Home', this.mAttributes.MaxChannel,
        );

        this.mAttributes.PTZSupportByChannel = [];
        for (let i = 0; i < this.mAttributes.MaxChannel; i += 1) {
          this.mAttributes.PTZSupportByChannel[i] = {};
          if (this.mAttributes.AbsolutePanByChannel[i] === true
            && this.mAttributes.AbsoluteTiltByChannel[i] === true
            && this.mAttributes.AbsoluteZoomByChannel[i] === true
            && this.mAttributes.FisheyeLensByChannel[i] === false
            && this.mAttributes.isDigitalPTZByChannel[i] === false) {
            this.mAttributes.PTZSupportByChannel[i].PTZModel = true;
            this.mAttributes.AbsolutePan = this.mAttributes.AbsolutePanByChannel[i];
            this.mAttributes.AbsoluteTilt = this.mAttributes.AbsoluteTiltByChannel[i];
            this.mAttributes.AbsoluteZoom = this.mAttributes.AbsoluteZoomByChannel[i];
          } else {
            this.mAttributes.PTZSupportByChannel[i].PTZModel = false;
          }

          if (this.mAttributes.isDigitalPTZByChannel[i]) {
            this.mAttributes.isDigitalPTZ = true;
          }
        }

        this.mAttributes.PTZModel = this.mAttributes.RealPTZ || false;
        this.mAttributes.ZoomOnlyModel = this.mAttributes.ZoomOnly || false;
        this.mAttributes.ExternalPTZModel = (this.mAttributes.ExternalPTZ
          && (!this.mAttributes.isDigitalPTZ || this.mAttributes.MaxGroupCount === 0)) || false;
        this.mAttributes.PanTiltOnlyModel = this.mAttributes.PanTiltOnly || false;

        // if (this.mAttributes.PTZModel
        //   || this.mAttributes.FisheyeLens
        //   || this.mAttributes.ExternalPTZModel
        //   || this.mAttributes.ZoomOnlyModel
        //   || this.mAttributes.PanTiltOnlyModel
        //   || this.mAttributes.isDigitalPTZ) {
        this.mAttributes.PresetTypes = ['Global', 'Preset'];
        this.mAttributes.ContinousZoomByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Continuous.Zoom', this.mAttributes.MaxChannel,
        );
        this.mAttributes.ContinousFocusByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Continuous.Focus', this.mAttributes.MaxChannel,
        );
        this.mAttributes.PresetSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Preset', this.mAttributes.MaxChannel,
        );
        this.mAttributes.SwingSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Swing', this.mAttributes.MaxChannel,
        );
        this.mAttributes.GroupSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Group', this.mAttributes.MaxChannel,
        );
        this.mAttributes.TourSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Tour', this.mAttributes.MaxChannel,
        );
        this.mAttributes.TraceSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/Trace', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AutorunSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/AutoRun', this.mAttributes.MaxChannel,
        );
        this.mAttributes.DigitalZoomSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/DigitalZoom', this.mAttributes.MaxChannel,
        );
        this.mAttributes.TrackingSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Eventsource/Support/Tracking', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AreaZoomSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Support/AreaZoom', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxTourCountByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Limit/MaxTourCount', this.mAttributes.MaxChannel,
        );
        this.mAttributes.MaxTraceCountByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'PTZSupport/Limit/MaxTraceCount', this.mAttributes.MaxChannel,
        );

        this.mAttributes.ContinousZoom = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Continuous.Zoom',
        );
        this.mAttributes.ContinousFocus = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Continuous.Focus',
        );
        this.mAttributes.PresetSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Preset',
        );
        this.mAttributes.SwingSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Swing',
        );
        this.mAttributes.GroupSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Group',
        );
        this.mAttributes.TourSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Tour',
        );
        this.mAttributes.TraceSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/Trace',
        );
        this.mAttributes.AutorunSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/AutoRun',
        );
        this.mAttributes.DigitalZoomSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/DigitalZoom',
        );
        this.mAttributes.TrackingSupport = xmlParser.parseAttributeSection(
          response.data, 'Eventsource/Support/Tracking',
        );
        this.mAttributes.AreaZoomSupport = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Support/AreaZoom',
        );
        this.mAttributes.MaxTourCount = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Limit/MaxTourCount',
        );
        this.mAttributes.MaxTraceCount = xmlParser.parseAttributeSection(
          response.data, 'PTZSupport/Limit/MaxTraceCount',
        );

        this.setPresetOption();
        // } else {
        //   this.mAttributes.PresetTypes = ['Global'];
        // }

        this.mAttributes.dayNightSupportByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/DayNight', this.mAttributes.MaxChannel,
        );
        this.mAttributes.dayNightSupport = this.mAttributes.dayNightSupportByChannel.some(
          this.getIsSupport,
        );
        this.mAttributes.thermalModelByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/ThermalFeatures', this.mAttributes.MaxChannel,
        );
        this.mAttributes.thermalModel = this.mAttributes.thermalModelByChannel.some(
          this.getIsSupport,
        );

        // 2018.04.12. DSKIM: Calibration 지원 여부
        this.mAttributes.HandoverCalibration = xmlParser.parseAttributeSection(
          response.data, 'Eventrules/Support/HandoverCalibration',
        );
        if (this.mAttributes.HandoverCalibration === true) {
          const parsedData = xmlParser.parseAttributeSectionByChannel(
            response.data, 'Eventrules/Limit/MaxHandoverCalibrationPointCount', this.mAttributes.MaxChannel,
          );
          this.mAttributes.MaxHandoverCalibrationPointCountByChannel = parsedData;
        }

        // 2018.06.12. DSKIM: Auto Image Alignment 지원 여부
        const parsedData = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/AutoImageAlignmentSupport', this.mAttributes.MaxChannel,
        );
        this.mAttributes.AutoImageAlignmentSupportByChannel = parsedData;
        if (typeof this.mAttributes.AutoImageAlignmentSupportByChannel !== 'undefined'
          && this.mAttributes.AutoImageAlignmentSupportByChannel.constructor === Array) {
          const AIASupportCh = this.mAttributes.AutoImageAlignmentSupportByChannel;
          this.mAttributes.SupportAutoImageAlignment = AIASupportCh.some(this.getIsSupport);
        }

        // 2018.07.18. DSKIM: Camera Setup 지원 채널
        this.mAttributes.ImageSettingsByChannel = xmlParser.parseAttributeSectionByChannel(
          response.data, 'Image/Support/ImageSettings', this.mAttributes.MaxChannel,
        );
        if (typeof this.mAttributes.ImageSettingsByChannel !== 'undefined'
          && this.mAttributes.ImageSettingsByChannel.constructor === Array) {
          const imageSettingCh = this.mAttributes.ImageSettingsByChannel.some(this.getIsSupport);
          this.mAttributes.SupportCameraSetup = imageSettingCh;
        } else {
          this.mAttributes.SupportCameraSetup = (typeof this.mAttributes.imageEQ === 'undefined');
        }

        console.log('Attributes Section Ready');
        this.mAttributes.AttributeSectionReady = true;
      })
      .catch(error => {
        this.mAttributes.GetFail = true;
        console.log('Attributes Section : ', error);
      });
  }

  setPresetOption = () => {
    this.mAttributes.PresetOptions = ['Off'];
    for (let preset = 1; preset <= this.mAttributes.MaxPreset; preset += 1) {
      this.mAttributes.PresetOptions.push(preset);
    }
  }

  cameraView = () => {
    const getData = {
      Channel: 0,
    };
    return sunapiClient.get('/stw-cgi/image.cgi?msubmenu=camera&action=view', getData)
      .then(response => {
        if (response.data.Camera[0].DayNightMode === 'ExternalBW') {
          this.mAttributes.MaxAlarmInput = 0;
          [this.mAttributes.cameraCommandResponse] = response.data.Camera;
        }
        console.log('Camera Info ready');
      })
      .catch(error => {
        console.log(error);
      });
  }

  parseSystemCgiAttributes = () => {
    if (!this.mAttributes.systemCgiAttrReady) {
      this.mAttributes.Languages = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/deviceinfo/Language/enum',
      );
      this.mAttributes.DeviceName = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/deviceinfo/DeviceName/string',
      );
      this.mAttributes.DeviceLoc = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/deviceinfo/DeviceLocation/string',
      );
      this.mAttributes.DeviceDesc = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/deviceinfo/DeviceDescription/string',
      );
      this.mAttributes.Memo = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/deviceinfo/Memo/string',
      );
      this.mAttributes.YearOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Year/int',
      );
      this.mAttributes.MonthOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Month/int',
      );
      this.mAttributes.DayOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Day/int',
      );
      this.mAttributes.HourOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Hour/int',
      );
      this.mAttributes.MinuteOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Minute/int',
      );
      this.mAttributes.SecondOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/date/Second/int',
      );
      this.mAttributes.ExcludeSettings = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/factoryreset/ExcludeSettings/csv',
      );
      this.mAttributes.FirmwareModule = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/firmwareupdate/FirmwareModule/enum',
      );
      this.mAttributes.RestoreExclusions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/configrestore/ExcludeSettings/csv',
      );
      this.mAttributes.StorageEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/Enable/bool',
      );
      this.mAttributes.FileSystemTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/Storage.#.FileSystem/enum',
      );
      this.mAttributes.DefaultFolderMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/DefaultFolder/string',
      );
      this.mAttributes.NASIPMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/NASIP/string',
      );
      this.mAttributes.NASUserIDMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/NASUserID/string',
      );
      this.mAttributes.NASPasswordMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/NASPassword/string',
      );
      this.mAttributes.DASEncryptSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/IsDASEncryptEnable/bool',
      );
      this.mAttributes.DASPasswordMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/storageinfo/DASPassword/string',
      );
      this.mAttributes.SystemLogTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/systemlog/Type/enum',
      );
      this.mAttributes.AccessLogTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/accesslog/Type/enum',
      );
      this.mAttributes.EventLogTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/eventlog/Type/enum',
      );
      this.mAttributes.BaudRateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/BaudRate/enum',
      );
      this.mAttributes.ParityBitOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/ParityBit/enum',
      );
      this.mAttributes.StopBitOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/StopBits/enum',
      );
      this.mAttributes.DataBitOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/DataBits/enum',
      );
      this.mAttributes.SerialInterfaceOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/SerialInterface/enum',
      );
      this.mAttributes.TerminationSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/serial/SignalTermination/bool',
      );
      this.mAttributes.OnvifFocusControlSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/onviffeature/FocusControl/bool',
      );
      this.mAttributes.UsbConfigEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'system/usbconfig/set/Enable/bool',
      );
      this.mAttributes.systemCgiAttrReady = true;
    }
  }

  parseMediaCgiAttributes = () => {
    if (!this.mAttributes.mediaCgiAttrReady) {
      this.mAttributes.EncodingTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/EncodingType/enum',
      );
      this.mAttributes.ProfileName = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/Name/string',
      );
      this.mAttributes.ATCModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ATCMode/enum',
      );
      this.mAttributes.ATCSensitivityOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ATCSensitivity/enum',
      );
      this.mAttributes.ATCLimit = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ATCLimit/enum',
      );
      this.mAttributes.ATCTrigger = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ATCTrigger/enum',
      );
      this.mAttributes.ATCEventType = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ATCEventType/enum',
      );
      this.mAttributes.FrameRateLimit = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/FrameRate/int',
      );
      this.mAttributes.CompressionLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/CompressionLevel/int',
      );
      this.mAttributes.Bitrate = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/Bitrate/int',
      );
      this.mAttributes.SVNPMulticastPort = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/SVNPMulticastPort/int',
      );
      this.mAttributes.SVNPMulticastTTL = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/SVNPMulticastTTL/int',
      );
      this.mAttributes.RTPMulticastPort = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/RTPMulticastPort/int',
      );
      this.mAttributes.RTPMulticastTTL = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/RTPMulticastTTL/int',
      );
      this.mAttributes.FixedFramerateProfile = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/IsFixedFrameRateProfile/bool',
      ) || false;
      this.mAttributes.SensorCaptureSize = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videosource/SensorCaptureSize/enum',
      );
      this.mAttributes.AudioInSourceOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/Source/enum',
      );
      this.mAttributes.AudioInEncodingOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/EncodingType/enum',
      );
      this.mAttributes.AudioInBitrateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/Bitrate/enum',
      );
      this.mAttributes.AudioInGainOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/Gain/int',
      );
      this.mAttributes.AudioInSensitivityOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/Sensitivity/int',
      );
      this.mAttributes.AudioInNoiseReduction = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/NoiseReduction/bool',
      );
      this.mAttributes.AudioInNoiseReductionSensitivityOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audioinput/NoiseReductionSensitivity/int',
      );
      this.mAttributes.AudioOutGainOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/audiooutput/Gain/int',
      );
      this.mAttributes.VideoTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videooutput/Type/enum',
      );
      this.mAttributes.SensorModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videosource/SensorCaptureFrameRate/enum',
      );
      this.mAttributes.VideoMode = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videosource/VideoMode/enum',
      );
      this.mAttributes.BitrateControlType = {};
      this.mAttributes.BitrateControlType.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.BitrateControlType/enum',
      );
      this.mAttributes.PriorityType = {};
      this.mAttributes.PriorityType.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.PriorityType/enum',
      );
      this.mAttributes.PriorityType.MJPEG = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/MJPEG.PriorityType/enum',
      );
      this.mAttributes.EnocoderProfile = {};
      this.mAttributes.EnocoderProfile.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.Profile/enum',
      );
      this.mAttributes.EntropyCoding = {};
      this.mAttributes.EntropyCoding.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.EntropyCoding/enum',
      );
      this.mAttributes.SmartCodecEnable = {};
      this.mAttributes.SmartCodecEnable.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.SmartCodecEnable/enum',
      );
      this.mAttributes.GOVLength = {};
      this.mAttributes.GOVLength.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.GOVLength/int',
      );
      this.mAttributes.WiseStreamOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/wisestream/Mode/enum',
      );
      this.mAttributes.DynamicGOV = {};
      this.mAttributes.DynamicGOV.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.DynamicGOVLength/int',
      );
      this.mAttributes.DynamicFPS = {};
      this.mAttributes.DynamicFPS.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.DynamicFPSEnable/bool',
      );
      this.mAttributes.DynamicFPS.H265 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H265.DynamicFPSEnable/bool',
      );
      this.mAttributes.MinDynamicFPS = {};
      this.mAttributes.MinDynamicFPS.H264 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H264.MinDynamicFPS/int',
      );
      this.mAttributes.MinDynamicFPS.H265 = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/H265.MinDynamicFPS/int',
      );
      this.mAttributes.Resolution = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/Resolution/enum',
      );

      if (typeof this.mAttributes.EncodingTypes !== 'undefined') {
        if (this.mAttributes.EncodingTypes.indexOf('H265') !== -1) {
          this.mAttributes.BitrateControlType.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.BitrateControlType/enum',
          );
          this.mAttributes.PriorityType.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.PriorityType/enum',
          );
          this.mAttributes.EnocoderProfile.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.Profile/enum',
          );
          this.mAttributes.EntropyCoding.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.EntropyCoding/enum',
          );
          this.mAttributes.SmartCodecEnable.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.SmartCodecEnable/enum',
          );
          this.mAttributes.GOVLength.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.GOVLength/int',
          );
          this.mAttributes.DynamicGOV.H265 = xmlParser.parseCgiSection(
            this.mAttributes.cgiSection, 'media/videoprofile/H265.DynamicGOVLength/int',
          );
        }
      }

      this.mAttributes.viewModeIndex = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ViewModeIndex/int',
      );
      this.mAttributes.profileViewModeType = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/ViewModeType/enum',
      );
      this.mAttributes.profileBasedDPTZ = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videoprofile/IsDigitalPTZProfile/bool',
      );
      if (this.mAttributes.isDigitalPTZ
        && typeof this.mAttributes.profileBasedDPTZ === 'undefined') {
        this.mAttributes.channelBasedDPTZ = true;
      }

      this.mAttributes.sensorCaptureFrameRate = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/videosource/SensorCaptureFrameRate/enum',
      );

      this.mAttributes.imageEQ = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'media/eqsettings/Channel/int',
      );
      if (typeof this.mAttributes.imageEQ !== 'undefined') {
        this.mAttributes.SupportDeviceType = 'Encoder';
      }
      this.mAttributes.mediaCgiAttrReady = true;
    }
  }

  parseNetworkCgiAttributes = () => {
    if (!this.mAttributes.networkCgiAttrReady) {
      this.mAttributes.InterfaceOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/interface/InterfaceName/csv',
      );
      this.mAttributes.IPv4TypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/interface/IPv4Type/enum',
      );
      this.mAttributes.IPv6TypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/interface/IPv6Type/enum',
      );
      this.mAttributes.PrefixLength = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/interface/IPv6PrefixLength/int');
      this.mAttributes.HostNameOptions = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/interface/HostName/int');
      this.mAttributes.DnsTypeOptions = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/dns/Type/enum');
      this.mAttributes.RtspTimeoutOptions = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/rtsp/Timeout/enum');
      this.mAttributes.Http = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/http/Port/int');
      this.mAttributes.Https = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/https/Port/int');
      this.mAttributes.Rtsp = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/rtsp/Port/int');
      this.mAttributes.Svnp = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/svnp/Port/int');
      this.mAttributes.PPPoEUserName = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/interface/PPPoEUserName/string');
      this.mAttributes.PPPoEPassword = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/interface/PPPoEPassword/string');
      this.mAttributes.Upnp = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/upnpdiscovery/FriendlyName/string');
      this.mAttributes.Bonjour = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/bonjour/FriendlyName/string');
      this.mAttributes.QoSIndexRange = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/qos/Index/int');
      this.mAttributes.DSCPRange = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/qos/DSCP/int');
      this.mAttributes.QOSIPType = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/qos/IPType/enum');
      this.mAttributes.SNMPVersion1 = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/Version1/bool');
      this.mAttributes.SNMPVersion2 = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/Version2/bool');
      this.mAttributes.SNMPVersion3 = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/Version3/bool');
      this.mAttributes.ReadCommunity = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/ReadCommunity/string');
      this.mAttributes.WriteCommunity = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/WriteCommunity/string');
      this.mAttributes.UserPassword = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmp/UserPassword/string');
      this.mAttributes.SNMPTrapEnable = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Enable/bool');
      this.mAttributes.TrapCommunity = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.Community/string');
      this.mAttributes.TrapAuthentificationFailure = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/snmptrap/Trap.#.AuthenticationFailure/bool',
      );
      this.mAttributes.TrapLinkUp = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.LinkUp/bool');
      this.mAttributes.TrapLinkDown = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.LinkDown/bool');
      this.mAttributes.TrapWarmStart = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.WarmStart/bool');
      this.mAttributes.TrapColdStart = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.ColdStart/bool');
      this.mAttributes.TrapAlarmInput = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.AlarmInput.#/bool');
      this.mAttributes.TrapAlarmOutput = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/snmptrap/Trap.#.AlarmOutput.#/bool');
      this.mAttributes.TrapTamperingDetection = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/snmptrap/Trap.#.TamperingDetection/bool',
      );
      this.mAttributes.SamsungServerNameRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/dynamicdns/SamsungServerName/string',
      );
      this.mAttributes.SamsungProductIDRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/dynamicdns/SamsungProductID/string',
      );
      this.mAttributes.PublicServiceEntryOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/dynamicdns/PublicServiceEntry/enum',
      );
      this.mAttributes.PublicHostNameRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'network/dynamicdns/PublicHostName/string',
      );
      this.mAttributes.PublicUserNameRange = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/dynamicdns/PublicUserName/string');
      this.mAttributes.PublicPasswordRange = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/dynamicdns/PublicPassword/string');
      this.mAttributes.IPv6DefaultAddress = xmlParser.parseCgiSection(this.mAttributes.cgiSection,
        'network/interface/IPv6DefaultAddress/string');

      this.mAttributes.networkCgiAttrReady = true;
    }
  }

  parseTransferCgiAttributes = () => {
    if (!this.mAttributes.transferCgiAttrReady) {
      this.mAttributes.FTPPortRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Port/int',
      );
      this.mAttributes.FTPHostStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Host/string',
      );
      this.mAttributes.FTPUsernameStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Username/string',
      );
      this.mAttributes.FTPPasswordStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Password/string',
      );
      this.mAttributes.FTPPathStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Path/string',
      );
      this.mAttributes.FTPModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/ftp/Mode/enum',
      );
      this.mAttributes.SMTPPortRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Port/int',
      );
      this.mAttributes.SMTPHostStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Host/string',
      );
      this.mAttributes.SMTPUsernameStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Username/string',
      );
      this.mAttributes.SMTPPasswordStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Password/string',
      );
      this.mAttributes.SMTPSenderStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Sender/string',
      );
      this.mAttributes.SMTPRecipientStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Recipient/string',
      );
      this.mAttributes.SMTPSubjectStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Subject/string',
      );
      this.mAttributes.SMTPMessageStringLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'transfer/smtp/Message/string',
      );

      this.mAttributes.transferCgiAttrReady = true;
    }
  }

  parseSecurityCgiAttributes = () => {
    if (!this.mAttributes.secuirityCgiAttrReady) {
      this.mAttributes.IpFilterAccessType = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/ipfilter/AccessType/enum',
      );
      this.mAttributes.IpFilterIndexRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/ipfilter/IPIndex/int',
      );
      this.mAttributes.IpFilterIPType = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/ipfilter/IPType/enum',
      );
      this.mAttributes.SSLPolicyOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/ssl/Policy/enum',
      );
      this.mAttributes.PublicCertificateNameRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/ssl/PublicCertificateName/string',
      );
      this.mAttributes.EAPOLTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/EAPOLType/enum',
      );
      this.mAttributes.EAPOLVersionOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/EAPOLVersion/enum',
      );
      this.mAttributes.CertificateTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/CertificateType/enum',
      );
      this.mAttributes.EAPOLIDRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/EAPOLId/string',
      );
      this.mAttributes.EAPOLPasswordRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/EAPOLPassword/string',
      );
      this.mAttributes.IEEE802Dot1xInterfaceOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/802Dot1x/InterfaceName/csv',
      );
      this.mAttributes.UserIDLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/UserID/string',
      );
      this.mAttributes.PasswordLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/Password/string',
      );
      this.mAttributes.VideoProfileAccess = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/VideoProfileAccess/bool',
      );
      this.mAttributes.PTZAccess = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/PTZAccess/bool',
      );
      this.mAttributes.AudioInAccess = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/AudioInAccess/bool',
      );
      this.mAttributes.AudioOutAccess = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/AudioOutAccess/bool',
      );
      this.mAttributes.AlarmOutputAccess = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/users/AlarmOutputAccess/bool',
      );
      this.mAttributes.RSASupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'security/rsa/PublicKey/string',
      );

      this.mAttributes.secuirityCgiAttrReady = true;
    }
  }

  parseEventStatusCgiAttributes = () => {
    if (!this.mAttributes.eventstatusCgiAttrReady) {
      this.mAttributes.SystemEvents = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventstatus/eventstatus/SystemEvent/csv',
      );
      this.mAttributes.ChannelEvents = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventstatus/eventstatus/Channel.#.EventType/csv',
      );

      this.mAttributes.eventstatusCgiAttrReady = true;
    }
  }

  parseIOCgiAttributes = () => {
    if (!this.mAttributes.ioCgiAttrReady) {
      this.mAttributes.AlarmOutputIdleStateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'io/alarmoutput/AlarmOutput.#.IdleState/enum',
      );
      this.mAttributes.AlarmoutManualDurations = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'io/alarmoutput/AlarmOutput.#.ManualDuration/enum',
      );

      this.mAttributes.ioCgiAttrReady = true;
    }
  }

  parseEventSourceCgiAttributes = () => {
    if (!this.mAttributes.eventsourceCgiAttrReady) {
      const va2support = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/videoanalysis2/DetectionType/enum',
      );
      let vaCmd = '';
      if (typeof va2support !== 'undefined') {
        this.mAttributes.VideoAnalysis2Support = true;
        vaCmd = 'videoanalysis2';
      } else {
        this.mAttributes.VideoAnalysis2Support = false;
        vaCmd = 'videoanalysis';
      }
      this.mAttributes.AlarmInputStateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/alarminput/AlarmInput.#.State/enum',
      );
      this.mAttributes.ScheduleIntervalOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/timer/ScheduleInterval/enum',
      );
      this.mAttributes.TamperDetectSensitivityTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/Sensitivity/enum',
      );
      this.mAttributes.TamperDetectSensitivityLevelRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/SensitivityLevel/int',
      );
      this.mAttributes.DarknessDetection = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/DarknessDetection/bool',
      );
      this.mAttributes.DefocusDetectSensitivityLevelRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/defocusdetection/Sensitivity/int',
      );
      this.mAttributes.MotionDetectSensitivityTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/Sensitivity/enum`,
      );
      this.mAttributes.MotionDetectThreshold = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/ROI.#.ThresholdLevel/int`,
      );
      this.mAttributes.MotionDetectSensitivityLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/SensitivityLevel/int`,
      );
      this.mAttributes.MotionDetectionDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/ROI.#.Duration/int`,
      );
      this.mAttributes.FaceDetectSensitivityTypes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/facedetection/Sensitivity/int',
      );
      this.mAttributes.DynamicAreaOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/facedetection/DynamicArea/bool',
      );
      this.mAttributes.ScheduleIntervalUnits = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/timer/ScheduleIntervalUnit/enum',
      );
      this.mAttributes.MotionDetectModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DetectionType/enum`,
      );
      this.mAttributes.InputThresholdLevelRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/audiodetection/InputThresholdLevel/int',
      );
      this.mAttributes.CameraHeights = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/autotracking/CameraHeight/enum',
      );
      this.mAttributes.AutoTrackObjectSize = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/autotracking/ObjectSize/enum',
      );
      this.mAttributes.DetectionAreaModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/facedetection/DetectionAreaMode/enum',
      );
      this.mAttributes.OverlayColorOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/facedetection/OverlayColor/enum',
      );
      this.mAttributes.DisplayRules = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DisplayRules/bool`,
      );
      this.mAttributes.DetectionResultOverlay = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DetectionResultOverlay/bool`,
      );
      this.mAttributes.CameraHeight = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/peoplecount/CameraHeight/int',
      );
      this.mAttributes.CalibrationMode = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/peoplecount/CalibrationMode/enum',
      );

      this.mAttributes.PeopleCount = typeof xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/peoplecount/Enable/bool',
      ) !== 'undefined';
      this.mAttributes.HeatMap = typeof xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/heatmap/Enable/bool',
      ) !== 'undefined';

      if (this.mAttributes.PeopleCount === true
        || this.mAttributes.QueueManagement === true
        || this.mAttributes.HeatMap === true) {
        this.mAttributes.EnableStatistics = true;
      }

      this.mAttributes.LoiteringDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DefinedArea.#.LoiteringDuration/int`,
      );
      this.mAttributes.AppearanceDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DefinedArea.#.AppearanceDuration/int`,
      );
      this.mAttributes.IntrusionDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `eventsources/${vaCmd}/DefinedArea.#.IntrusionDuration/int`,
      );

      this.mAttributes.TamperDetectThreshold = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/ThresholdLevel/int',
      );
      this.mAttributes.TamperDetectDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/Duration/int',
      );
      this.mAttributes.TamperDetectSensitivityLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/tamperingdetection/SensitivityLevel/int',
      );

      this.mAttributes.ShockDetectSensitivityLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/shockdetection/SensitivityLevel/int',
      );

      this.mAttributes.AudioDetectInputThresholdLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/audiodetection/InputThresholdLevel/int',
      );

      this.mAttributes.DefocusDetectThreshold = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/defocusdetection/Threshold/int',
      );
      this.mAttributes.DefocusDetectDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/defocusdetection/Duration/int',
      );

      this.mAttributes.FogDetectThreshold = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/fogdetection/Threshold/int',
      );
      this.mAttributes.FogDetectDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/fogdetection/Duration/int',
      );
      this.mAttributes.FogDetectSensitivityLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/fogdetection/SensitivityLevel/int',
      );

      this.mAttributes.QueueDurations = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/queuemanagementsetup/Queue.#.Level.#.Threshold/int',
      );

      // TCD => TemperatureChangeDetection
      this.mAttributes.TCDMode = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/temperaturechangedetection/TemperatureChange.ROI.#.Mode/enum',
      );
      this.mAttributes.TCDDetectionPeriod = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/temperaturechangedetection/TemperatureChange.ROI.#.DetectionPeriod/int',
      );
      this.mAttributes.TCDCelsiusGapOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/temperaturechangedetectionoptions/Celsius.SupportedGap/csv',
      );
      this.mAttributes.TCDFahrenheitGapOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventsources/temperaturechangedetectionoptions/Fahrenheit.SupportedGap/csv',
      );

      this.mAttributes.eventsourceCgiAttrReady = true;
    }
  }

  parseRecordingCgiAttributes = () => {
    if (!this.mAttributes.recordingCgiAttrReady) {
      this.mAttributes.RecVideoFileTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/general/RecordedVideoFileType/enum',
      );
      this.mAttributes.RecNormalModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/general/NormalMode/enum',
      );
      this.mAttributes.RecEventModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/general/EventMode/enum',
      );
      this.mAttributes.RecPreEventDurationOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/general/PreEventDuration/enum',
      );
      this.mAttributes.RecPostEventDurationOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/general/PostEventDuration/enum',
      );
      this.mAttributes.AutoDeleteDayOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/storage/AutoDeleteDays/int',
      );
      this.mAttributes.SearchKeywordMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'recording/metadata/Keyword/string',
      );
      this.mAttributes.recordingCgiAttrReady = true;
    }
  }

  parseEventActionsCgiAttributes = () => {
    if (!this.mAttributes.eventactionsCgiAttrReady) {
      this.mAttributes.EventActionSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventactions/complexaction/EventType/enum',
      );
      if (typeof this.mAttributes.EventActionSupport !== 'undefined'
        && this.mAttributes.EventActionSupport !== null) {
        this.mAttributes.EventActionSupport = true;
        this.mAttributes.EventActions = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventactions/complexaction/EventAction/enum',
        ); // 추후 sourceoptions로 변경
        this.mAttributes.ActivateOptions = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventactions/complexaction/ScheduleType/enum',
        );
        this.mAttributes.PresetNumberRange = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventrules/rules/PresetNumber/int',
        );
        this.mAttributes.AlarmoutDurationOptions = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventactions/complexaction/AlarmOutput.#.Duration/enum',
        ).map(val => (val !== 'None' ? val : 'Off'));
      } else {
        this.mAttributes.EventActionSupport = false;
      }
      this.mAttributes.eventactionsCgiAttrReady = true;
    }
  }

  parseEventRulesCgiAttributes = () => {
    if (!this.mAttributes.eventrulesCgiAttrReady) {
      // this.mAttributes.EventSources = xmlParser.parseCgiSection(
      //   this.mAttributes.cgiSection, 'eventrules/rules/EventSource/enum',
      // );
      this.mAttributes.EventActions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/rules/EventAction/enum',
      );
      this.mAttributes.ActivateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/rules/ScheduleType/enum',
      );
      this.mAttributes.PresetNumberRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/rules/PresetNumber/int',
      );
      this.mAttributes.HandoverV2 = typeof xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/Channel/int',
      ) !== 'undefined';
      this.mAttributes.HandoverV2IndexRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/HandoverIndex/int',
      );

      this.mAttributes.HandoverV2UserRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/HandoverIndex/int',
      );
      this.mAttributes.HandoverV2UserMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/Username/string',
      );
      this.mAttributes.HandoverV2PwdMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/Password/string',
      );
      this.mAttributes.HandoverV2PresetRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover2/PresetNumber/int',
      );

      this.mAttributes.HandoverRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/handover/ROIIndex/int',
      );
      this.mAttributes.AlarmoutDurationOptions = ['Off'];

      const alarmOutputDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'eventrules/rules/AlarmOutput.#.Duration/enum',
      );
      if (alarmOutputDuration) {
        this.mAttributes.AlarmoutDurationOptions.push(...alarmOutputDuration);
      }

      if (typeof this.mAttributes.HandoverRange !== 'undefined') {
        this.mAttributes.HandoverUserRange = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventrules/handover/HandoverIndex/int',
        );
        this.mAttributes.HandoverUserMaxLen = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventrules/handover/Username/string',
        );
        this.mAttributes.HandoverPwdMaxLen = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventrules/handover/Password/string',
        );
        this.mAttributes.HandoverPresetRange = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'eventrules/handover/PresetNumber/int',
        );
      }

      this.mAttributes.eventrulesCgiAttrReady = true;
    }
  }

  parseImageCgiAttributes = () => {
    if (!this.mAttributes.imageCgiAttrReady) {
      this.mAttributes.FlipMirrorSupport = (typeof xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/flip/Channel/int',
      ) !== 'undefined');
      this.mAttributes.RotateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/flip/Rotate/enum',
      );
      this.mAttributes.SmartCodecOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/smartcodec/Mode/enum',
      );
      this.mAttributes.SmartCodecQualityOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/smartcodec/QualityLevel/enum',
      );
      this.mAttributes.ImagePresetModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/imagepreset2/Mode/enum',
      );
      this.mAttributes.ImagePresetSchedModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/imagepresetschedule/<ddd>.<hourIndex>.Mode/csv',
      );
      this.mAttributes.ImagePresetOptionsSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/imagepresetoptions/ImagePresetMode/enum',
      );
      this.mAttributes.SSDRLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/ssdr/Level/int',
      );
      this.mAttributes.SSDRDynamicRangeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/ssdr/DynamicRange/enum',
      );
      this.mAttributes.WhiteBalanceModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/whitebalance/WhiteBalanceMode/enum',
      );
      this.mAttributes.WhiteBalanceManualRedLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/whitebalance/WhiteBalanceManualRedLevel/int',
      );
      this.mAttributes.WhiteBalanceManualBlueLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/whitebalance/WhiteBalanceManualBlueLevel/int',
      );
      this.mAttributes.CompensationModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/CompensationMode/enum',
      );
      this.mAttributes.WDRLevelOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/WDRLevel/enum',
      );
      this.mAttributes.BLCLevelOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/BLCLevel/enum',
      );
      this.mAttributes.HLCModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCMode/enum',
      );
      this.mAttributes.HLCLevelOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCLevel/enum',
      );
      this.mAttributes.HLCMaskTone = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCMaskTone/int',
      );
      this.mAttributes.HLCMaskColorOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCMaskColor/enum',
      );
      this.mAttributes.HLCDimmingOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCDimming/enum',
      );
      this.mAttributes.HLCAreaTop = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCAreaTop/int',
      );
      this.mAttributes.HLCAreaBottom = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCAreaBottom/int',
      );
      this.mAttributes.HLCAreaLeft = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCAreaLeft/int',
      );
      this.mAttributes.HLCAreaRight = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/HLCAreaRight/int',
      );
      this.mAttributes.BLCAreaTop = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/BLCAreaTop/int',
      );
      this.mAttributes.BLCAreaBottom = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/BLCAreaBottom/int',
      );
      this.mAttributes.BLCAreaLeft = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/BLCAreaLeft/int',
      );
      this.mAttributes.BLCAreaRight = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/BLCAreaRight/int',
      );
      this.mAttributes.WDRSeamlessTransitionOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/WDRSeamlessTransition/enum',
      );
      this.mAttributes.WDRLowLightOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/WDRLowLight/enum',
      );
      this.mAttributes.WDRIRLEDEnableOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/WDRIRLEDEnable/enum',
      );

      this.mAttributes.MinShutterOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/AutoShortShutterSpeed/enum',
      );
      this.mAttributes.MaxShutterOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/AutoLongShutterSpeed/enum',
      );
      this.mAttributes.PreferShutterOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/PreferShutterSpeed/enum',
      );
      this.mAttributes.AFLKModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/AFLKMode/enum',
      );
      this.mAttributes.SSNRModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/SSNRMode/enum',
      );
      this.mAttributes.SSNRLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/SSNRLevel/int',
      );
      this.mAttributes.SSNR2DLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/SSNR2DLevel/int',
      );
      this.mAttributes.SSNR3DLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/SSNR3DLevel/int',
      );
      this.mAttributes.IrisModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/IrisMode/enum',
      );
      this.mAttributes.IrisFnoOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/IrisFno/enum',
      );
      this.mAttributes.PIrisModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/PIrisMode/enum',
      );
      this.mAttributes.PIrisPosition = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/PIrisPosition/int',
      );
      this.mAttributes.AGCModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/AGCMode/enum',
      );
      this.mAttributes.AGCLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/AGCLevel/int',
      );
      this.mAttributes.DayNightModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/DayNightMode/enum',
      );
      this.mAttributes.DayNightSwitchingTimeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/DayNightSwitchingTime/enum',
      );
      this.mAttributes.DayNightSwitchingModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/DayNightSwitchingMode/enum',
      );
      this.mAttributes.DayNightAlarmInOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/DayNightAlarmIn/enum',
      );
      this.mAttributes.SimpleFocusAfterDayNight = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/SimpleFocus/enum',
      );

      this.mAttributes.ExposureControlSpeed = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/ExposureControlSpeed/int',
      );

      const imaenhance2Support = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/imageenhancements2/SharpnessLevel/int',
      );
      let imaenhanceCmd = '';
      if (typeof imaenhance2Support !== 'undefined') {
        this.mAttributes.imageenhancements2Support = true;
        imaenhanceCmd = 'imageenhancements2';
      } else {
        this.mAttributes.imageenhancements2Support = false;
        imaenhanceCmd = 'imageenhancements';
      }
      this.mAttributes.Brightness = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/Brightness/int`,
      );
      this.mAttributes.SharpnessLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/SharpnessLevel/int`,
      );
      this.mAttributes.Gamma = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/Gamma/int`,
      );
      this.mAttributes.Saturation = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/Saturation/int`,
      );
      this.mAttributes.DefogModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/DefogMode/enum`,
      );
      this.mAttributes.DefogLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/DefogLevel/int`,
      );
      this.mAttributes.LDCModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/LDCMode/enum`,
      );
      this.mAttributes.LDCLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/LDCLevel/int`,
      );
      this.mAttributes.Contrast = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/Contrast/int`,
      );
      this.mAttributes.CAROptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/CAR/enum`,
      );
      this.mAttributes.DefogFilterOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, `image/${imaenhanceCmd}/OpticalDefogFilterEnable/bool`,
      );
      /** OSD Start  */
      this.mAttributes.PositionX = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/PositionX/int',
      );
      this.mAttributes.PositionY = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/PositionY/int',
      );
      this.mAttributes.TimeFormatOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/DateFormat/enum',
      );
      this.mAttributes.FontSizeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/FontSize/enum',
      );
      this.mAttributes.OSDColorOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/OSDColor/enum',
      );
      this.mAttributes.OSDTransparencyOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/Transparency/enum',
      );
      this.mAttributes.OSDBlinkOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/OSDBlink/enum',
      );
      this.mAttributes.MultilineOSDTitle = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multilineosd/OSD/string',
      );
      this.mAttributes.MultiImageIndex = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multiimageosd/Index/int',
      );
      this.mAttributes.ImageOverlayMaxResolution = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/multiimageosd/MaxResolution/string',
      );
      /** OSD End  */

      this.mAttributes.SimpleFocusOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/Focus/enum',
      );
      this.mAttributes.FastAutoFocusEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/FastAutoFocus/bool',
      );
      this.mAttributes.SimpleZoomOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/Zoom/enum',
      );
      this.mAttributes.FocusModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/Mode/enum',
      );
      this.mAttributes.FocusControlModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/control/Mode/enum',
      );
      this.mAttributes.ZoomTrackingModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/ZoomTrackingMode/enum',
      );
      this.mAttributes.ZoomTrackingSpeedOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/ZoomTrackingSpeed/enum',
      );
      this.mAttributes.IRShiftOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/IRShift/enum',
      );

      /** Overlay Start */
      this.mAttributes.PTZPositionEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/overlay/PTZPositionEnable/bool',
      );
      this.mAttributes.PresetNameEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/overlay/PresetNameEnable/bool',
      );
      this.mAttributes.CameraIDEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/overlay/CameraIDEnable/bool',
      );
      this.mAttributes.AzimuthEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/overlay/AzimuthEnable/bool',
      );
      /** Overlay End */

      this.mAttributes.LensResetScheduleOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/LensResetSchedule/enum',
      );
      this.mAttributes.IRledModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/Mode/enum',
      );
      this.mAttributes.IRledLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/Level/enum',
      );
      this.mAttributes.LEDOnLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/LEDOnLevel/int',
      );
      this.mAttributes.LEDOffLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/LEDOffLevel/int',
      );
      this.mAttributes.LEDPowerControlModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/LEDPowerControlMode/enum',
      );
      this.mAttributes.LEDMaxPowerOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/LEDMaxPower/enum',
      );
      this.mAttributes.ScheduleEveryDay = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/irled/Schedule.EveryDay.FromTo/string',
      );
      this.mAttributes.ColorOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/privacy/MaskColor/enum',
      );
      this.mAttributes.PrivacyMaskMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/privacy/MaskName/string',
      );
      this.mAttributes.PrivacyMaskPattern = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/privacy/MaskPattern/enum',
      );

      this.mAttributes.LensModel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/fisheyesetup/LensModel/enum',
      );
      this.mAttributes.CameraPosition = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/fisheyesetup/CameraPosition/enum',
      );
      this.mAttributes.ViewModeIndex = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/fisheyesetup/ViewModeIndex/int',
      );
      this.mAttributes.ViewModeType = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/fisheyesetup/ViewModeType/enum',
      );

      this.mAttributes.PtrPanOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/ptr/Pan/int',
      );
      this.mAttributes.PtrTiltOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/ptr/Tilt/int',
      );
      this.mAttributes.PtrRotateOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/ptr/Rotate/int',
      );

      this.mAttributes.LensModelOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/set/LensModel/enum',
      );
      this.mAttributes.LensModelViewOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/view/LensModel/enum',
      );

      if (this.mAttributes.PtrRotateOptions
        && this.mAttributes.PtrTiltOptions
        && this.mAttributes.PtrPanOptions) {
        this.mAttributes.PTRZModel = true;
      }

      this.mAttributes.whiteBalanceSupport = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/whitebalance/Channel/int',
      );
      this.mAttributes.thermalColorPaletteOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/ThermalColorPalette/enum',
      );
      this.mAttributes.thermalCorrectionIntervalOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/camera/ThermalCorrectionInterval/enum',
      );

      // XNP-6371RH Focus Attributes
      this.mAttributes.globalAutoFocusRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'image/focus/AutoFocusRange/enum',
      );
      this.mAttributes.presetAutoFocusRange = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AutoFocusRange/enum',
      );

      this.mAttributes.imageCgiAttrReady = true;
    }
  }

  parsePTZCgiAttributes = () => {
    if (!this.mAttributes.ptzCgiAttrReady) {
      // if (this.mAttributes.PTZModel || this.mAttributes.ExternalPTZModel
      //   || this.mAttributes.ZoomOnlyModel || this.mAttributes.PanTiltOnlyModel) {
      this.mAttributes.ZoomLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzcontrol/continuous/Zoom/int',
      );
      this.mAttributes.MaxZoom = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzcontrol/absolute/Zoom/float',
      );
      this.mAttributes.DaysAfterReboot = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptlimits/DaysAfterReboot/int',
      );
      this.mAttributes.PTLimitInitTime = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptlimits/StartTime/int',
      );
      this.mAttributes.DigitalZoomEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/DigitalZoomEnable/bool',
      );
      this.mAttributes.AutoFlipEnable = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/AutoFlipEnable/bool',
      );
      this.mAttributes.MaxDigitalZoomOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/MaxDigitalZoom/enum',
      );
      this.mAttributes.RememberLastPosition = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/RememberLastPosition/bool',
      );
      this.mAttributes.RememberLastPositionDuration = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/RememberLastPositionDuration/int',
      );
      this.mAttributes.PresetSSDRLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/SSDRLevel/int',
      );
      this.mAttributes.PresetDynamicRangeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DynamicRange/enum',
      );
      this.mAttributes.PresetWhiteBalanceModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/WhiteBalanceMode/enum',
      );
      this.mAttributes.PresetWhiteBalanceManualRedLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/WhiteBalanceManualRedLevel/int',
      );
      this.mAttributes.PresetWhiteBalanceManualBlueLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/WhiteBalanceManualBlueLevel/int',
      );
      this.mAttributes.PresetBrightness = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/Brightness/int',
      );
      this.mAttributes.PresetAFLKModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AFLKMode/enum',
      );
      this.mAttributes.PresetSSNRLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/SSNRLevel/int',
      );
      this.mAttributes.PresetIrisModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/IrisMode/enum',
      );
      this.mAttributes.PresetIrisFnoOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/IrisFno/enum',
      );
      this.mAttributes.PresetAGCModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AGCMode/enum',
      );
      this.mAttributes.PresetAGCLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AGCLevel/int',
      );
      this.mAttributes.PresetDefogModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DefogMode/enum',
      );
      this.mAttributes.PresetDefogLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DefogLevel/int',
      );
      this.mAttributes.PresetDayNightModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DayNightMode/enum',
      );
      this.mAttributes.PresetDayNightSwitchingTimeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DayNightSwitchingTime/enum',
      );
      this.mAttributes.PresetDayNightSwitchingModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/DayNightSwitchingMode/enum',
      );
      this.mAttributes.PresetSharpnessLevel = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/SharpnessLevel/int',
      );
      this.mAttributes.PresetSaturation = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/Saturation/int',
      );
      this.mAttributes.PresetFocusModeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/FocusMode/enum',
      );
      this.mAttributes.PresetMaxDigitalZoomOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/MaxDigitalZoom/enum',
      );
      this.mAttributes.PresetContrast = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/contrast/enum',
      );
      this.mAttributes.PTZPresetOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/preset/Preset/int',
      );
      this.mAttributes.PresetNameMaxLen = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/preset/Name/string',
      );
      this.mAttributes.PresetActions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AfterAction/enum',
      );
      this.mAttributes.PresetTrackingTime = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/presetimageconfig/AfterActionTrackingTime/enum',
      );
      this.mAttributes.PresetSpeedLimits = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/group/Speed/int',
      );
      this.mAttributes.PresetDwellTimeLimits = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/group/DwellTime/int',
      );
      this.mAttributes.SwingModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/swing/Mode/enum',
      );
      this.mAttributes.AutoRunModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/autorun/Mode/enum',
      );
      this.mAttributes.AutoRunActiveTimeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/autorun/ActivationTime/enum',
      );
      this.mAttributes.AutoRunScheduleModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/autorun/ScheduleMode/enum',
      );
      this.mAttributes.AutoPanSpeed = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/autorun/AutoPanSpeed/int',
      );
      this.mAttributes.AutoPanTiltAngle = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/autorun/AutoPanTiltAngle/int',
      );
      this.mAttributes.ProportionalPTSpeedModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/ProportionalPTSpeedMode/enum',
      );
      this.mAttributes.PTLimitControlModes = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptlimits/Mode/enum',
      );
      this.mAttributes.PTLimitSpeedTypeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzsettings/SpeedType/enum',
      );
      this.mAttributes.TiltRangeOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptlimits/TiltRange/enum',
      );
      this.mAttributes.PTZProtocolOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzprotocol/Protocol/enum',
      );
      this.mAttributes.CameraIDOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzprotocol/CameraID/int',
      );
      this.mAttributes.ConnectionPortOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzprotocol/ConnectionPortType/enum',
      );
      this.mAttributes.CoaxProtocolOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'ptzconfig/ptzprotocol/CoaxProtocol/enum',
      );
      // }

      if (this.mAttributes.isDigitalPTZ) {
        this.mAttributes.DigitalAutoTrackingOptions = xmlParser.parseCgiSection(
          this.mAttributes.cgiSection, 'ptzcontrol/digitalautotracking/Mode/enum',
        );
      }

      this.mAttributes.ptzCgiAttrReady = true;
    }
  }

  parseOpenSDKCgiAttributes = () => {
    if (!this.mAttributes.openSDKCgiAttrReady) {
      this.mAttributes.OpenSDKPriorityOptions = xmlParser.parseCgiSection(
        this.mAttributes.cgiSection, 'opensdk/apps/<AppID>.Priority/enum',
      );
      this.mAttributes.openSDKCgiAttrReady = true;
    }
  }

  getIsSupport = val => {
    if (typeof val === 'boolean') {
      return val === true;
    }
    if (typeof val === 'number') {
      return val !== 0;
    }
    return val;
  }

  wait = () => {
    if (!this.mAttributes.Ready && !this.mAttributes.GetFail) {
      if (this.mAttributes.DeviceInfoReady && this.mAttributes.CgiSectionReady
        && this.mAttributes.AttributeSectionReady) {
        this.mAttributes.retryCount += 1;

        if (this.mAttributes.retryCount >= this.RETRY_COUNT) {
          this.mAttributes.GetFail = true;
          return 'FAIL';
        }
        this.mAttributes.Ready = true;
        return 'READY';
      }
      console.log('Waiting ..', this.mAttributes.retryCount);
      this.mAttributes.retryCount += 1;

      if (this.mAttributes.retryCount >= this.RETRY_COUNT) {
        this.mAttributes.GetFail = true;
        return 'FAIL';
      }
      return 'WAIT';
    }
    if (this.mAttributes.GetFail) {
      console.log('Retry Call attributes');
      return 'RETRY';
    }
    return 'WAIT';
  }

  load = () => {
    this.mAttributes.GetFail = false;

    if (!this.mAttributes.DeviceInfoReady) {
      this.getDeviceInfo();
    }

    if (!this.mAttributes.EventSourceOptionsReady) {
      this.getEventSourceOptions();
    }

    if (!this.mAttributes.AttributeSectionReady) {
      this.getAttributeSection();
    }

    if (!this.mAttributes.CgiSectionReady) {
      this.getCgiSection();
    }

    // 카메라에서만 사용
    // if (sessionStorage.getItem('WISENET_USER_ID') === 'admin') {
    //   await this.cameraView();
    // }

    this.mAttributes.retryCount = 0;

    if (!this.mAttributes.DeviceInfoReady || !this.mAttributes.CgiSectionReady
      || !this.mAttributes.AttributeSectionReady) {
      return false;
    }
    return true;
  }

  get = () => {
    if (this.mAttributes.CgiSectionReady === true
      && this.mAttributes.AttributeSectionReady === true) {
      return this.mAttributes;
    }
    return new Error('Attributes not ready');
  }
}

export default new Attributes();

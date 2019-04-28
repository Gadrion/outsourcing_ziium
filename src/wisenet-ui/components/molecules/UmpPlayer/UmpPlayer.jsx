import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { WrapperSunapiClient } from 'util/lib';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';

import UmpPlayerStyled from './UmpPlayerStyled';

class UmpPlayer extends PureComponent {
  componentDidMount() {
    if (this.umpPlayer.play) {
      const {
        addEvent,
      } = this;

      const {
        sessionKey,
        setUmpPlayer,
        mode,
        useIsoTimeFormat,
      } = this.props;

      this.umpPlayer.sessionKey = sessionKey;
      this.umpPlayer.sunapiClient = WrapperSunapiClient;
      this.umpPlayer.playType = mode;
      this.umpPlayer.useIsoTimeFormat = useIsoTimeFormat;
      // this.umpPlayer.play();
      addEvent();
      setUmpPlayer(this.umpPlayer);
    }
  }

  componentWillUnmount() {
    if (this.umpPlayer.stop) {
      // this.umpPlayer.stop();
    }
  }

  addEvent = () => {
    const {
      onError,
      onMeta,
      onClose,
      onStatechange,
      onTimestamp,
      onCapture,
      onVideoText,
      onResize,
      onChangePlayermode,
      onStatistics,
      onBackupState,
    } = this.props;

    this.umpPlayer.addEventListener('error', onError);
    this.umpPlayer.addEventListener('meta', onMeta);
    this.umpPlayer.addEventListener('close', onClose);
    this.umpPlayer.addEventListener('statechange', onStatechange);
    this.umpPlayer.addEventListener('timestamp', onTimestamp);
    this.umpPlayer.addEventListener('capture', onCapture);
    this.umpPlayer.addEventListener('vtext', onVideoText);
    this.umpPlayer.addEventListener('resize', onResize);
    this.umpPlayer.addEventListener('changeplayermode', onChangePlayermode);
    this.umpPlayer.addEventListener('statistics', onStatistics);
    this.umpPlayer.addEventListener('backupstate', onBackupState);
  }

  render() {
    const {
      channel,
      device,
      profile,
      profileNumber,
      deviceIP,
      userID: propsUserID,
      mode: propsMode,
      isAspectRatioMode,
      uid,
      width,
      height,
      rotate,
    } = this.props;

    const hostname = deviceIP || axios.defaults.baseURL.replace('http://', '');
    const username = propsUserID || sessionStorage.getItem('WISENET_USER_ID');
    const mode = propsMode === umpPlayMode.LIVE ? 'Live' : 'Playback';

    return (
      <UmpPlayerStyled
        isAspectRatioMode={isAspectRatioMode}
        width={width}
        height={height}
        rotate={rotate}
      >
        <ump-player
          ref={ref => {
            this.umpPlayer = ref;
          }}
          id={`ump-player-${uid}-${mode}`}
          hostname={hostname}
          profile={profile}
          profile_number={profileNumber}
          channel={channel + 1}
          device={device}
          width={width}
          height={height}
          username={username}
          controls
        />
      </UmpPlayerStyled>
    );
  }
}

UmpPlayer.defaultProps = {
  // profile name.
  // If this device type is Camera, this attribute is mandatory.
  // But, If this device type is NVR, this attribute is not mandatory.
  // It is not necessary to play back.
  profile: undefined, // MJPEG
  // camera profile number.
  // If this device type is Camera, this attribute is not mandatory.
  // But, If this device type is NVR, this attribute is mandatory.
  // It is not necessary to play back.
  profileNumber: undefined, // '1'
  device: 'nvr',
  deviceIP: undefined,
  userID: undefined,
  useIsoTimeFormat: undefined,
  isAspectRatioMode: false,
  width: 300,
  height: 300,
  rotate: 0,

  // event function
  onError: () => {},
  onMeta: () => {},
  onClose: () => {},
  onStatechange: () => {},
  onTimestamp: () => {},
  onVideoText: () => {},
  onResize: () => {},
  onChangePlayermode: () => {},
  onStatistics: () => {},
  onBackupState: () => {},

  // set function
  setUmpPlayer: () => {},
};

UmpPlayer.propTypes = {
  channel: PropTypes.number.isRequired,
  sessionKey: PropTypes.string.isRequired,
  profile: PropTypes.string,
  profileNumber: PropTypes.string,
  device: PropTypes.string,
  deviceIP: PropTypes.string,
  userID: PropTypes.string,
  onError: PropTypes.func,
  onMeta: PropTypes.func,
  onClose: PropTypes.func,
  onStatechange: PropTypes.func,
  onTimestamp: PropTypes.func,
  onCapture: PropTypes.func.isRequired,
  setUmpPlayer: PropTypes.func,
  mode: PropTypes.oneOf([umpPlayMode.LIVE, umpPlayMode.PLAYBACK, umpPlayMode.BACKUP]).isRequired,
  useIsoTimeFormat: PropTypes.bool,
  onVideoText: PropTypes.func,
  isAspectRatioMode: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  onResize: PropTypes.func,
  onChangePlayermode: PropTypes.func,
  onStatistics: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  onBackupState: PropTypes.func,
};

export default UmpPlayer;

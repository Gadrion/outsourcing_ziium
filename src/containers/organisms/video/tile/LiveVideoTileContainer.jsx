import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MediaControlIDList } from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import MediaStatusType from 'wisenet-ui/util/static/constants/mediaControl/mediaStatusType';
import UmpInfomationType from 'wisenet-ui/util/static/constants/umpPlayer/umpInfomationType';
import { LiveMediaControlActions, MediaControlActions } from 'store/actionCreators';
import { List } from 'immutable';

class LiveVideoTileContainer extends React.Component {
  state = {
    profileNumber: '1',
    openTileControl: false,
    isAspectRatioMode: false,
    tileControlWork: {
      capure: false,
      sound: false,
      rotate: false,
    },
    channelInfo: {
      resolution: {
        width: 0,
        height: 0,
      },
      codec: '',
      bps: '0',
      fps: 0,
    },
    rotate: 0,
    sound: false, // true 시 mute 상태
    haveInstantPlayback: false,
    tileMode: 'normal', // ptz, instantPlayback, dZoom
    pcRecord: false, // pcRecord가 일하는 중인지 판단 여부
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      aspectRatioList: prevAspectRaTioList,
    } = prevProps;
    const {
      aspectRatioList,
      uid,
    } = this.props;

    if (aspectRatioList.size !== prevAspectRaTioList.size) {
      const findAspectUid = aspectRatioList.find(aspectUid => aspectUid === uid);

      this.onUpdate({
        isAspectRatioMode: !!findAspectUid,
      });
    }
  }

  // ump를 통해서 state로 값을 관리하는 부분
  onTileInfo = type => ({ onData, ...rest }) => { // onData, ...rest에 데이터 ump data 포함
    switch (type) {
      case UmpInfomationType.TAG_TYPE: {
        this.onUpdate({
          haveInstantPlayback: onData.tagType === 'video',
        });
        break;
      }
      case UmpInfomationType.RESOLUTION:
      case UmpInfomationType.CODEC:
      case UmpInfomationType.FPS: {
        const { channelInfo } = this.state;
        this.onUpdate({
          channelInfo: {
            ...channelInfo,
            ...onData,
          },
        });
        break;
      }
      case UmpInfomationType.CAPTURE: {
        this.workOff(type);
        this.onCapture(onData[type], rest);
        break;
      }
      case UmpInfomationType.SOUND: // mute에 대한 데이터
      case UmpInfomationType.ROTATE: {
        this.workOff(type, onData);
        break;
      }
      case UmpInfomationType.PC_RECORD: {
        if (onData[type].error) {
          // error가 있는 경우
        }
        this.workOff(type, onData);
        break;
      }
      default:
        break;
    }
  }

  workOff = (type, onData) => {
    const { tileControlWork } = this.state;
    this.onUpdate({
      tileControlWork: {
        ...tileControlWork,
        [type]: false,
      },
      [type]: onData ? onData[type] : undefined,
    });
  }

  onMouseEvent = type => event => {
    switch (type) {
      case 'enter': {
        const { tileMode } = this.state;
        if (tileMode === 'normal') {
          this.onUpdate({ openTileControl: true });
        }
        break;
      }
      case 'leave': {
        // chrome 브라우저에서 여러번 클릭 시 원하지 않는 객체의 leave이벤트 발생으로 인한 예외처리
        const { tileMode } = this.state;
        if (tileMode === 'normal') {
          if (window !== event.relatedTarget) {
            // event leave가 정상동작 할 때
            this.onUpdate({ openTileControl: false });
          }
        }
        break;
      }
      case 'doubleClick': {
        const { pattern } = this.props;
        if (pattern === 'SPECIAL') {
          const { backupPattern } = this.props;
          LiveMediaControlActions.patternControl({ pattern: backupPattern });
        } else {
          LiveMediaControlActions.backupLayoutControl({ needBackupLayoutData: true });
        }
        break;
      }
      default:
        break;
    }
  }


  onTileBarClick = type => event => {
    event.stopPropagation();
    const { tileControlWork } = this.state;
    const { uid } = this.props;
    const time = new Date();
    const Month = time.getMonth() + 1;
    const currentT = `${uid.split('-')[0]}-${time.getFullYear()}${Month}${time.getDate()}${time.getHours()}${time.getMinutes()}`;

    switch (type) {
      case MediaControlIDList.PC_RECORD:
        if (!tileControlWork[type]) {
          this.onUpdate({
            tileControlWork: {
              ...tileControlWork,
              [type]: true,
            },
            fileName: currentT,
          });
        }
        break;
      case MediaControlIDList.INSTANT_PLAYBACK: {
        const { haveInstantPlayback } = this.state;
        // const { uid, pattern } = this.props;
        if (haveInstantPlayback) {
          // CameraInfoActions.setSelectTileCamera(uid);
          // if (pattern !== 'SPECIAL') {
          //   LiveMediaControlActions.backupLayoutControl({ needBackupLayoutData: true });
          // }
          this.onUpdate({
            tileMode: type,
            openTileControl: false,
          });
        }

        break;
      }
      case MediaControlIDList.PTZ_CONTROL: {
        this.onUpdate({
          tileMode: type,
          openTileControl: false,
        });
        break;
      }
      case MediaControlIDList.CAPTURE:
      case MediaControlIDList.SOUND:
      case MediaControlIDList.ROTATE:
        if (!tileControlWork[type]) {
          this.onUpdate({
            tileControlWork: {
              ...tileControlWork,
              [type]: true,
            },
          });
        }
        break;
      case MediaControlIDList.ASPECT_RATIO: {
        MediaControlActions.aspectRatioControl({ uid });
        break;
      }
      default:
        break;
    }
  }

  onCapture = (event, data) => {
    // 기능 확인을 위한 코드
    const time = new Date();
    const Month = time.getMonth() + 1;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(event.detail.blob);
    a.download = `${data.channel}-${time.getFullYear()}${Month}${time.getDate()}${time.getHours()}${time.getMinutes()}.png`;
    a.click();
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  getStatusIcon = status => {
    let icon = null;
    switch (status) {
      case 'AuthFail':
        icon = 'wni-video-authority';
        break;
      // 영상 손실 미정의
      case 'videoLoss':
        icon = 'wni-video-videoloss';
        break;
      // IA 변경으로 제거
      // case 'ConnectFail':
      //   icon = 'wni-video-power';
      //   break;
      // case 'MaxUserLimit':
      //   icon = 'wni-video-maxuser';
      //   break;
      // case 'Disconnected':
      //   icon = 'wni-video-disconnect';
      //   break;
      default:
        icon = null;
        break;
    }
    return icon;
  };

  returnTileMode = () => {
    this.onUpdate({
      tileMode: 'normal',
      openTileControl: true,
    });
  }

  render() {
    // const { render, cameraList, channel } = this.props;
    const { render, status } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        statusIcon: this.getStatusIcon(status),
      },
    );
  }
}

LiveVideoTileContainer.propTypes = {
  render: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired,
  backupPattern: PropTypes.string.isRequired,
  aspectRatioList: PropTypes.instanceOf(List).isRequired,
  // channel: PropTypes.number.isRequired,
  // userId: PropTypes.string.isRequired,
  // httpPort: PropTypes.number.isRequired,
  // model: PropTypes.string.isRequired,
  // ipAddress: PropTypes.string.isRequired,
  // addressType: PropTypes.string.isRequired,
  // channelName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.entries(MediaStatusType).map(([, value]) => value)).isRequired,
  // MediaStatusType 값 참조
  // devicePort: PropTypes.number.isRequired,
  // protocol: PropTypes.string.isRequired,
  // 'wisenet-ui/util/static/constants/mediaControl/recordStatusType' 참조
  // ptzInfo: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({
  //   areaZoom: PropTypes.bool,
  //   digitalAutoTracking: PropTypes.bool,
  //   digitalPTZ: PropTypes.bool,
  //   focus: PropTypes.bool,
  //   group: PropTypes.bool,
  //   home: PropTypes.bool,
  //   iris: PropTypes.bool,
  //   pan: PropTypes.bool,
  //   panSpeed: PropTypes.bool,
  //   preset: PropTypes.bool,
  //   ptzLimit: PropTypes.bool,
  //   swing: PropTypes.bool,
  //   tilt: PropTypes.bool,
  //   tiltSpeed: PropTypes.bool,
  //   tour: PropTypes.bool,
  //   trace: PropTypes.bool,
  //   zoom: PropTypes.bool,
  //   zoomSpeed: PropTypes.bool,
  // })]).isRequired,
};

export default connect(
  (state, props) => ({
    sessionKey: state.preLoadModule.get('sessionKey'),
    functionMode: state.searchMediaControlModule.get('functionMode'),
    pattern: state.liveMediaControlModule.get('pattern'),
    backupPattern: state.liveMediaControlModule.get('backupPattern'),
    aspectRatioList: state.mediaControlModule.get('aspectRatioList'),
    OSDDisplay: state.liveMediaControlModule.get('OSDDisplay'),
    channelInfoDisplay: state.liveMediaControlModule.get('channelInfoDisplay').toJS(),
    ...state.cameraInfoModule.get('cameraList').find(camera => camera.get('channel') === props.channel).toJS(),
    isSelectTile: state.cameraInfoModule.get('selectTileCamera').get('uid') === props.uid,
  }),
)(LiveVideoTileContainer);

import React from 'react';
import PropTypes from 'prop-types';
import UmpInfomationType from 'wisenet-ui/util/static/constants/umpPlayer/umpInfomationType';
import umpReadyState from 'wisenet-ui/util/static/constants/umpPlayer/umpReadyState';

// Live, Playback 공통으로 사용하는 타일 기능 정의
class TileContainer extends React.Component {
  isPlay = false;

  borderValue = 1 * 2;

  state = {
    umpPlayer: null,
  };

  handleFunctionMode = {};

  componentDidMount() {
    this.handleFunctionMode = {
      [UmpInfomationType.CAPTURE]: this.captureFunc,
      [UmpInfomationType.SOUND]: this.soundFunc,
      [UmpInfomationType.ROTATE]: this.rotateFunc,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      tileControlWork: prevTileControlWork,
      functionMode: prevFunctionMode,
    } = prevProps;

    const { tileControlWork, functionMode } = this.props;

    // tile을 통해서 내려오는 control을 통합
    if (
      JSON.stringify(prevTileControlWork) !== JSON.stringify(tileControlWork)
    ) {
      let changeValue;
      Object.entries(tileControlWork).map(([key, value]) => {
        if (value && prevTileControlWork[key] !== value) {
          changeValue = key;
        }
        return null;
      });
      if (changeValue && this.handleFunctionMode[changeValue]) {
        this.handleFunctionMode[changeValue]();
      }
    }

    // search에서 사용하는 부분이 있어서 남겨둠 제거 해야함.
    if (prevFunctionMode !== functionMode) {
      if (functionMode !== 'none') {
        this.handleFunctionMode[functionMode]();
      }
    }
  }

  componentWillUnmount() {
    const { umpPlayer } = this.state;

    if (umpPlayer && (umpPlayer.readyState !== umpReadyState.STOPPED)) {
      umpPlayer.stop();
    }
  }

  captureFunc = () => {
    const { umpPlayer } = this.state;

    if (umpPlayer) {
      umpPlayer.capture();
    }
  };

  onCapture = evnet => {
    this.reciveData(UmpInfomationType.CAPTURE, evnet);
  };

  soundFunc = () => {
    const { umpPlayer } = this.state;

    if (umpPlayer) {
      const { sound } = this.props;
      if (sound) {
        umpPlayer.unmute();
      } else {
        umpPlayer.mute();
      }
      this.reciveData(UmpInfomationType.SOUND, umpPlayer.isMute());
    }
  };

  rotateFunc = () => {
    const { umpPlayer } = this.state;

    if (umpPlayer) {
      const { rotate } = this.props;
      const rotateDeg = (rotate + 90) % 360;
      this.reciveData(UmpInfomationType.ROTATE, rotateDeg);
    }
  };

  setUmpPlayer = ump => {
    const umpPlayer = ump;

    this.setState({
      umpPlayer,
    });
  };

  onStatechange = event => {
    const { onStatechange } = this.props;
    onStatechange(event);

    if (!this.isPlay) {
      // 초기 값을 설정하기 위한 부분
      this.isPlay = true;
      const { umpPlayer } = this.state;
      this.reciveData(UmpInfomationType.SOUND, umpPlayer.isMute());
    }
  };

  onResize = event => {
    const { onResize } = this.props;
    onResize(onResize);
    this.profileInfo(UmpInfomationType.RESOLUTION, {
      resolution: {
        ...event.detail,
      },
    });
  };

  onChangePlayermode = event => {
    const { onChangePlayermode } = this.props;
    onChangePlayermode(event);
    this.profileInfo(UmpInfomationType.TAG_TYPE, {
      tagType: event.detail.mode,
    });
  };

  onStatistics = event => {
    const { onStatistics, channelInfoDisplay } = this.props;
    const { isVisible, isDevelopMode } = channelInfoDisplay;
    onStatistics(event);
    if (event.detail.statictics.type === 'rtp') {
      const eventCodec = event.detail.statictics.codec;
      const { codec } = this.props;
      if (codec !== eventCodec) {
        if (isVisible) {
          this.profileInfo(UmpInfomationType.CODEC, {
            codec: eventCodec,
          });
        }
      }
    }
    if (isDevelopMode) {
      this.profileInfo(UmpInfomationType.FPS, {
        bps: event.detail.statictics.bps,
        fps: event.detail.statictics.fps,
      });
    }
  };

  // tileBar를 통해서 제어할 때 값을 올려주는 용도
  reciveData = (type, data) => {
    const { onTileInfo } = this.props;
    onTileInfo(type)({
      onData: {
        [type]: data,
      },
      ...this.props,
    });
  };

  // channelInfo 용으로 조금 다르게 설정됨
  profileInfo = (type, data) => {
    const { onTileInfo } = this.props;
    if (onTileInfo) {
      onTileInfo(type)({
        onData: data,
        ...this.props,
      });
    }
  };

  render() {
    const { render, width, height } = this.props;

    return render({
      ...this.props,
      ...this.state,
      ...this,
      width: width - this.borderValue,
      height: height - this.borderValue,
    });
  }
}

TileContainer.defaultProps = {
  functionMode: 'none',
  onStatechange: () => {},
  onTileInfo: () => (() => {}),
  onResize: () => {},
  onChangePlayermode: () => {},
  onStatistics: () => {},
  tileControlWork: {},
  sound: false,
  rotate: 0,
  width: 300,
  height: 300,
  channelInfoDisplay: {
    isVisible: false,
    isDevelopMode: false,
  },
  codec: '',
};

TileContainer.propTypes = {
  render: PropTypes.func.isRequired,
  functionMode: PropTypes.string,
  onStatechange: PropTypes.func,
  onTileInfo: PropTypes.func, // ump로 얻어야 하는 데이터를 올리는 콜백함수
  onResize: PropTypes.func,
  onChangePlayermode: PropTypes.func,
  onStatistics: PropTypes.func,
  sound: PropTypes.bool,
  rotate: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  codec: PropTypes.string,
  tileControlWork: PropTypes.shape({
    [UmpInfomationType.CAPTURE]: PropTypes.bool,
    [UmpInfomationType.SOUND]: PropTypes.bool,
    [UmpInfomationType.ROTATE]: PropTypes.bool,
  }),
  channelInfoDisplay: PropTypes.shape({
    isVisible: PropTypes.bool,
    isDevelopMode: PropTypes.bool,
  }),
};

export default TileContainer;

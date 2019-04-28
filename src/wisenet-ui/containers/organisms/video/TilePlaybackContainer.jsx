import { Component } from 'react';
import PropTypes from 'prop-types';
import umpReadyState from 'wisenet-ui/util/static/constants/umpPlayer/umpReadyState';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';

class TilePlaybackContainer extends Component {
  state = {
    mode: umpPlayMode.PLAYBACK,
  }

  handlePlayMode = {};

  componentDidMount() {
    this.handlePlayMode = {
      play: this.play,
      pause: this.pause,
      stop: this.stop,
    };
  }

  shouldComponentUpdate(nextProps) {
    const {
      playMode: nextPlayMode,
      channel: nextChannel,
      startTime: nextStartTime,
      playSpeed: nextPlaySpeed,
      umpPlayer: nextUmpPlayer,
      seekingTime: nextSeekingTime,
    } = nextProps;

    const {
      playMode,
      channel,
      startTime,
      playSpeed,
      umpPlayer,
      seekingTime,
    } = this.props;

    if (playMode === nextPlayMode
      && channel === nextChannel
      && startTime === nextStartTime
      && playSpeed === nextPlaySpeed
      && umpPlayer === nextUmpPlayer
      && seekingTime === nextSeekingTime) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) { // prevState, snapshot
    const {
      playMode: prevPlayMode,
      channel: prevChannel,
      startTime: prevStartTime,
      playSpeed: prevPlaySpeed,
      seekingTime: prevSeekingTime,
    } = prevProps;

    const {
      playMode,
      channel,
      startTime,
      playSpeed,
      umpPlayer,
      seekingTime,
    } = this.props;

    if (umpPlayer) {
      const { handlePlayMode } = this;

      if (prevPlayMode !== playMode || prevChannel !== channel || prevStartTime !== startTime) {
        handlePlayMode[playMode]();
      } else if (playSpeed !== prevPlaySpeed) {
        umpPlayer.playSpeed = playSpeed;
      } else if (seekingTime !== prevSeekingTime) {
        umpPlayer.seekingTime = seekingTime;
      }
    }
  }

  play = () => {
    const {
      startTime,
      endTime,
      umpPlayer,
      seekingTime,
      // overlappedId,
    } = this.props;

    if (umpPlayer.readyState === umpReadyState.PAUSED) {
      umpPlayer.resume();
    } else if (startTime !== '') {
      umpPlayer.startTime = seekingTime !== '' ? seekingTime : startTime;
      umpPlayer.endTime = endTime;
      // umpPlayer.overlappedId = overlappedId;
      umpPlayer.play();
    }
  }

  pause = () => {
    const { umpPlayer } = this.props;

    if (umpPlayer.readyState === umpReadyState.PLAYING) {
      umpPlayer.pause();
    }
  }

  stop = () => {
    const { umpPlayer } = this.props;

    if (umpPlayer.readyState !== umpReadyState.STOPPED) {
      umpPlayer.stop();
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  );

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

TilePlaybackContainer.defaultProps = {
  playMode: 'stop',
  startTime: '', // '2018-12-07T12:28:06Z'
  endTime: '', // '2018-11-13T13:28:06Z'
  channel: 0,
  playSpeed: 1,
  umpPlayer: null,
  seekingTime: '',
};

TilePlaybackContainer.propTypes = {
  render: PropTypes.func.isRequired,
  playMode: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  channel: PropTypes.number,
  // overlappedId: PropTypes.number,
  playSpeed: PropTypes.number,
  umpPlayer: PropTypes.oneOfType([PropTypes.any]),
  seekingTime: PropTypes.string,
};

export default TilePlaybackContainer;

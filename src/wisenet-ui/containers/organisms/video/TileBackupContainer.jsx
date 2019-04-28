import React from 'react';
import PropTypes from 'prop-types';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';

class TileBackupContainer extends React.Component {
  currentPercent = '0';

  // componentDidMount에서 ump-player가 등록된지 여부를 알수 없기 때문에 사용
  startBackup = false;

  load = false;

  state = {
    mode: umpPlayMode.BACKUP,
    className: 'noneDisplay',
    umpPlayer: null,
  }

  componentDidUpdate(prevProps) {
    const { backup: prevBackup } = prevProps;
    const { backup } = this.props;
    const { umpPlayer: prevUmpPlayer } = prevProps;
    const { umpPlayer } = this.state;

    if (!this.load && (prevUmpPlayer !== umpPlayer)) {
      this.load = true;
      this.backup();
    }

    if (this.load && umpPlayer) {
      if (prevBackup !== backup) {
        this.backup();
      }
    }
  }

  setUmpPlayer = ump => {
    const umpPlayer = ump;

    this.setState({
      umpPlayer,
    });
  };

  backup = () => {
    const {
      startTime,
      endTime,
      backup,
      fileName,
    } = this.props;

    const { umpPlayer } = this.state;

    if (backup) {
      umpPlayer.startTime = startTime;
      umpPlayer.endTime = endTime;
      umpPlayer.filename = fileName;
      umpPlayer.backup(true);
    }

    if (this.startBackup) {
      umpPlayer.backup(false);
    }
  }

  onBackupState = event => {
    const {
      onBackup,
      channel,
      onBackupState,
    } = this.props;
    onBackupState(event);

    switch (event.detail.state) {
      case 0x0600: // backup Start
      case 0x0601: { // backup Stop
        const startBackup = event.detail.state === 0x0600;
        if (this.startBackup !== startBackup) {
          this.startBackup = startBackup;
          onBackup({
            type: startBackup ? 'start' : 'end',
            channel,
          });
        }
        break;
      }
      case 0x0602: { // backup error
        this.startBackup = false;
        onBackup({
          type: 'error',
          channel,
          event,
        });
        break;
      }
      default:
        break;
    }
  };

  onTimestamp = event => {
    const { startTime, endTime } = this.props;
    const end = new Date(endTime);
    const start = new Date(startTime);
    const current = new Date(event.detail.timestamp);
    const percent = ((current - start) / (end - start) * 100).toFixed(2);

    if (this.currentPercent !== percent) {
      const { onBackup, channel } = this.props;
      onBackup({
        type: 'progress',
        channel,
        percent,
      });
      this.currentPercent = percent;
    }
  }

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this.props,
        ...this.state,
        ...this,
      },
    );
  }
}

TileBackupContainer.defaultProps = {
  umpPlayer: null,
  onBackup: () => {},
  onBackupState: () => {},
  fileName: '',
};

TileBackupContainer.propTypes = {
  render: PropTypes.func.isRequired,
  umpPlayer: PropTypes.oneOfType([PropTypes.any]),
  backup: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onBackup: PropTypes.func,
  onBackupState: PropTypes.func,
  fileName: PropTypes.string,
  channel: PropTypes.number.isRequired,
};

export default TileBackupContainer;

import React from 'react';
import PropTypes from 'prop-types';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import UmpInfomationType from 'wisenet-ui/util/static/constants/umpPlayer/umpInfomationType';

class TileLiveContainer extends React.Component {
  state = {
    mode: umpPlayMode.LIVE,
    isBackup: false,
  }

  handleFunctionMode = {};

  componentDidMount() {
    this.handleFunctionMode = {
      [UmpInfomationType.PC_RECORD]: this.pcRecordFunc,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      umpPlayer: prevUmpPlayer,
      tileControlWork: prevTileControlWork,
    } = prevProps;
    const { umpPlayer, tileControlWork } = this.props;

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

    if (prevUmpPlayer === null && umpPlayer !== null) {
      umpPlayer.play();
    }
  }

  pcRecordFunc = () => {
    const { umpPlayer } = this.props;
    if (umpPlayer) {
      const { fileName, pcRecord } = this.props;
      if (!pcRecord) {
        umpPlayer.backup(!pcRecord, fileName);
      }
      umpPlayer.backup(!pcRecord);
    }
  }

  onBackupState = event => {
    const { onBackupState, onTileInfo } = this.props;
    onBackupState(event);

    if (onTileInfo) {
      switch (event.detail.state) {
        case 0x0600: // backup Start
        case 0x0601: { // backup Stop
          onTileInfo(UmpInfomationType.PC_RECORD)({
            onData: {
              [UmpInfomationType.PC_RECORD]: event.detail.state === 0x0600,
            },
            ...this.props,
          });
          break;
        }
        case 0x0602: { // backup error
          onTileInfo(UmpInfomationType.PC_RECORD)({
            onData: {
              [UmpInfomationType.PC_RECORD]: false,
              error: event,
            },
            ...this.props,
          });
          break;
        }
        default:
          break;
      }
    }
  };

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

TileLiveContainer.defaultProps = {
  umpPlayer: null,
  onBackupState: () => {},
  onTileInfo: () => (() => {}),
  tileControlWork: {},
  fileName: 'none',
  pcRecord: false,
};

TileLiveContainer.propTypes = {
  render: PropTypes.func.isRequired,
  umpPlayer: PropTypes.oneOfType([PropTypes.any]),
  onBackupState: PropTypes.func,
  onTileInfo: PropTypes.func, // ump로 얻어야 하는 데이터를 올리는 콜백함수
  tileControlWork: PropTypes.shape({
    [UmpInfomationType.PC_RECORD]: PropTypes.bool,
  }),
  fileName: PropTypes.string,
  pcRecord: PropTypes.bool,
};

export default TileLiveContainer;

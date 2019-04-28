import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MediaControlIDList } from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import { LiveMediaControlActions, MediaControlActions, LayoutActions } from 'store/actionCreators';
import { List } from 'immutable';

class LiveMediaControlBarContainer extends React.Component {
  state = {
    recordState: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }
    return true;
  }

  onClick = type => event => {
    const { recordState } = this.state;
    // const { cameraList } = this.props;
    switch (type) {
      case MediaControlIDList.RECORD:
        // console.log('@@@@@@@@@@@@ NVR RECORD');
        // console.log('cameraList :', cameraList.toJS());
        if (recordState) {
          LiveMediaControlActions.manualRecordingStop();
          this.setState({ recordState: false });
        } else {
          LiveMediaControlActions.manualRecordingStart();
          this.setState({ recordState: true });
        }
        break;
      case MediaControlIDList.EXPORT:
        break;
      case MediaControlIDList.SOUND:
        break;
      case MediaControlIDList.ALARM:
        LiveMediaControlActions.alarmStop();
        break;
      case MediaControlIDList.OSD:
        LiveMediaControlActions.OSDDisplayControl();
        break;
      case MediaControlIDList.CH_INFO:
        LiveMediaControlActions.channelInfoVisibleControl();
        break;
      case MediaControlIDList.STATUS:
        break;
      case MediaControlIDList.LAYOUT_PAGE_LEFT: {
        const { layoutPageCurrentNumber } = this.props;
        if (layoutPageCurrentNumber > 1) {
          LiveMediaControlActions.setLayoutPageCurrentNumber({
            layoutPageCurrentNumber: layoutPageCurrentNumber - 1,
          });
        }
        break;
      }
      case MediaControlIDList.LAYOUT_PAGE_INPUT: {
        const value = Number(event.target.value);
        const { layoutPageMaxNumber } = this.props;
        if (value >= 1 && value <= layoutPageMaxNumber) {
          LiveMediaControlActions.setLayoutPageCurrentNumber({
            layoutPageCurrentNumber: value,
          });
        }
        break;
      }
      case MediaControlIDList.LAYOUT_PAGE_RIGHT: {
        const { layoutPageCurrentNumber, layoutPageMaxNumber } = this.props;
        if (layoutPageCurrentNumber < layoutPageMaxNumber) {
          LiveMediaControlActions.setLayoutPageCurrentNumber({
            layoutPageCurrentNumber: layoutPageCurrentNumber + 1,
          });
        }
        break;
      }
      case MediaControlIDList.PATTERN: {
        const pattern = event.target.value;
        LiveMediaControlActions.patternControl({ pattern });
        break;
      }
      case MediaControlIDList.ASPECT_RATIO: {
        const { tileCameraList } = this.props;
        if (tileCameraList.size !== 0) {
          MediaControlActions.aspectRatioAllControl({ tileCameraList });
        }
        break;
      }
      case MediaControlIDList.FULLSCREEN:
        LayoutActions.fullscreenModeChange(true);
        break;
      default:
        break;
    }
  };

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

LiveMediaControlBarContainer.propTypes = {
  render: PropTypes.func.isRequired,
  tileCameraList: PropTypes.instanceOf(List).isRequired,
  layoutPageCurrentNumber: PropTypes.number.isRequired,
  layoutPageMaxNumber: PropTypes.number.isRequired,
  // cameraList: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  state => {
    const { currentNumber: layoutPageCurrentNumber } = state.liveMediaControlModule.get('layoutPageInfo').toJS();
    return ({
      tileCameraList: state.cameraInfoModule.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`),
      layoutPageCurrentNumber: state.liveMediaControlModule.get('layoutPageInfo').get('currentNumber'),
      layoutPageMaxNumber: state.liveMediaControlModule.get('layoutPageInfo').get('maxNumber'),
      // cameraList: state.cameraInfoModule.get('cameraList'),
    });
  },
)(LiveMediaControlBarContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CameraInfoActions } from 'store/actionCreators';

class LiveVideoTileBarContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false;
    }
    return true;
  }

  checkIVADetection = () => {
    const { videoAnalytics } = this.props;
    const keys = Object.keys(videoAnalytics);
    let result = false;
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (videoAnalytics[key]) {
        result = true;
        break;
      }
    }
    return result;
  }

  onDeleteTile = () => {
    const { uid, layoutPageCurrentNumber } = this.props;
    CameraInfoActions.deleteTile({ uid, layoutPageCurrentNumber });
  }

  render() {
    const { render } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        ivaDetection: this.checkIVADetection(),
      },
    );
  }
}

LiveVideoTileBarContainer.propTypes = {
  render: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  // channel Event
  // AMDStart: PropTypes.bool,
  // audioAnalytics: {
  //   scream: PropTypes.bool,
  //   gunshot: PropTypes.bool,
  //   explosion: PropTypes.bool,
  //   glassBreak: PropTypes.bool,
  // },
  // audioDetection: PropTypes.bool,
  // defocusDetection: PropTypes.bool,
  // faceDetection: PropTypes.bool,
  // fogDetection: PropTypes.bool,
  // lowFps: PropTypes.bool,
  // motionDetection: PropTypes.bool,
  // networkAlarmInput: PropTypes.bool,
  // networkCameraConnect: PropTypes.bool,
  // sdFail: PropTypes.bool,
  // sdFull: PropTypes.bool,
  // tampering: PropTypes.bool,
  // tracking: PropTypes.bool,
  videoAnalytics: PropTypes.shape({
    appearing: PropTypes.bool,
    disappearing: PropTypes.bool,
    entering: PropTypes.bool,
    exiting: PropTypes.bool,
    intrusion: PropTypes.bool,
    loitering: PropTypes.bool,
    passing: PropTypes.bool,
  }).isRequired,
  layoutPageCurrentNumber: PropTypes.number.isRequired,
};

export default connect(
  (state, props) => ({
    ...state.cameraInfoModule.get('cameraEventList').find(camera => camera.get('channel') === props.channel).toJS(),
    layoutPageCurrentNumber: state.liveMediaControlModule.get('layoutPageInfo').get('currentNumber'),
  }),
)(LiveVideoTileBarContainer);

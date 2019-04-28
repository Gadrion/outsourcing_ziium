import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';

class PTZSwingContainer extends React.Component {
  state = {
    currentSwing: 0,
    currentMode: 'Stop',
  };

  componentWillReceiveProps(nextProps) {
    const { currentChannel } = nextProps;
    const { prevChannel } = this.props;
    if (currentChannel !== -1) {
      const { swingList, attributes, attributesLoaded } = nextProps;
      if ((swingList === null || prevChannel !== currentChannel)
        && (attributesLoaded && attributes.SwingSupportByChannel[currentChannel])) {
        // PTZSequenceActions.setSwingPending(true);
        const getData = {
          Channel: currentChannel,
        };
        PTZSequenceActions.getSwing(getData);

        PTZSequenceActions.setPrevChannel(currentChannel);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    const { currentChannel, attributesLoaded, attributes } = nextProps;

    if (!attributesLoaded) {
      document.getElementById('swing_disable_mask').style.display = 'block';
      document.getElementById('swing_wrapper').style.pointerEvents = 'none';
    } else if (typeof attributes.SwingSupportByChannel !== 'undefined'
      && attributes.SwingSupportByChannel[currentChannel] === true) {
      document.getElementById('swing_disable_mask').style.display = 'none';
      document.getElementById('swing_wrapper').style.pointerEvents = 'auto';
    } else {
      document.getElementById('swing_disable_mask').style.display = 'block';
      document.getElementById('swing_wrapper').style.pointerEvents = 'none';
    }

    return true;
  }

  controlSwing = option => {
    const { currentChannel } = this.props;
    const { currentSwing, currentMode } = this.state;
    const getData = {
      Channel: currentChannel,
    };

    if (currentSwing !== option.id) {
      getData.Mode = option.mode;
    } else if (currentMode !== 'Stop') {
      getData.Mode = 'Stop';
    } else {
      getData.Mode = option.mode;
    }

    PTZSequenceActions.controlSwing(getData);

    this.setState({
      currentMode: getData.Mode,
      currentSwing: option.id,
    });
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

PTZSwingContainer.propTypes = {
  render: PropTypes.func.isRequired,
  swingList: PropTypes.arrayOf(Object),
  currentChannel: PropTypes.number,
  prevChannel: PropTypes.number,
  attributesLoaded: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
};

PTZSwingContainer.defaultProps = {
  swingList: [],
  currentChannel: -1,
  prevChannel: -1,
  attributesLoaded: false,
  attributes: {},
};

export default connect(
  state => ({
    isSwingPending: state.ptzSequenceModule.get('isSwingPending'),
    swingList: state.ptzSequenceModule.get('swingList'),
    lang: state.langModule.get('lang'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
    prevChannel: state.ptzSequenceModule.get('prevChannel'),
  }),
)(PTZSwingContainer);

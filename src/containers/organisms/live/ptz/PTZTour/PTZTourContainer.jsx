import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';

class PTZTourContainer extends React.Component {
  state = {
    currentTour: 0,
    isOn: false,
  };

  componentWillReceiveProps(nextProps) {
    const { currentChannel } = nextProps;
    const { prevChannel } = this.props;
    if (currentChannel !== -1) {
      const { tourList, attributes, attributesLoaded } = nextProps;
      if ((tourList === null || prevChannel !== currentChannel)
        && (attributesLoaded && attributes.TourSupportByChannel[currentChannel])) {
        // PTZSequenceActions.setTourPending(true);
        const getData = {
          Channel: currentChannel,
        };

        PTZSequenceActions.getTour(getData);

        PTZSequenceActions.setPrevChannel(currentChannel);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    const { currentChannel, attributesLoaded, attributes } = nextProps;

    if (!attributesLoaded) {
      document.getElementById('tour_disable_mask').style.display = 'block';
      document.getElementById('tour_wrapper').style.pointerEvents = 'none';
    } else if (typeof attributes.TourSupportByChannel !== 'undefined'
      && attributes.TourSupportByChannel[currentChannel] === true) {
      document.getElementById('tour_disable_mask').style.display = 'none';
      document.getElementById('tour_wrapper').style.pointerEvents = 'auto';
    } else {
      document.getElementById('tour_disable_mask').style.display = 'block';
      document.getElementById('tour_wrapper').style.pointerEvents = 'none';
    }

    return true;
  }

  controlTour = option => {
    const { currentChannel } = this.props;
    const { currentTour, isOn } = this.state;
    const getData = {
      Channel: currentChannel,
    };

    if (currentTour !== option.id) {
      getData.Tour = option.id;
      getData.Mode = 'Start';
    } else if (isOn) {
      getData.Tour = option.id;
      getData.Mode = 'Stop';
    }

    PTZSequenceActions.controlTour(getData);

    this.setState({
      currentTour: option.id,
      isOn: !isOn,
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

PTZTourContainer.propTypes = {
  render: PropTypes.func.isRequired,
  tourList: PropTypes.arrayOf(Object),
  currentChannel: PropTypes.number,
  prevChannel: PropTypes.number,
  attributesLoaded: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
};

PTZTourContainer.defaultProps = {
  tourList: [],
  currentChannel: -1,
  prevChannel: -1,
  attributesLoaded: false,
  attributes: {},
};

export default connect(
  state => ({
    isTourPending: state.ptzSequenceModule.get('isTourPending'),
    tourList: state.ptzSequenceModule.get('tourList'),
    lang: state.langModule.get('lang'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
    prevChannel: state.ptzSequenceModule.get('prevChannel'),
  }),
)(PTZTourContainer);

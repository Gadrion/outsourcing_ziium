import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';

class PTZTraceContainer extends React.Component {
  state = {
    currentTrace: 0,
    isOn: false,
  };

  componentWillReceiveProps(nextProps) {
    const { currentChannel } = nextProps;
    const { prevChannel } = this.props;
    if (currentChannel !== -1) {
      const { traceList, attributes, attributesLoaded } = nextProps;
      if ((traceList === null || prevChannel !== currentChannel)
        && (attributesLoaded && attributes.TraceSupportByChannel[currentChannel])) {
        // PTZSequenceActions.setTracePending(true);
        const getData = {
          Channel: currentChannel,
        };

        PTZSequenceActions.getTrace(getData);

        PTZSequenceActions.setPrevChannel(currentChannel);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    const { currentChannel, attributesLoaded, attributes } = nextProps;

    if (!attributesLoaded) {
      document.getElementById('trace_disable_mask').style.display = 'block';
      document.getElementById('trace_wrapper').style.pointerEvents = 'none';
    } else if (typeof attributes.TraceSupportByChannel !== 'undefined'
      && attributes.TraceSupportByChannel[currentChannel] === true) {
      document.getElementById('trace_disable_mask').style.display = 'none';
      document.getElementById('trace_wrapper').style.pointerEvents = 'auto';
    } else {
      document.getElementById('trace_disable_mask').style.display = 'block';
      document.getElementById('trace_wrapper').style.pointerEvents = 'none';
    }

    return true;
  }

  controlTrace = option => {
    const { currentChannel } = this.props;
    const { currentTrace, isOn } = this.state;
    const getData = {
      Channel: currentChannel,
    };

    if (currentTrace !== option.id) {
      getData.Trace = option.id;
      getData.Mode = 'Start';
    } else if (isOn) {
      getData.Trace = option.id;
      getData.Mode = 'Stop';
    }

    PTZSequenceActions.controlTrace(getData);

    this.setState({
      currentGroup: option.id,
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

PTZTraceContainer.propTypes = {
  render: PropTypes.func.isRequired,
  traceList: PropTypes.arrayOf(Object),
  currentChannel: PropTypes.number,
  prevChannel: PropTypes.number,
  attributesLoaded: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
};

PTZTraceContainer.defaultProps = {
  traceList: [],
  currentChannel: -1,
  prevChannel: -1,
  attributesLoaded: false,
  attributes: {},
};

export default connect(
  state => ({
    isTracePending: state.ptzSequenceModule.get('isTracePending'),
    traceList: state.ptzSequenceModule.get('traceList'),
    lang: state.langModule.get('lang'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
    prevChannel: state.ptzSequenceModule.get('prevChannel'),
  }),
)(PTZTraceContainer);

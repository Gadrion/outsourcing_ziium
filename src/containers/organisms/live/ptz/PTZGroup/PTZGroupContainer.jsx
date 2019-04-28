import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PTZSequenceActions } from 'store/actionCreators';

class PTZGroupContainer extends React.Component {
  state = {
    currentGroup: 0,
    isOn: false,
  };

  componentWillReceiveProps(nextProps) {
    const { currentChannel } = nextProps;
    const { prevChannel } = this.props;
    if (currentChannel !== -1) {
      const { groupList, attributes, attributesLoaded } = nextProps;
      if ((groupList === null || prevChannel !== currentChannel)
        && (attributesLoaded && attributes.GroupSupportByChannel[currentChannel])) {
        // PTZSequenceActions.setGroupPending(true);
        const getData = {
          Channel: currentChannel,
        };

        PTZSequenceActions.getGroup(getData);

        PTZSequenceActions.setPrevChannel(currentChannel);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    const { currentChannel, attributesLoaded, attributes } = nextProps;

    if (!attributesLoaded) {
      document.getElementById('group_disable_mask').style.display = 'block';
      document.getElementById('group_wrapper').style.pointerEvents = 'none';
    } else if (typeof attributes.GroupSupportByChannel !== 'undefined'
      && attributes.GroupSupportByChannel[currentChannel] === true) {
      document.getElementById('group_disable_mask').style.display = 'none';
      document.getElementById('group_wrapper').style.pointerEvents = 'auto';
    } else {
      document.getElementById('group_disable_mask').style.display = 'block';
      document.getElementById('group_wrapper').style.pointerEvents = 'none';
    }

    return true;
  }

  controlGroup = option => {
    const { currentChannel } = this.props;
    const { currentGroup, isOn } = this.state;
    const getData = {
      Channel: currentChannel,
    };

    if (currentGroup !== option.id) {
      getData.Group = option.id;
      getData.Mode = 'Start';
    } else if (isOn) {
      getData.Group = option.id;
      getData.Mode = 'Stop';
    }

    PTZSequenceActions.controlGroup(getData);

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

PTZGroupContainer.propTypes = {
  render: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(Object),
  currentChannel: PropTypes.number,
  prevChannel: PropTypes.number,
  attributesLoaded: PropTypes.bool,
  attributes: PropTypes.instanceOf(Object),
};

PTZGroupContainer.defaultProps = {
  groupList: [],
  currentChannel: -1,
  prevChannel: -1,
  attributesLoaded: false,
  attributes: {},
};

export default connect(
  state => ({
    isGroupPending: state.ptzSequenceModule.get('isGroupPending'),
    groupList: state.ptzSequenceModule.get('groupList'),
    lang: state.langModule.get('lang'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
    prevChannel: state.ptzSequenceModule.get('prevChannel'),
  }),
)(PTZGroupContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TargetDeviceContainer extends React.Component {
  render() {
    const { render } = this.props;

    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

TargetDeviceContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    overlappedIDList: state.searchTimelineModule.get('overlappedIDList'),
    timeLineSearchResults: state.searchTimelineModule.get('timeLineSearchResults'),
    calenderSearchResults: state.eventSearchModule.get('calenderSearchResults'),
  }),
)(TargetDeviceContainer);

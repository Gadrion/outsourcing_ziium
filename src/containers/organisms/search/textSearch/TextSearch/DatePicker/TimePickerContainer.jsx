import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextSearchActions } from 'store/actionCreators';

class TimePickerContainer extends React.Component {
  onTimeChange = time => {
    TextSearchActions.setSearchTime(time);
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

TimePickerContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(TimePickerContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextSearchActions } from 'store/actionCreators';

class DatePickerContainer extends React.Component {
  onDateChange = date => {
    TextSearchActions.setSearchDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
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

DatePickerContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(DatePickerContainer);

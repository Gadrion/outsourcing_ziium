import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextSearchActions } from 'store/actionCreators';

class DateTimeSubmitterContainer extends React.Component {
  onApply = () => {
    const { flag } = this.props;
    TextSearchActions.applySearchDateTime(flag);
    if (document.getElementById('start-date-picker-popper')) {
      document.getElementById('start-date-picker-popper').style.display = 'none';
    } else {
      document.getElementById('end-date-picker-popper').style.display = 'none';
    }
  }

  onCancel = () => {
    if (document.getElementById('start-date-picker-popper')) {
      document.getElementById('start-date-picker-popper').style.display = 'none';
    } else {
      document.getElementById('end-date-picker-popper').style.display = 'none';
    }
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

DateTimeSubmitterContainer.propTypes = {
  render: PropTypes.func.isRequired,
  flag: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(DateTimeSubmitterContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EventSearchTabContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

EventSearchTabContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(EventSearchTabContainer);

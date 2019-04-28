import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class SchedulerExamplePageContainer extends React.Component {
  componentDidMount() {

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

SchedulerExamplePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default SchedulerExamplePageContainer;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AlarmCenterContainer extends React.Component {
  componentDidUpdate() {}

  render() {
    const { render } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

AlarmCenterContainer.defaultProps = {
  attributes: {},
};

AlarmCenterContainer.propTypes = {
  render: PropTypes.func.isRequired,
  attributes: PropTypes.shape({
    Ready: PropTypes.bool,
    ModelName: PropTypes.string,
  }),
};

export default connect(
  state => ({
    systemEvent: state.systemInfomationModule.get('systemEvent'),
  }),
)(AlarmCenterContainer);

import React from 'react';
import PropTypes from 'prop-types';

class DevicePageContainer extends React.Component {
  handleChange = event => {
    console.log('event', event);
  }

  render() {
    const {
      render,
    } = this.props;


    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

DevicePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default DevicePageContainer;

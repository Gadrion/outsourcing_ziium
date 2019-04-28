import React from 'react';
import PropTypes from 'prop-types';
import setupMenu from 'util/static/constants/setupMenu.js';

class SetupPageContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
      setupMenu,
    });
  }
}

SetupPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default SetupPageContainer;

import React from 'react';
import PropTypes from 'prop-types';

class HelpPageContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

HelpPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default HelpPageContainer;

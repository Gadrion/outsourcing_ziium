import React from 'react';
import PropTypes from 'prop-types';

class IvaPageContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render();
  }
}

IvaPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default IvaPageContainer;

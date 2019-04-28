import React from 'react';
import PropTypes from 'prop-types';

class TileBarPageContainer extends React.Component {
  handleChange = event => {
    console.log('event', event);
  }

  render() {
    const { render } = this.props;

    return render({
      ...this,
      ...this.props,
      ...this.state,
    });
  }
}

TileBarPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TileBarPageContainer;

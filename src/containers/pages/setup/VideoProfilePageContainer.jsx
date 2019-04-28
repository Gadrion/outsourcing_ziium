import React from 'react';
import PropTypes from 'prop-types';

class VideoProfilePageContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

VideoProfilePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default VideoProfilePageContainer;

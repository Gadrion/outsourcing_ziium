import React from 'react';
import PropTypes from 'prop-types';
// import { TextSearchContainerActions } from 'store/actionCreators';

class TextSearchTabContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

TextSearchTabContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TextSearchTabContainer;

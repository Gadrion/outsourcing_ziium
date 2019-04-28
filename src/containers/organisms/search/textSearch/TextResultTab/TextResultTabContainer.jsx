import React from 'react';
import PropTypes from 'prop-types';
// import { TextSearchContainerActions } from 'store/actionCreators';

class TextResultTabContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

TextResultTabContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TextResultTabContainer;

import React from 'react';
import PropTypes from 'prop-types';

class SketchbookContainer extends React.Component {
  state = {
  }

  clickCount = 0;

  componentDidMount() {
    console.log('load sketchbook container');
  }

  onMouseDown = () => {
  };

  onMouseMove = () => {
  };

  onMouseUp = () => {
  };

  onWheel = () => {
  };

  onMouseOver = () => {
  };

  onMouseOut = () => {
  };

  onContextMenu = () => {
  }

  onFocus = () => null;

  onBlur = () => null;

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

SketchbookContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default SketchbookContainer;

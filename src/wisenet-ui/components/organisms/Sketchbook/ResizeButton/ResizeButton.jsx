import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class ResizeButton extends React.Component {
  state = {
    isHighlight: false,
  };

  onMouseOver = () => {
    this.setState({
      isHighlight: true,
    });
  }

  onMouseLeave = () => {
    this.setState({
      isHighlight: false,
    });
  }

  onFocus = () => {

  }

  render() {
    const {
      locX,
      locY,
      size,
      onMouseDown,
      onMouseUp,
    } = this.props;

    const { isHighlight } = this.state;
    let stroke;
    if (isHighlight === true) {
      stroke = '#282828';
    } else {
      stroke = '#484848';
    }
    // const StyledPolyline = styled('polyline')`
    //   fill: transparent;
    //   stroke-width: 3;
    //   stroke: ${stroke};
    // `;
    const points = `${locX},${locY - size} ${locX},${locY} ${locX - size},${locY}`;
    return (
      <polyline
        id="resize-button"
        points={points}
        fill="transparent"
        stroke={stroke}
        strokeWidth="3"
        onMouseOver={this.onMouseOver}
        onFocus={this.onFocus}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );
  }
}

ResizeButton.propTypes = {
  locX: PropTypes.number.isRequired,
  locY: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
};

ResizeButton.defaultProps = {
  onMouseDown: null,
  onMouseUp: null,
};

export default ResizeButton;

import React from 'react';
import PropTypes from 'prop-types';

class AimEdge extends React.Component {
  state = {

  };

  render() {
    const {
      locX,
      locY,
      width,
      height,
      style,
    } = this.props;

    let edgeSize = 16;
    const startX = locX; // ${startX}
    const startY = locY;
    const endX = locX + width;
    const endY = locY + height;

    if (width < 30 || height < 30) {
      edgeSize = 10;
    }

    return (
      <path
        d={`M${startX},${startY + edgeSize} L${startX},${startY} L${startX + edgeSize},${startY}
            M${endX - edgeSize},${startY} L${endX},${startY} L${endX},${startY + edgeSize}
            M${startX},${endY - edgeSize} L${startX},${endY} L${startX + edgeSize},${endY}
            M${endX - edgeSize},${endY} L${endX},${endY} L${endX},${endY - edgeSize}`}
        style={style}
      />

    );
  }
}

AimEdge.propTypes = {
  locX: PropTypes.number.isRequired,
  locY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.shape({
    stroke: PropTypes.string,
    fill: PropTypes.string,
    strokeWidth: PropTypes.number,
  }),
};

AimEdge.defaultProps = {
  style: {
    stroke: PropTypes.bool,
    fill: PropTypes.string,
    strokeWidth: PropTypes.number,
  },
};

export default AimEdge;

import React from 'react';
import PropTypes from 'prop-types';

class Aim extends React.Component {
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

    const aimSize = 15;
    const startX = locX; // ${startX}
    const startY = locY;
    const endX = locX + width;
    const endY = locY + height;

    return (
      <path
        d={`M${startX},${startY + aimSize} L${startX},${startY} L${startX + aimSize},${startY}
            M${endX - aimSize},${startY} L${endX},${startY} L${endX},${startY + aimSize}
            M${startX},${endY - aimSize} L${startX},${endY} L${startX + aimSize},${endY}
            M${endX - aimSize},${endY} L${endX},${endY} L${endX},${endY - aimSize}`}
        style={style}
      />

    );
  }
}

Aim.propTypes = {
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

Aim.defaultProps = {
  style: {
    stroke: PropTypes.bool,
    fill: PropTypes.string,
    strokeWidth: PropTypes.number,
  },
};

export default Aim;

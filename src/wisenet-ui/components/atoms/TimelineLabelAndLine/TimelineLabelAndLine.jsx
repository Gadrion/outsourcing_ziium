import React from 'react';
import PropTypes from 'prop-types';
import TimelineLabelAndLineStyled from './TimelineLabelAndLineStyled';

const TimelineLabelAndLine = ({
  label,
  left,
}) => (
  <TimelineLabelAndLineStyled label={label} left={left} />
);

TimelineLabelAndLine.defaultProps = {
  label: null,
  left: 0,
};

TimelineLabelAndLine.propTypes = {
  label: PropTypes.string,
  left: PropTypes.number,
};

export default TimelineLabelAndLine;

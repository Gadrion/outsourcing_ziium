import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Slider from 'rc-slider';
import { WrapperStyled, SliderWrapperStyled } from './ToggleStyled';
import 'rc-slider/assets/index.css';

const Toggle = ({
  theme,
  className,
  handleStyle,
  railStyle,
  trackStyle,
  disableTooltip,
  vertical,
  leftButton,
  rightButton,
  topButton,
  bottomButton,
  value,
  handleText,
  ...rest
}) => {
  const attrs = {
    vertical,
    handleStyle: {
      backgroundColor: '#fff',
      border: '1px solid #797979',
      height: 23,
      width: 23,
      marginLeft: value === 0 ? 0 : -22,
      marginTop: -4,
      cursor: 'pointer',
      ...handleStyle,
    },
    trackStyle: {
      backgroundColor: '#d2d2d2',
      height: 14,
      width: null,
      cursor: 'pointer',
      ...trackStyle,
    },
    railStyle: {
      backgroundColor: '#d2d2d2',
      height: 14,
      width: null,
      cursor: 'pointer',
      ...railStyle,
    },
    ...rest,
  };
  return (
    <WrapperStyled
      className={className}
    >
      <SliderWrapperStyled
        value={value}
        handleText={handleText}
      >
        <Slider min={0} max={1} value={value} {...attrs} />
      </SliderWrapperStyled>
    </WrapperStyled>
  );
};

Toggle.defaultProps = {
  className: null,
  handleStyle: null,
  railStyle: null,
  trackStyle: null,
  disableTooltip: false,
  vertical: false,
  leftButton: null,
  rightButton: null,
  topButton: null,
  bottomButton: null,
  theme: null,
  handleText: null,
};

Toggle.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  handleStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  railStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  trackStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  disableTooltip: PropTypes.bool,
  vertical: PropTypes.bool,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
  topButton: PropTypes.node,
  bottomButton: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.any]),
  value: PropTypes.number.isRequired,
  handleText: PropTypes.oneOfType([PropTypes.array]),
};

export default withTheme(Toggle);

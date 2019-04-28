import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTheme } from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import { WrapperStyled, ButtonStyled, SliderWrapperStyled } from './SliderStyled';
import 'rc-slider/assets/index.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const WisenetSlider = ({
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
  ...rest
}) => {
  const attrs = {
    vertical,
    handleStyle: {
      backgroundColor: theme.colorPoint1,
      borderColor: theme.colorPoint1,
      height: 16,
      width: 16,
      marginLeft: -7,
      marginTop: -7,
      ...handleStyle,
    },
    trackStyle: {
      backgroundColor: theme.colorPoint1,
      height: vertical ? null : 2,
      width: vertical ? 2 : null,
      ...trackStyle,
    },
    railStyle: {
      backgroundColor: theme.colorSub5,
      height: vertical ? null : 2,
      width: vertical ? 2 : null,
      ...railStyle,
    },
    ...rest,
  };

  return (
    <WrapperStyled
      className={`
        ${classNames({ vertical })}
        ${className}
      `}
    >
      <ButtonStyled className={
        classNames({
          leftButton,
          topButton,
        })}
      >
        {leftButton || topButton}
      </ButtonStyled>
      <SliderWrapperStyled>
        {disableTooltip ? <Slider {...attrs} /> : <SliderWithTooltip {...attrs} />}
      </SliderWrapperStyled>
      <ButtonStyled className={
        classNames({
          rightButton,
          bottomButton,
        })}
      >
        {rightButton || bottomButton}
      </ButtonStyled>
    </WrapperStyled>
  );
};

WisenetSlider.defaultProps = {
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
};

WisenetSlider.propTypes = {
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
};

export default withTheme(WisenetSlider);

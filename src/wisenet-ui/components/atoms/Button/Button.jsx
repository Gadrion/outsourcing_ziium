import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Ripple } from 'wisenet-ui/components/effects';
import ButtonStyled from './ButtonStyled';

const Button = ({
  children,
  className,
  onClick,
  disabled,
  disableRipple,
  point,
  ...rest
}) => (
  <ButtonStyled
    className={`
      ${
        classNames({
          point,
          disabled,
        })
      }
      ${className}
    `}
    onClick={disabled ? undefined : onClick}
    {...rest}
  >
    <Ripple disabled={(disabled || disableRipple)}>
      {children}
    </Ripple>
  </ButtonStyled>
);

Button.defaultProps = {
  children: null,
  className: null,
  onClick: () => {},
  disabled: false,
  disableRipple: false,
  point: false,
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  disableRipple: PropTypes.bool,
  point: PropTypes.bool,
};

export default Button;

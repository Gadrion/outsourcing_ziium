import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconButtonStyled from './IconButtonStyled';

const IconButton = ({
  children,
  className,
  onClick,
  disabled,
  border,
  ...rest
}) => (
  <IconButtonStyled
    className={`
      ${
        classNames({
          disabled,
          border,
        })
      } 
      ${className}
    `}
    onClick={disabled ? undefined : onClick}
    {...rest}
  >
    {children}
  </IconButtonStyled>
);

IconButton.defaultProps = {
  children: null,
  className: null,
  onClick: () => {},
  disabled: false,
  border: false,
};

IconButton.propTypes = {
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
  border: PropTypes.bool,
};

export default IconButton;

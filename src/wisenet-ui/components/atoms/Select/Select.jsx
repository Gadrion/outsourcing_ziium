import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectStyled from './SelectStyled';

const Select = ({
  children,
  className,
  disabled,
  ...rest
}) => (
  <SelectStyled
    className={`
      ${classNames({ disabled })}
      ${className}
    `}
    {...rest}
  >
    {children}
  </SelectStyled>
);

Select.defaultProps = {
  disabled: false,
  className: null,
};

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
};

export default Select;

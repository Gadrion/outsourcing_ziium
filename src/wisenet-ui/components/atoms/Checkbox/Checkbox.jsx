import React from 'react';
import PropTypes from 'prop-types';
import CheckboxWrapperStyled from './CheckboxStyled';

const Checkbox = ({
  onChange,
  disabled,
  checked,
  children,
  ...rest
}) => (
  <CheckboxWrapperStyled {...rest}>
    <input
      type="checkbox"
      checked={checked}
      onChange={disabled ? undefined : onChange}
      {...children}
    />
    <span />
  </CheckboxWrapperStyled>
);

Checkbox.defaultProps = {
  onChange: () => {},
  disabled: false,
  checked: false,
  children: '',
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default Checkbox;

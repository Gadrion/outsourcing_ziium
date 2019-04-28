import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxGroupStyled } from './CheckInputStyled';

const CheckInput = props => {
  const {
    children,
    checked,
    index,
    additional,
    ...rest
  } = props;
  return (
    <CheckboxGroupStyled>
      <input
        key={index}
        checked={checked}
        {...rest}
      />
      {children}
      {additional}
    </CheckboxGroupStyled>
  );
};

CheckInput.defaultProps = {
  children: '',
  name: '',
  checked: false,
  index: 0,
  additional: '',
};

CheckInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  name: PropTypes.string,
  checked: PropTypes.bool,
  // onChange: PropTypes.func.isRequired,
  // icon: PropTypes.string.isRequired,
  index: PropTypes.number,
  additional: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
};

export default CheckInput;

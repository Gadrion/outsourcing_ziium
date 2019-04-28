import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({
  name, value, checked, label, onChange,
}) => {
  const handleChange = e => (
    onChange(e)
  );
  return (
    <div>
      <label htmlFor="radio">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        {name}
      </label>
    </div>
  );
};


Radio.defaultProps = {
  name: '',
  value: '',
  checked: false,
  label: '',
  onChange: undefined,
};

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default Radio;

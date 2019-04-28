import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'wisenet-ui/components/atoms';

const RadioGroup = ({ inputs, selected, onChange }) => (
  <div>
    {inputs.map(([text, value]) => (
      <div>
        <Radio
          name={text}
          checked={selected === value}
          onChange={onChange}
          value={value}
        />
      </div>
    ))
    }
  </div>
);


RadioGroup.defaultProps = {
  inputs: [],
  selected: false,
  onChange: undefined,
};

RadioGroup.propTypes = {
  inputs: PropTypes.arrayOf,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioGroup;

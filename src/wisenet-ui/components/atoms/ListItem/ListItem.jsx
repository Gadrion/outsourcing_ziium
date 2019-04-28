import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ index, onChange, ...rest }) => {
  const handleChange = () => {
    onChange({ index, key: rest.children.key });
  };

  return (
    <div key={rest.children.key || `'listitem'+${index}`} onClick={handleChange}>
      {rest.children}
    </div>
  );
};

ListItem.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListItem;

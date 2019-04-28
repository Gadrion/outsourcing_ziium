import React from 'react';
import PropTypes from 'prop-types';
import ListSelectStyled from './ListSelectStyled';

const ListSelect = ({
  listData,
  insertKey,
  ...rest
}) => {
  const options = listData.map(data => (
    <option
      key={`${data}`}
      value={data}
    >
      {insertKey ? `${insertKey} ${data}` : data}
    </option>
  ));
  return (
    <ListSelectStyled
      {...rest}
    >
      {options}
    </ListSelectStyled>
  );
};

ListSelect.defaultProps = {
  insertKey: null,
};

ListSelect.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.any).isRequired,
  insertKey: PropTypes.string,
};

export default ListSelect;

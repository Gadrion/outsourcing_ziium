import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Checkbox } from 'wisenet-ui/components/atoms';
import { List } from 'wisenet-ui/components/molecules';
import { CheckboxListContainer } from 'wisenet-ui/containers/organisms';
import { Listgroup } from './CheckboxListStyled';

const CheckboxList = ({ dataList, handleCheckedChange }) => {
  const items = dataList.map(itemContent => (
    <Listgroup>
      <div className={classNames({ active: itemContent.checked })}>
        <Checkbox
          key={itemContent.name}
          checked={itemContent.checked}
        />
        <i className={`${itemContent.icon}`} />
        {itemContent.name}
      </div>
    </Listgroup>
  ));

  return (
    <List data={items} handleClick={handleCheckedChange} />
  );
};

CheckboxList.propTypes = {
  dataList: PropTypes.instanceOf(Array).isRequired,
  handleCheckedChange: PropTypes.func.isRequired,
};

export default withContainer(CheckboxListContainer, CheckboxList);

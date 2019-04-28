import React from 'react';
import PropTypes from 'prop-types';
import { PTZGroupContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  Container,
  GroupDisableMask,
  TableWrapper,
  StyledTable,
} from './PTZGroupStyled';

const groupHeader = [
  {
    Header: 'NO',
    accessor: 'no',
    sortable: true,
  },
  {
    Header: 'Name',
    accessor: 'name',
    sortable: true,
  },
];

const makeGroupList = groupList => {
  const array = [];
  for (let idx = 1; idx <= groupList.length; idx += 1) {
    array.push({
      id: idx,
      no: idx,
      name: `Group ${idx}`,
    });
  }
  return array;
};

const PTZGroup = ({
  groupList,
  controlGroup,
  // currentGroup,
  // isOn,
}) => (
  <Container id="group_wrapper">
    <GroupDisableMask id="group_disable_mask" />
    <TableWrapper>
      { groupList !== null
      && groupList !== false
      && (
        <StyledTable
          onSelectRow={e => { controlGroup(e); }}
          scroll
          header={groupHeader}
          data={makeGroupList(groupList)}
          selectRow
          rowHeight={30}
          pageSize={10}
        />
      )
    }
    </TableWrapper>
  </Container>
);

PTZGroup.propTypes = {
  groupList: PropTypes.arrayOf(Object),
  controlGroup: PropTypes.func,
  // onSelected: PropTypes.func,
  // lang: PropTypes.instanceOf(Object).isRequired,
};

PTZGroup.defaultProps = {
  groupList: [],
  controlGroup: null,
  // onSelected: null,
};

export default withContainer(PTZGroupContainer, PTZGroup);

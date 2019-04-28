import React from 'react';
import PropTypes from 'prop-types';
import { PTZSwingContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  Container,
  SwingDisableMask,
  TableWrapper,
  StyledTable,
} from './PTZSwingStyled';

const swingHeader = [
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

const makeSwingList = swingList => {
  const array = [];
  for (let idx = 1; idx <= swingList.length; idx += 1) {
    array.push({
      id: idx,
      no: idx,
      name: `Swing ${idx}`,
      mode: swingList[idx - 1].Mode,
    });
  }
  return array;
};

const PTZSwing = ({
  swingList,
  controlSwing,
  // currentSwing,
  // currentMode,
}) => (
  <Container id="swing_wrapper">
    <SwingDisableMask id="swing_disable_mask" />
    <TableWrapper>
      { swingList !== null
      && swingList !== false
      && (
        <StyledTable
          onSelectRow={e => { controlSwing(e); }}
          scroll
          header={swingHeader}
          data={makeSwingList(swingList)}
          selectRow
          rowHeight={30}
          pageSize={10}
        />
      )
    }
    </TableWrapper>
  </Container>
);


PTZSwing.propTypes = {
  swingList: PropTypes.arrayOf(Object),
  controlSwing: PropTypes.func,
  // lang: PropTypes.instanceOf(Object).isRequired,
};

PTZSwing.defaultProps = {
  swingList: [],
  controlSwing: null,
};

export default withContainer(PTZSwingContainer, PTZSwing);

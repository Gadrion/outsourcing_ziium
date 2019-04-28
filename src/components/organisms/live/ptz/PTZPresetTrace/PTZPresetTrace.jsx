import React from 'react';
import PropTypes from 'prop-types';
import { PTZTraceContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  Container,
  TraceDisableMask,
  TableWrapper,
  StyledTable,
} from './PTZTraceStyled';

const traceHeader = [
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

const makeTraceList = traceList => {
  const array = [];
  for (let idx = 1; idx <= traceList.length; idx += 1) {
    array.push({
      id: idx,
      no: idx,
      name: `Trace ${idx}`,
    });
  }
  return array;
};

const PTZPrsetTrace = ({
  traceList,
  controlTrace,
  // currentTrace,
  // isOn,
}) => (
  <Container id="trace_wrapper">
    <TraceDisableMask id="trace_disable_mask" />
    <TableWrapper>
      { traceList !== null
      && traceList !== false
      && (
        <StyledTable
          onSelectRow={e => { controlTrace(e); }}
          scroll
          header={traceHeader}
          data={makeTraceList(traceList)}
          selectRow
          rowHeight={30}
          pageSize={10}
        />
      )
    }
    </TableWrapper>
  </Container>
);

PTZPrsetTrace.propTypes = {
  traceList: PropTypes.arrayOf(Object),
  controlTrace: PropTypes.func,
  // onSelected: PropTypes.func,
  // lang: PropTypes.instanceOf(Object).isRequired,
};

PTZPrsetTrace.defaultProps = {
  traceList: [],
  controlTrace: null,
  // onSelected: null,
};

export default withContainer(PTZTraceContainer, PTZPrsetTrace);

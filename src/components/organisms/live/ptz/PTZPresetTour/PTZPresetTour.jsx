import React from 'react';
import PropTypes from 'prop-types';
import { PTZTourContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  Container,
  TourDisableMask,
  TableWrapper,
  StyledTable,
} from './PTZTourStyled';

const tourHeader = [
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

const makeTourList = tourList => {
  const array = [];
  for (let idx = 1; idx <= tourList.length; idx += 1) {
    array.push({
      id: idx,
      no: idx,
      name: `Tour ${idx}`,
    });
  }
  return array;
};

const PTZPresetTour = ({
  controlTour,
  tourList,
  // currentTour,
  // isOn,
}) => (
  <Container id="tour_wrapper">
    <TourDisableMask id="tour_disable_mask" />
    <TableWrapper>
      { tourList !== null
      && tourList !== false
      && (
        <StyledTable
          onSelectRow={e => { controlTour(e); }}
          scroll
          header={tourHeader}
          data={makeTourList(tourList)}
          selectRow
          rowHeight={30}
          pageSize={10}
        />
      )
    }
    </TableWrapper>
  </Container>
);

PTZPresetTour.propTypes = {
  tourList: PropTypes.arrayOf(Object),
  controlTour: PropTypes.func,
  // onSelected: PropTypes.func,
  // lang: PropTypes.instanceOf(Object).isRequired,
};

PTZPresetTour.defaultProps = {
  tourList: [],
  controlTour: null,
  // onSelected: null,
};

export default withContainer(PTZTourContainer, PTZPresetTour);

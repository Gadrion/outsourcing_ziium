import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { List as ListImmutable } from 'immutable';
import { NewList } from 'wisenet-ui/components/organisms';
import { EventListContainer } from 'containers/organisms';
import LiveEventFilter from './LiveEventFilter';
import {
  EventTabWrapper,
  TitleStyled,
  Border,
  IconStyled,
  DropDownMenuStyled,
} from './EventListStyled';

const dropdownMenuItems = [
  (
    <div key="filter">
      <LiveEventFilter />
    </div>
  ),
];

const DropDownMenu = () => (
  <DropDownMenuStyled menuItems={dropdownMenuItems}>
    <IconStyled className="wni wni-filter" />
  </DropDownMenuStyled>
);

class EventList extends React.Component {
  makeListDataComponent = () => {
    const {
      eventListData,
    } = this.props;

    if (eventListData === undefined) {
      return null;
    }
    const result = eventListData.map((item, index) => {
      const itemTemp = {
        id: `${index}`,
        text: '',
        data: {
          Index: `${index}`,
          Type: `${item.Type}`,
          DeviceName: `${item.DeviceName}`,
          StartTime: `${item.StartTime}`,
          Data: `${item.Data}`,
          disableItem: false,
        },
      };
      return itemTemp;
    });
    return result;
  }

  render() {
    const realTimeEventListData = this.makeListDataComponent();
    return (
      <EventTabWrapper>
        <TitleStyled>
          {'Event'}
          <DropDownMenu />
        </TitleStyled>
        <Border />
        <NewList
          listData={ListImmutable(realTimeEventListData)}
          realTimeEventComponent
        />
      </EventTabWrapper>
    );
  }
}

EventList.propTypes = {
  eventListData: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    deviceName: PropTypes.string,
    startTime: PropTypes.string,
    data: PropTypes.string,
  })).isRequired,
};

export default withContainer(EventListContainer, EventList);

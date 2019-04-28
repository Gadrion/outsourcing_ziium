import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Label } from 'wisenet-ui/components/atoms';
import { SearchOptions } from 'components/organisms';

import {
  SearchOptionLeftStyled,
  DropDownMenuStyled,
  ListSelectStyled,
} from './SearchTimelineOptionLeftStyled';

class SearchTimelineOptionLeft extends Component {
  componentDidMount() {
    // 처음 theme 적용을 위한 재 랜더
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    const {
      overlappedList: nextOverlappedList,
      currentTabName: nextCurrentTabName,
      selectEvent: nextSelectEvent,
    } = nextProps;

    const {
      overlappedList,
      currentTabName,
      selectEvent,
    } = this.props;

    if (JSON.stringify(nextOverlappedList) === JSON.stringify(overlappedList)
      && JSON.stringify(nextCurrentTabName) === JSON.stringify(currentTabName)
      && JSON.stringify(nextSelectEvent) === JSON.stringify(selectEvent)
    ) {
      return false;
    }

    return true;
  }

  render() {
    const {
      onClick,
      overlappedList,
      currentTabName,
      selectEvent,
      IconStyled,
    } = this.props;

    const dropdownMenuItems = [
      (
        <div key="filter">
          <SearchOptions />
        </div>
      ),
    ];

    const DropDownMenu = () => (
      <DropDownMenuStyled menuItems={dropdownMenuItems}>
        <IconStyled className="wni wni-filter" />
      </DropDownMenuStyled>
    );

    const searchOptionLeftContent = currentTabName === 'eventTab'
      ? (
        <React.Fragment>
          <DropDownMenu />
          <Label>Event Filter</Label>
        </React.Fragment>
      ) : (
        <ListSelectStyled
          listData={selectEvent.toJS().ChannelIDList ? selectEvent.toJS().ChannelIDList : []}
          insertKey="CH"
          onChange={onClick('channel')}
        />
      );

    return (
      <SearchOptionLeftStyled>
        {searchOptionLeftContent}
        <ListSelectStyled
          listData={overlappedList}
          onChange={onClick('overlap')}
        />
      </SearchOptionLeftStyled>
    );
  }
}

SearchTimelineOptionLeft.propTypes = {
  IconStyled: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  overlappedList: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentTabName: PropTypes.string.isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
};

export default SearchTimelineOptionLeft;

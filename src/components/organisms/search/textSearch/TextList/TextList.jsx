import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Button } from 'wisenet-ui/components/atoms';
import { NewList } from 'wisenet-ui/components/organisms';
import { TextListContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  ListContainer,
  ListItemWrapper,
  ListItem,
  DescendingButton,
  ListCounter,
  HeaderWrapper,
  DateLabel,
  TextListItemWrapper,
} from './TextListStyled';

const Ascending = 'Ascending';
const Descending = 'Descending';

class TextList extends React.Component {
  makeListData = () => {
    const { searchResult } = this.props;
    if (searchResult.length <= 0) {
      return null;
    }
    const listItems = [];
    let backupArray = [];
    let prevDate = '';
    searchResult.map((item, idx) => {
      const { Date: itemDate } = item;
      const splitDate = itemDate.split('T')[0];
      if (prevDate === '') {
        prevDate = splitDate;
        backupArray.push(item);
      } else {
        const curDate = splitDate;
        if (new Date(prevDate).getTime() !== new Date(curDate).getTime()) {
          listItems.push(backupArray);
          backupArray = [];
          backupArray.push(item);
          prevDate = curDate;
        } else if (idx === searchResult.length - 1) {
          listItems.push(backupArray);
        } else {
          backupArray.push(item);
        }
      }
      return null;
    });
    return listItems;
  }

  makeComponentList = dataList => {
    // console.log(',.,,,.,., dataList', dataList);
    if (dataList === null || dataList.length === 0) {
      return dataList;
    }
    const { posConfigList } = this.props;

    const resultArray = (dataList.length !== 0)
      ? dataList.map(ditem => {
        const items = ditem;
        // const list = items[idx];
        console.log('............ item ', items);
        // console.log('............ list ', list);
        const curDate = items[0].Date.split('T')[0];
        const result = items.map((item, index) => {
          const curIndex = index + 1;
          // const tIndex = curIndex + 1;
          const listIndex = `${curIndex}`;
          const deviceIndex = posConfigList.findIndex(conf => conf.DeviceID === item.DeviceID);
          const device = posConfigList[deviceIndex].DeviceName;
          // const channel = `CH${item.ChannelIDList.map(ch => (`${Number(ch) + 1}`)).join(',')}`;
          const time = item.Date.replace('T', ' ').replace('Z', '');
          const keyword = item.KeywordsMatched.join(',');

          return (
            <ListItemWrapper key={curIndex}>
              <ListItem>{listIndex}</ListItem>
              <ListItem>{device}</ListItem>
              {/* <ListItem>{channel}</ListItem> */}
              <ListItem>{time}</ListItem>
              <ListItem>{keyword}</ListItem>
            </ListItemWrapper>
          );
        });

        return (
          <TextListItemWrapper>
            <DateLabel>{curDate}</DateLabel>
            {result}
          </TextListItemWrapper>
        );
      }) : null;

    return resultArray;
  }

  makeListDataComponent = () => {
    const { posConfigList, searchResult } = this.props;
    if (searchResult.length <= 0) {
      return [];
    }

    return searchResult.map((item, index) => {
      const deviceIndex = posConfigList.findIndex(conf => conf.DeviceID === item.DeviceID);
      const device = posConfigList[deviceIndex];
      return ({
        id: `${index}`, // `textResult-${index}`,
        // idx: index,
        text: '',
        data: {
          Index: index,
          Device: device.DeviceName,
          DeviceID: device.DeviceID,
          Time: item.Date.replace('T', ' ').replace('Z', ''),
          Keyword: item.KeywordsMatched.join(','),
        },
      });
    });
  }

  render() {
    const {
      onSelect,
      onDescend,
      searchResult,
      isDescending,
      onClickViewMore,
      onClickViewAll,
      currentItemIndex,
    } = this.props;
    // const dataList = this.makeListData();
    // const sortedList = this.makeComponentList(dataList);
    const sortedList = this.makeListDataComponent().slice(0, currentItemIndex);
    if (sortedList && isDescending) {
      sortedList.reverse();
    }
    return (
      <ListContainer>
        <HeaderWrapper>
          <DescendingButton onClick={onDescend}>
            {isDescending ? Ascending : Descending}
          </DescendingButton>
          <ListCounter>
            {!!sortedList.length && `${sortedList.length} / ${searchResult.length}`}
          </ListCounter>
        </HeaderWrapper>
        {!!sortedList.length
          && (
          <>
            <NewList
              listData={List(sortedList)}
              handleClick={onSelect}
              // showCamChannelIndexIcon
              // showIcon
              // showIndex
              useExportOneClickListItem
              exportClickListItem={onSelect}
            />
            <Button
              onClick={onClickViewMore}
              disabled={sortedList && sortedList.length >= searchResult.length}
            >
              {'More'}
            </Button>
            <Button
              onClick={onClickViewAll}
              disabled={sortedList && sortedList.length >= searchResult.length}
            >
              {'View all'}
            </Button>
          </>
          )}
      </ListContainer>
    );
  }
}

TextList.propTypes = {
  onSelect: PropTypes.func,
  onDescend: PropTypes.func,
  searchResult: PropTypes.arrayOf(PropTypes.shape({
    Type: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
  })),
  posConfigList: PropTypes.arrayOf(PropTypes.shape({
    DeviceName: PropTypes.string,
    Enable: PropTypes.bool,
    Port: PropTypes.number,
    EventPlaybackStartTime: PropTypes.number,
    EncodingType: PropTypes.string,
    ReceiptEnd: PropTypes.string,
    ReceiptStart: PropTypes.string,
    ChannelIDList: PropTypes.array,
  })),
  isDescending: PropTypes.bool,
  onClickViewMore: PropTypes.func.isRequired,
  onClickViewAll: PropTypes.func.isRequired,
  currentItemIndex: PropTypes.number,
};

TextList.defaultProps = {
  onSelect: () => {},
  onDescend: () => {},
  searchResult: [],
  posConfigList: [],
  isDescending: false,
  currentItemIndex: 10,
};

export default withContainer(TextListContainer, TextList);

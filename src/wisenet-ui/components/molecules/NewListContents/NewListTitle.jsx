import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Input,
} from 'wisenet-ui/components/atoms';
import {
  NewListCheckbox,
} from 'wisenet-ui/components/molecules';
import {
  ListTitleStyled,
  ListTextStyled,
  ListIndexIconStyled,
  ListIconStyled,
  EventResultListItemStyled,
  EventResultListItemNormalStyled,
  EventResultListItemIndexStyled,
  EventResultListItemDatetimeStyled,
  TextResultListItemStyled,
  TextResultListItemNormalStyled,
  TextResultListItemIndexStyled,
  TextResultListItemDatetimeStyled,
  RealTimeEvnetWrapper,
  EventTitleStyled,
  EventSubTitleWrapperStyled,
  EventDeviceNameStyled,
  EventStartTimeStyled,
  EventContentsStyled,
} from './NewListItemStyled';

class NewListTitle extends React.Component {
  // state = {
  //   inputValue: '',
  // };

  shouldComponentUpdate(nextProps) {
    const {
      listItem: nextListItem,
      selected: nextSelected,
    } = nextProps;

    const {
      listItem,
      selected,
    } = this.props;

    if ((JSON.stringify(nextSelected) === JSON.stringify(selected))
      && (JSON.stringify(nextListItem) === JSON.stringify(listItem))) {
      return false;
    }
    return true;
  }

  handleChange = e => {
    const inputValue = e.target.value;
    const { onInputChange } = this.props;
    onInputChange(inputValue);

    // this.setState({
    //   inputValue: getInputValue,
    // });
  }

  render() {
    const {
      listItem,
      disableItem,
      idx,
      selected,
      showCheckbox,
      showIndex,
      showCamChannelIndexIcon,
      showIcon,
      dragAndDrop,
      dragFunc,
      onClickCheckbox,
      realTimeEventComponent,
    } = this.props;
    return (
      <ListTitleStyled
        className={classNames({ selected, disableItem })}
        draggable={dragAndDrop}
        onDragEnd={e => dragFunc(e)}
      >
        {realTimeEventComponent
          ? (
            <RealTimeEvnetWrapper>
              <EventTitleStyled>
                {listItem.data.Type}
              </EventTitleStyled>
              <EventSubTitleWrapperStyled>
                <EventDeviceNameStyled>
                  {listItem.data.DeviceName}
                </EventDeviceNameStyled>
                <EventStartTimeStyled>
                  {listItem.data.StartTime}
                </EventStartTimeStyled>
              </EventSubTitleWrapperStyled>
              {listItem.data.Data !== undefined
                && (
                  <EventContentsStyled>
                    {listItem.data.Data}
                  </EventContentsStyled>
                )
              }
            </RealTimeEvnetWrapper>
          ) : (
            <React.Fragment>
              {showCheckbox
                && (
                  <NewListCheckbox
                    onClickNode={onClickCheckbox}
                    itemChecked={listItem.checked}
                    listItemId={listItem.id}
                  />
                )
              }
              {showIndex
                && (
                  <span>
                    {idx + 1}
                  </span>
                )
              }
              {showCamChannelIndexIcon
                && (
                  <ListIndexIconStyled
                    className={classNames({
                      checked: listItem.assigned,
                      focused: listItem.focused,
                      disableItem,
                    })}
                  >
                    {Number(listItem.id) + 1}
                  </ListIndexIconStyled>
                )
              }
              {(showIcon && listItem.iconLeft)
                && (
                  <ListIconStyled
                    className={classNames({ focused: listItem.focused, disableItem })}
                  >
                    {listItem.iconLeft}
                  </ListIconStyled>
                )
              }
              {( // Event Search 결과 리스트 만들기
                typeof listItem.data !== 'undefined'
                && typeof listItem.data.Index !== 'undefined'
                && typeof listItem.data.Type !== 'undefined'
                && typeof listItem.data.StartTime !== 'undefined'
                && typeof listItem.data.EndTime !== 'undefined'
              )
                && (
                  <EventResultListItemStyled>
                    <EventResultListItemIndexStyled>
                      {listItem.data.Index}
                    </EventResultListItemIndexStyled>
                    <EventResultListItemNormalStyled>
                      {listItem.data.Type}
                    </EventResultListItemNormalStyled>
                    <EventResultListItemDatetimeStyled>
                      {listItem.data.StartTime}
                    </EventResultListItemDatetimeStyled>
                    <EventResultListItemDatetimeStyled>
                      {listItem.data.EndTime}
                    </EventResultListItemDatetimeStyled>
                  </EventResultListItemStyled>
                )
              }
              {( // Text Search 결과 리스트 만들기
                typeof listItem.data !== 'undefined'
                && typeof listItem.data.Index !== 'undefined'
                && typeof listItem.data.Device !== 'undefined'
                && typeof listItem.data.Time !== 'undefined'
                && typeof listItem.data.Keyword !== 'undefined'
              )
                && (
                  <TextResultListItemStyled id="TextResultListItemStyled">
                    <TextResultListItemIndexStyled>
                      {listItem.data.Index}
                    </TextResultListItemIndexStyled>
                    <TextResultListItemNormalStyled id="TextResultListItemNormalStyled1">
                      {listItem.data.Device}
                    </TextResultListItemNormalStyled>
                    <TextResultListItemDatetimeStyled id="TextResultListItemNormalStyled2">
                      {listItem.data.Time}
                    </TextResultListItemDatetimeStyled>
                    <TextResultListItemNormalStyled id="TextResultListItemNormalStyled3">
                      {listItem.data.Keyword}
                    </TextResultListItemNormalStyled>
                  </TextResultListItemStyled>
                )
              }
              {(listItem.data.input)
                ? (
                  <Input
                    type="text"
                    name="input"
                    maxLength="15"
                    onChange={this.handleChange}
                    autoFocus
                  />
                ) : (
                  <ListTextStyled
                    className={classNames({ focused: listItem.focused })}
                  >
                    {listItem.text}
                  </ListTextStyled>
                )
              }
              {(showIcon && listItem.iconRight)
                && (
                  <ListIconStyled>
                    {listItem.iconLeft}
                  </ListIconStyled>
                )
              }
            </React.Fragment>
          )
        }
      </ListTitleStyled>
    );
  }
}

NewListTitle.defaultProps = {
  idx: -1,
  disableItem: false,
  selected: false,
  showIndex: false,
  showCamChannelIndexIcon: false,
  showIcon: false,
  showCheckbox: false,
  dragAndDrop: false,
  dragFunc: () => {},
  onClickCheckbox: () => {},
  onInputChange: () => {},
  realTimeEventComponent: false,
};

NewListTitle.propTypes = {
  listItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.any,
    title: PropTypes.instanceOf(Object),
    iconLeft: PropTypes.instanceOf(Object),
    iconRight: PropTypes.instanceOf(Object),
    assigned: PropTypes.bool,
    focused: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
  }).isRequired,
  disableItem: PropTypes.bool,
  idx: PropTypes.number,
  selected: PropTypes.bool,
  showIndex: PropTypes.bool,
  showCamChannelIndexIcon: PropTypes.bool,
  showIcon: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  dragAndDrop: PropTypes.bool,
  dragFunc: PropTypes.func,
  onClickCheckbox: PropTypes.func,
  onInputChange: PropTypes.func,
  realTimeEventComponent: PropTypes.bool,
};

export default NewListTitle;

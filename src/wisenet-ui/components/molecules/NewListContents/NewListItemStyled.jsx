import styled, { withTheme } from 'styled-components';
import {
  Span,
} from 'wisenet-ui/components/atoms';

const ListTitleStyled = withTheme(styled.div`
  height: 28px;
  width: 100%;
  vertical-align: middle;  
  padding-left:19px;

  &.selected {
    background-color: #fbd5bc;
  }

  &.disableItem {
    color: #d2d2d2;
  }
`);

const ListIconStyled = styled(Span)`
  line-height:26px;

  &.focused {
    color:#f37321;
  }

  &.disableItem {
    color: #d2d2d2;
  }
`;

const ListIndexIconStyled = styled(Span)`
  border: solid 1px #4c4c4c;
  width:20px;
  height:20px;
  line-height:18px;
  border-radius:75px;
  text-align:center;
  margin-right:4px;
  font-size:14px;
  color:#4c4c4c;
  vertical-align:middle;
  position: relative;
  
  &.checked {
    background-color: #4c4c4c;
    color:#fff;
  }

  &.focused {
    background-color:#f37321;
    border: solid 1px #f37321;

    &.disableItem {
      background: #d2d2d2;
    }
  }

  &.disableItem {
    border: solid 1px #d2d2d2;
    color: #d2d2d2;
    /* pointer-events: none; */
  }
`;

const ListTextStyled = styled(Span)`
  vertical-align: middle;

  &.focused {
    color:#f37321;
  }
`;

const EventResultListItemStyled = styled.div`
  font-size: 14px;
  display: flex;
  &:hover {
    background-color: #dcdcdc;
    width: 100%;
  }
`;

const EventResultListItemNormalStyled = styled(Span)`
  margin: 0px 5px 0px 0px;
  font-size: 14px;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventResultListItemIndexStyled = styled(Span)`
  margin: 0px 5px 0px 0px;
  width: 25px;
  font-size: 14px;
`;

const EventResultListItemDatetimeStyled = styled(Span)`
  margin: 0px 5px 0px 5px;
  font-size: 12px;
`;

const TextResultListItemStyled = styled.div`
  font-size: 14px;
  display: flex;
  &:hover {
    background-color: #dcdcdc;
    width: 100%;
  }
`;

const TextResultListItemNormalStyled = styled(Span)`
  margin: 0px 5px 0px 0px;
  font-size: 14px;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextResultListItemIndexStyled = styled(Span)`
  margin: 0px 5px 0px 0px;
  width: 25px;
  font-size: 14px;
`;

const TextResultListItemDatetimeStyled = styled(Span)`
  margin: 0px 5px 0px 0px;
  font-size: 12px;
  width: 115px;
`;

const RealTimeEvnetWrapper = styled.div`
  min-height: 68px;
`;

const EventTitleStyled = styled.div`
  font-size: 16px;
`;

const EventSubTitleWrapperStyled = styled.div`
  font-size: 12px;
`;

const EventDeviceNameStyled = styled(Span)`
  width: 50%;
`;

const EventStartTimeStyled = styled(Span)`
  width: 50%;
`;

const EventContentsStyled = styled.div`
  width: 100%;
  font-size: 10px;
`;

export {
  ListTitleStyled,
  ListIconStyled,
  ListIndexIconStyled,
  ListTextStyled,
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
};

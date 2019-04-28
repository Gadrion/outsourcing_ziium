import styled from 'styled-components';

export const HeaderListStyled = styled.li`
  height: 40px;
  line-height: 40px;
  flex: 1;
  border-left-width: 1px;
  border-top-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colorSub9};
  text-align: center;
  font-family: NotoSans;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  cursor: pointer;
  &:nth-last-child(1) {
    border-right-width: 1px;
  }
  &.active {
    color: ${props => props.theme.colorPoint1};
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.colorMain};
    font-weight: bold;
    &.multiLine {
      border-bottom-width: 0px;
    }
  }
  &.right {
    &:nth-last-child(1) {
      border-right-width: 0;
    }
    &:nth-child(1) {
      border-right-width: 1px;
    }
  }
  &.noBorder {
    border-left-width: 0;
    border-top-width: 0;
    &:nth-last-child(1) {
      border-right-width: 0;
    }
    &.right {
      border-right-width: 0;
    }
  }
  &.empty {
    cursor: default;
    &:hover {
      background-color: inherit;
    }
  }
  &.align {
    flex: unset;
    min-width: 50px;
  }
`;

import styled, { withTheme } from 'styled-components';

export const Wrapper = withTheme(styled.div`
  width: 100%;
  height: 100%;
  padding: 0px;
  overflow: hidden;
  .react-datepicker__day-names {
    margin-top: 10px;
  }
  .react-datepicker__day-name {
    font-weight: bold;
    font-size: 12px;
    margin-left: 15px;
    color: ${props => props.theme.colorSub8};
    background-color: ${props => props.theme.colorMain};
  }
  .react-datepicker__header {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => props.theme.colorMain};
    color: ${props => props.theme.colorSub8};
  }
  .react-datepicker {
    border: none;
    width: 100%;
    height: 100%;
    color: ${props => props.theme.colorSub8};
    background-color: ${props => props.theme.colorMain};
  }
  .react-datepicker__month-container {
    width: 315px;
    height: 250px;
    padding: 0px;
  }
  .react-datepicker__week {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .react-datepicker__day {
    font-weight: normal;
    margin-left: 15px;
    font-size: 12px;
    color: ${props => props.theme.colorSub8};
    background-color: ${props => props.theme.colorMain};
    &:hover {
      color: ${props => props.theme.colorMain};
      background-color: ${props => props.theme.colorSub8};
    }
  }
  .react-datepicker__day--selected {
    font-weight: bold;
    color: ${props => props.theme.colorMain};
    background-color: ${props => props.theme.colorSub8};
  }
  .react-datepicker__day--disabled {
    cursor: default;
    color: #ccc;
    &:hover {
      color: #ccc;
      background-color: ${props => props.theme.colorMain};
    }
  }
`);

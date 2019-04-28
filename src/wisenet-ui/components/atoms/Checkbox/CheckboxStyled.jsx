import styled, { withTheme } from 'styled-components';

export default withTheme(styled.span`
  vertical-align: middle;

  input[type="checkbox"] {
    display: none;
    opacity: 0;
  }

  span {
    position: relative;
    display: inline-block;
    
    width: 14px;
    height: 14px;
  }

  span::before,
  span::after {
    position: absolute;
    content: "";
    
    display: inline-block;
    box-sizing: border-box;
  }

  span::before{
    height: 14px;
    width: 14px;
    
    background-color: ${props => props.theme.colorMain};
    border: 1px solid ${props => props.theme.colorSub8};
    left: 0;
    top: 0;
  }

  span::after {
    height: 5px;
    width: 9px;
    border-left: 2px solid ${props => props.theme.colorSub8};
    border-bottom: 2px solid ${props => props.theme.colorSub8};
    
    transform: rotate(-45deg);
    
    left: 2px;
    top: 4px;
  }

  input[type="checkbox"] + span::after {
    content: none;
  }

  input[type="checkbox"]:checked + span::after {
    content: "";
  }
  
  &.haveCheckedChild input[type="checkbox"] + span::after {
    content: "";
    height: 6px;
    width: 6px;
    border-left: none;
    border-bottom: none;
    background-color: ${props => props.theme.colorSub8};
    
    transform: none;
    
    left: 4px;
    top: 4px;
  }
`);

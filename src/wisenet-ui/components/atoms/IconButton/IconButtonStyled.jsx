import styled, { withTheme } from 'styled-components';

const IconButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  color: ${props => props.theme.colorSub8};
  border: none;
  outline: none;
  background-color: transparent;

  &:not(.border) i {
    font-size: 24px;
  }

  &.disabled {
    pointer-events: none;
    color: ${props => props.theme.colorSub7};
  }

  &.border {
    padding: 3px;
    border: 1px solid ${props => props.theme.colorSub6};
    background-color: ${props => props.theme.colorMain};

    i {
      font-size: 16px;
    }
    
    &:focus,
    &:hover {
      border: 1px solid ${props => props.theme.colorSub6};
      background-color: ${props => props.theme.colorSub4};
      color: ${props => props.theme.colorSub8};
    }

    &:active {
      border: 1px solid ${props => props.theme.colorSub9};
      background-color: ${props => props.theme.colorSub9};
      color: ${props => props.theme.colorMain};
    }
    
    &.disabled {
      border: 1px solid ${props => props.theme.colorSub6};
      background-color: ${props => props.theme.colorSub4};
    }
  }
`;

export default withTheme(IconButtonStyled);

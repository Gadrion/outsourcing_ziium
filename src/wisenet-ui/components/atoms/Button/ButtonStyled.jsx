import styled, { withTheme } from 'styled-components';

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: 1px solid ${props => props.theme.colorSub6};
  color: ${props => props.theme.colorSub8};
  background-color: ${props => props.theme.colorMain};

  &:focus,
  &:hover {
    border: 1px solid ${props => props.theme.colorSub6};
    color: ${props => props.theme.colorSub8};
    background-color: ${props => props.theme.colorSub4};
  }

  &:active {
    border: 1px solid ${props => props.theme.colorSub9};
    color: ${props => props.theme.colorMain};
    background-color: ${props => props.theme.colorSub9};
  }
  
  &.point {
    border: 1px solid ${props => props.theme.colorPoint3};
    color: ${props => props.theme.colorPoint1};
    background-color: ${props => props.theme.colorMain};

    &:focus,
    &:hover {
      border: 1px solid ${props => props.theme.colorPoint1};
      color: ${props => props.theme.colorMain};
      background-color: ${props => props.theme.colorPoint1};
    }

    &:active {
      border: 1px solid ${props => props.theme.colorPoint2};
      color: ${props => props.theme.colorMain};
      background-color: ${props => props.theme.colorPoint2};
    }
  }

  &.disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.colorSub6};
    color: ${props => props.theme.colorSub7};
    background-color: ${props => props.theme.colorSub4};
  }
`;

export default withTheme(ButtonStyled);

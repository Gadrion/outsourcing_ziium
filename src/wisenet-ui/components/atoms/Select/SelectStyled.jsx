import styled, { withTheme } from 'styled-components';

const SelectStyled = styled.select`
  padding: 10px;
  outline: none;
  border: 1px solid ${props => props.theme.colorSub6};
  color: ${props => props.theme.colorSub8};
  background-color: ${props => props.theme.colorMain};

  &.disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.colorSub6};
    color: ${props => props.theme.colorSub7};
    background-color: ${props => props.theme.colorSub4};
  }
`;

export default withTheme(SelectStyled);

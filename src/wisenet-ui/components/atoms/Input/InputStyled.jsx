import styled, { withTheme } from 'styled-components';

const InputStyled = styled.input`
  outline: none;
  padding: 10px;
  border: 1px solid ${props => props.theme.colorSub4};
  color: ${props => props.theme.colorSub9};
  background-color: ${props => props.theme.colorMain};

  :focus,
  :hover {
    border: 1px solid ${props => props.theme.colorPoint3};
  }

  &.disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.colorSub3};
    color: ${props => props.theme.colorSub7};
    background-color: ${props => props.theme.colorSub2};
  }
`;

export default withTheme(InputStyled);

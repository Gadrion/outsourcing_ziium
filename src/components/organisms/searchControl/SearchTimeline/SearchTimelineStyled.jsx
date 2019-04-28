import styled, { withTheme } from 'styled-components';

export const SearchOptionStyled = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

export const IconStyled = withTheme(styled.i`
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

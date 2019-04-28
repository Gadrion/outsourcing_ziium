import styled, { withTheme } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const PatternIconsStyled = styled.div`
  display: flex;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0 5px;
  margin: 0 1px;
`);

export const IconStyled = withTheme(styled.i`
  font-size: 27px !important;
  color: ${props => props.theme.colorSub5};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colorSub9};
  }
`);

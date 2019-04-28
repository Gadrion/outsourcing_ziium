import styled, { withTheme } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const SearchOptionMiddleStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0;

  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

import styled, { withTheme, css } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const TileControlBarStyled = styled.div`
  display: flex;
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0;
`);

export const IconStyled = withTheme(styled.i`
  /* font-size: 20px; */
  cursor: pointer;
  height: 40px;
  width: 40px;
  color: #ffffff;
  padding-right: 1.5rem;
  padding-left: 1.5rem;

  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
  ${props => props.isActive && css`
    color: #f37321;
  `}
`);

import styled, { withTheme } from 'styled-components';
import { IconButton } from 'wisenet-ui/components/atoms';

export const TilePTZFunctionBarStyled = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const IconButtonStyled = withTheme(styled(IconButton)`
  padding: 0;
`);

export const IconStyled = withTheme(styled.i`
  /* font-size: 20px; */
  height: 40px;
  width: 40px;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  text-shadow: -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000, 1px 1px 2px #000;
`);

import styled, { withTheme } from 'styled-components';

export const ViewportStyled = withTheme(styled.div`
  width: calc(100% - 40px);
  margin: 0 20px;
  height: 57px; /* Line 30, Margin 15, Text 12 */
  position: relative;
`);

export const WrapperStyled = withTheme(styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`);

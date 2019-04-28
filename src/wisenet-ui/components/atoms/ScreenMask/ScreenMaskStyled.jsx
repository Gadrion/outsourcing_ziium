import styled, { withTheme } from 'styled-components';

export default withTheme(styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.7;
  background-color: ${props => props.theme.colorSub9};
`);

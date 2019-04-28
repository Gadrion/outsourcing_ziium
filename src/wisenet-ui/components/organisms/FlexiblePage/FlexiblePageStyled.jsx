import styled, { css, withTheme } from 'styled-components';
import { Rnd } from 'react-rnd';

export const MainStyled = styled.main`
  display: flex;
  ${props => props.sidePosition === 'right' && css`
    flex-direction: row-reverse;
  `};
`;

export const SidebarWrapperStyled = withTheme(styled.div`
  width: ${props => `${props.width}px`};
  flex-basis: ${props => `${props.width}px`};
  ${props => props.noDisplay && css`
    display: none;
  `};
`);

export const RndStyled = withTheme(styled(Rnd)`
  background-color: inherit;
  z-index: 5;
  top: ${props => `${props.headerSize}px !important`};
  height: calc(100vh - ${props => props.headerSize}px) !important;
  ${props => props.margin && css`
    left: ${props.margin.left}px !important;
    right: ${props.margin.right}px !important;
  `}
`);

export const SidebarVisibleStyled = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.width}px`};
  ${props => props.noDisplay && css`
    display: none;
  `};
`);

export const ContentWrapperStyled = styled.div`
  flex-grow: 1;
  height: calc(100vh - ${props => props.headerSize}px);
  overflow-y: auto;
`;

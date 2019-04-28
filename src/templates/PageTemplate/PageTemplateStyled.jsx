import styled, { withTheme } from 'styled-components';

export const PageTemplateStyled = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  flex: 1;
  overflow-y: auto;
`;

export const MainStyled = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
`;

export const SidebarWrapperStyled = withTheme(styled.div`
  flex-basis: 320px;
  max-height: calc(100vh - 50px);
  border-right: 1px solid ${props => props.theme.colorSub5};
`);

export const ContentWrapperStyled = styled.div`
  flex-grow: 1;
`;

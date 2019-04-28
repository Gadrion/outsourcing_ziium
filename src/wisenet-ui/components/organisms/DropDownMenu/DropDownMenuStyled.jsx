import styled, { withTheme } from 'styled-components';

export const DropDownMenuStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ContextMenuWrapperStyled = withTheme(styled.div`
  position: absolute;
  white-space: pre;
  right: 0;
  padding: 10px 20px;
  color: ${props => props.theme.colorSub8};
  background-color: ${props => props.theme.colorMain};
  border: 1px solid ${props => props.theme.colorSub6};
  box-shadow: 2px 2px 2px ${props => props.theme.colorSub6};
`);

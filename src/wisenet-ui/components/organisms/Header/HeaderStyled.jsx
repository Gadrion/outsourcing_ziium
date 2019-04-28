import styled, { withTheme } from 'styled-components';

const HeaderStyled = withTheme(styled.div`
  display: flex;
  background-color: ${props => props.theme.colorMain};
  border-bottom: 1px solid ${props => props.theme.colorSub5};
  color: ${props => props.theme.colorSub8};
`);

const LeftStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const CenterStyled = styled.div`
  display: flex;
  align-items: center;
`;

const RightStyled = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export {
  HeaderStyled,
  LeftStyled,
  CenterStyled,
  RightStyled,
};

import styled, { withTheme } from 'styled-components';

const WrapperStyled = styled.div`
  width: 250px;
`;

const SectionStyled = withTheme(styled.div`
  padding-bottom: 50px;
  margin-bottom: 50px;
  border-bottom: 1px solid ${props => props.theme.colorSub4};
`);

const TitleStyled = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const VerticalWrapperStyled = styled.div`
  width: 50px;
  height: 250px;
`;

export {
  WrapperStyled,
  SectionStyled,
  TitleStyled,
  VerticalWrapperStyled,
};

import styled, { withTheme } from 'styled-components';
import { Header } from 'wisenet-ui/components/organisms';

const HelpPageStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderStyled = styled(Header)`
  height: 50px;
  padding: 0 20px;
  pointer-events: none;
`;

const SpanStyled = withTheme(styled.span`
  font-size: 14px;
  color: ${props => props.theme.colorSub6};
`);

export {
  HelpPageStyled,
  HeaderStyled,
  SpanStyled,
};

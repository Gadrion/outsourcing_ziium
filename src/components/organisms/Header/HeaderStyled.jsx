import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Toggle } from 'wisenet-ui/components/molecules';
// import { IconButton, Span } from 'wisenet-ui/components/atoms';
// import { ThemeSwitcher } from 'wisenet-ui/components/molecules';
// import { Header, DropDownMenu } from 'wisenet-ui/components/organisms';

export const HeaderWrapperStyled = styled.div`
  display: flex;
  height: 60px;
  z-index: 6;
  background-color: ${props => props.theme.colorMain};
  color: ${props => props.theme.colorSub8};
  margin: 0 24px 0 24px;
`;

export const LogoWrapperStyled = styled.div`
  display: flex;
  flex-basis: 316px;
  justify-content: center;
  align-items: center;
`;

export const CenterWrapperStyled = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const NavigationWrapperStyled = styled.div`
  display: flex;
  flex: 1;
  padding-left: 28px;
`;

export const AlarmAndFuncWrapperStyled = styled.div`
  display: flex;
  flex-basis: 400px;
  justify-content: flex-end;
  align-items: center;
`;

export const AlarmWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;
export const FuncWrapperStyled = styled.div`
  display: flex;
  font-size: 24px;
  align-items: center;
`;

export const NaviLinkStyled = styled(NavLink)`
  color: #4c4c4c;
  margin-right: 60px;
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
  &.active {
    color: ${props => props.theme.colorPoint1};
  }
`;

export const NavIconStyled = styled.i`
  font-size: 24px;
  margin-right: 4px;
`;

export const NavSpanStyled = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  vertical-align: middle;
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  border-left: 1px solid #c8c8c8;
  margin-top: 2px;
`;

export const FuncIconButtonStyled = styled.i`
  margin-left: 8px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`;

export const ToggleStyled = styled(Toggle)`
  width: 40px;
  margin-left: 12px;
`;

export const ModelNameStyled = styled.span`
  font-size: 14px;
  color: #a5a5a5;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
`;

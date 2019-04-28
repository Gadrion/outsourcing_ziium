import styled, { withTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SubmenuStyled = styled.ul`
  height: 0;
  overflow: hidden;
  transition: height .3s; 
`;

export const MenuStyled = withTheme(styled.li`
  display:flex;
  align-items:center;
  text-decoration: unset;
  width: 100%;
  font-size: 14px;
  border: none;
  text-align: left;
  background-color: inherit;
  color: ${props => props.theme.colorSub8};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colorPoint1};
    color: white;
  }
  &.main {
    font-weight: 700;
  }
  &.sub {
    font-weight: 400;
  }
  &.end {
    font-weight: 400;
  }
  &.active {
    color: ${props => props.theme.colorPoint1};
    font-weight: 700;
    &:hover {
      color: ${props => props.theme.colorMain};
    }
  }
`);

export const LinkMenuStyled = styled(NavLink)`
  display:flex;
  align-items:center;
  text-decoration: unset;
  width: 100%;
  font-size: 14px;
  border: none;
  text-align: left;
  background-color: inherit;
  color: ${props => props.theme.colorSub8};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colorPoint1};
    color: ${props => props.theme.colorMain};
  }
  &.active {
    color: ${props => props.theme.colorPoint1};
    font-weight: 700;
    &:hover {
      color: ${props => props.theme.colorMain};
    }
  }
`;

export const MenuIconStyled = styled.i`
  font-size: 20px;
  margin-right: 5px;
  margin-top: 2px;
`;

export const ArrowIconStyled = styled.i`
  font-size: 11px;
  margin-left: auto;
`;

import styled, { withTheme, css } from 'styled-components';
import { Tabs } from 'wisenet-ui/components/organisms';
import {
  Tab,
  IconButton,
} from 'wisenet-ui/components/atoms';

export const TabsStyled = styled(Tabs)`
  display: flex;
  flex-direction: column;

  & > ul {
    bottom: 0px;
  }

  & > div {
    position: relative;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    flex: 1;
    & > div {
      width: 100%;
      overflow-y: auto;
    }
  }
`;

export const TabStyled = withTheme(styled(Tab)`
  color: ${props => props.theme.colorSub8};
  
  &.active {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const TabIconStyled = styled.i`
  font-size: 30px;
  font-weight: bold;
`;

export const ContentStyled = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const LayoutItemsWrapperStyled = styled.span`
  /* margin-left: 50px; */
  float: right;
`;

export const LayoutIconStyled = styled.i`
  width: 20px;
  height: 20px;
  font-size: 20px;
`;

export const LayoutButtonStyled = styled(IconButton)`
  /* height: 20px;
  width: 20px; */
  margin: 0;
  padding: 0px 5px;
  display: inline-block;

  &.disableItem {
    color: #d2d2d2;
  }

  &.displayNone {
    display: none;
  }
`;

export const LivePageWrapperStyled = styled.div`
  background-color: ${props => props.theme.colorMain};
  margin-right: 26px;
  margin-left: 24px;
  &:focus {
    outline: none;
  }
  ${props => props.isFolding && css`
    margin-left: 0px;
  `}
`;

export const SideComponentWrapperStyled = styled.div`
  height: calc(100% - 23px);
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

export const SideControlWrapperStyled = withTheme(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  ${props => props.isVideoOver && css`
    position: absolute;
    width: 16px;
    top: calc(50%);
    color: #fff;
    z-index: 3;
    left: 8px;
    text-shadow: 1px 0px 0px #000;
  `}
`);

export const SideControlButtonStyled = styled.i`
  font-size: 30px;
  width: 16px;
  height: 30px;
  cursor: pointer;
  overflow: hidden;
  ${props => props.isFolding && css`
    transform: rotate(180deg);
  `}
  &:hover {
    color: #f37321;
    text-shadow: none;
  }
`;

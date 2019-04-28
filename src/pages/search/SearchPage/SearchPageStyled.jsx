import styled, { withTheme, css } from 'styled-components';
import { Tabs } from 'wisenet-ui/components/organisms';
import { Tab } from 'wisenet-ui/components/atoms';
import {
  SearchTimeline,
  SearchMediaControlBar,
} from 'components/organisms';

export const TabsStyled = styled(Tabs)`
  & > ul {
    bottom: 0px;
  }

  & > div {
    position: relative;
    padding: 0px;
    font-size: 12px;
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

export const MediaAndResultWrapperStyled = styled.div`
  display: flex;
  flex: 1;
`;

export const MideaWrapperStyled = styled.div`
  flex: 1;
`;

export const ResultWrapperStyled = styled.div`
  flex-basis: 316px;
  width: 316px;
  height: 100%;
  background-color: #f2f2f2;
  border-top: 1px solid ${props => props.theme.colorSub5};
  border-bottom: 1px solid ${props => props.theme.colorSub5};
  overflow-y : auto;
  ${props => props.isVisible && css`
     display: none;
  `};
`;

export const SearchPageWrapperStyled = styled.div`
  background-color: ${props => props.theme.colorMain};
  margin: 0 24px;
  ${props => props.isFolding && css`
    margin-left: 0px;
  `}
  ${props => props.resultFolding && css`
    margin-right: 0px;
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
  height: calc(100vh - 218px);
  color: #a5a5a5;
  ${props => props.noDisplay && css`
    display: none;
  `};
`);

export const ResultControlStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  color: #a5a5a5;
  ${props => props.isOver && css`
    position: absolute;
    width: 16px;
    left: calc(100vw - 25px);
    top: calc(50% - 91px);
    color: #fff;
    text-shadow: 1px 0px 0px #000;
  `}
`;


export const SideControlButtonStyled = styled.i`
  font-size: 30px;
  width: 16px;
  height: 30px;
  cursor: pointer;
  overflow: hidden;
  &.side {
    ${props => props.isFolding && css`
      transform: rotate(180deg);
    `}
  }
  &.result {
    ${props => !props.resultFolding && css`
      transform: rotate(180deg);
    `}
  }
  &:hover {
    color: #f37321;
    text-shadow: none;
  }
`;

export const SearchTimelineStyled = styled(SearchTimeline)`
  height: 92px;
  flex-basis: 92px;
  margin-top: 16px;
  padding-top: 13px;
  padding-bottom: 14px;
  border-top: 1px solid #d2d2d2;
  ${props => props.noDisplay && css`
    display: none;
  `}
`;

export const SearchContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SearchMediaControlBarStyled = styled(SearchMediaControlBar)`
  height: 32px;
  margin-top: 18px;
`;

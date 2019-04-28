import styled from 'styled-components';
import { Tabs } from 'wisenet-ui/components/organisms';
import { Tab } from 'wisenet-ui/components/atoms';

export const TabWrapperStyled = styled.div`
  width: 25%;
  padding: 15px;
`;

export const CustomTabStyled = styled(Tab)`
  &.active {
    border-bottom-width: 1px;
    border-bottom-color: #f37321;
  }
`;

export const DarkColorBackgroundStyled = styled.div`
  background-color: #191919;
  color: #fff;
  padding: 20px;
`;

export const DarkColorTabWrapperStyled = styled.div`
  width: 50%;
  margin: 20px;
`;

export const DarkTabsStyled = styled(Tabs)`
  & > ul {
    color: #d2d2d2;
  }
  & > div {
    background-color: #262626;
    color: #d2d2d2;
    border-color: #262626;
    min-height: 500px;
  }
`;

export const DarkTabStyled = styled(Tab)`
  background-color: #262626;
  border-color: #262626;
  height: 35px;
  line-height: 35px;
  &.active {
    border-bottom-width: 1px;
    border-bottom-color: #4c4c4c;
    background-color: #4c4c4c;
    color: #fff;
  }
`;

export const MultiLineTabWrapperStyled = styled.div`
  width: 100%;
  padding: 15px;
`;

export const MultiLineTabsStyled = styled(Tabs)`
  & > ul {
    background-color: #f2f2f2;
    color: #4c4c4c;
  }
  & > div {
    border-color: #e9e9e9;
  }
`;

export const MultiLineTabStyled = styled(Tab)`
  border-color: #e9e9e9;
  font-weight: 700;
  &:hover {
    background-color: #fff;
  }
  &.active {
    color: inherit;
    background-color: #fff;
    cursor: default;
  }
`;

export const InlineTabWrapper = styled.div`
  display: inline-block;
  width: 25%;
  padding: 15px;
`;

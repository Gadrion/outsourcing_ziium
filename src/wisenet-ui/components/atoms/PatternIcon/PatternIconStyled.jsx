import styled, { withTheme } from 'styled-components';

export const PatternIconTile = withTheme(styled.div`
  width: calc(${props => props.widthRatio * props.w}%);
  height: calc(${props => props.heightRatio * props.h}%);
  top: calc(${props => props.heightRatio * props.y}%);
  left: calc(${props => props.widthRatio * props.x}%);
  position: absolute;
  border: 1px solid ${props => props.theme.colorMain};
`);

export const PatternIconLayout = withTheme(styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  background-color: ${props => props.theme.colorSub5};
  &:hover {
    & > div {
      background-color: ${props => props.theme.colorSub9};
    }
  }
`);

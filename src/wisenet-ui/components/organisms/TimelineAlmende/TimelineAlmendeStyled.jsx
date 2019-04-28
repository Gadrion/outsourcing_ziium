import styled, { withTheme } from 'styled-components';
import Slider from 'rc-slider';

export const TimelineWrapper = styled.div`
  width: 100%;
  height: 45px;
  position: relative;
  /* &.active {
    overflow : scroll hidden;
  } */
`;

export const SliderWrapperStyled = styled.div`
  width: 100%;
  height: 10px;
  overflow-x: hidden;

  position: absolute;
  left: 0;
  bottom: 0;
`;

export const SliderParentStyled = withTheme(styled.div`
  width: ${props => `${100 - props.width}%`};
  height: 10px !important;

  position: absolute !important;
  left: ${props => `${props.width / 2}%`};
  bottom: 0;
  display: none;
  /* overflow: hidden; */

  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    left: -100%;
    width: 300%;
    height: 100%;
    z-index: 1;
    background-color: ${props => props.theme.colorSub2};
  }

  &.show {
    display: block;
  }
`);

export const SliderStyled = withTheme(styled(Slider)`
  /* .rc-slider { */
  padding: 0 !important;
  height: 10px !important;

  .rc-slider-rail {
    height: 10px;
    border-radius: 0;
  }

  .rc-slider-track {
    display: none;
  }

  .rc-slider-handle {
    z-index: 2;
    border: 1px solid ${props => props.theme.colorPoint1};
  }

    /* .rc-slider-handle {
      margin-top: 0;
      margin-left: 0;
      border-radius: 0;
      width: ${props => `${props.scrollbarWidth}%`} !important;
      height: 10px;
    } */
  /* } */
`);

export const TimelineWrapperStyled = styled.div`
  position: relative;
  user-select: none;

  &:hover .timeline-mouseover-popup {
    display: block;
  }

  #timeline-container {
    opacity: ${props => (props.useSelectTimeRange ? 0.5 : 1)};
  }
`;

export const TimelineMouseOverPopupStyled = styled.div`
  position: absolute;
  top: 0;
  z-index: 4;
  display: none;

  background-color: #f37321;
  color: #fff;

  padding: 7px 10px;
  border-radius: 2px;

  text-align: center;
  transform: translate(-50%, -100%);

  &::before {
    content: ' ';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 2px;
    height: 8px;
    background-color: #f37321;
  }

  .event-name {
    font-size: 11px;
    margin-bottom: 2px;
    white-space: pre;
  }

  .time {
    font-size: 14px;
    font-weight: bold;
  }
`;

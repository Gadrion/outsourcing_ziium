import styled, { withTheme } from 'styled-components';
import { Span } from 'wisenet-ui/components/atoms';
import { Slider } from 'wisenet-ui/components/molecules';

export const TileInstantPlaybackControlWrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PlayControlIconStyled = withTheme(styled.i`
  font-size: 60px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;
  color: ${props => props.theme.colorPoint4};
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const TileInstantPlaybackControlBottomWrapperStyled = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 2%;
  margin-bottom: 3%;
`;

export const IconStyled = withTheme(styled.i`
  font-size: 32px;
  cursor: pointer;
  margin-right: 20px;
  color: ${props => props.theme.colorPoint4};
  &:hover {
    color: ${props => props.theme.colorPoint1};
  }
`);

export const SpanStyle = styled(Span)`
  font-size: 12px;
  color: ${props => props.theme.colorPoint4};
  &:nth-of-type(1) {
    float: left;
  }
  &:nth-of-type(2) {
    float: right;
  }
`;

export const SliderStyle = styled(Slider)`
  margin-bottom: 2.5%;
  padding: 0 3%;
  & > span > div > div {
    &[class*='rc-slider-rail'] {
      height: 6px !important;
    }
    &[class*='rc-slider-track'] {
      height: 6px !important;
    }
    &[class*='rc-slider-handle'] {
      border-radius: 100%;
      background-color: white !important;
      width: 22px !important;
      height: 22px !important;
      border-color: white !important;

      &::before {
        content: '';
        border: 5px solid #f37321;
        border-radius: 100%;
        width: 8px;
        height: 8px;
        position: absolute;
      }
    }
  }
`;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TileInstantPlaybackControlContainer } from 'containers/organisms';
import {
  TileInstantPlaybackControlWrapperStyled,
  PlayControlIconStyled,
  TileInstantPlaybackControlBottomWrapperStyled,
  IconStyled,
  SpanStyle,
  SliderStyle,
} from './TileInstantPlaybackControlStyled';

class TileInstantPlaybackControl extends PureComponent {
  render() {
    const {
      onMouseEvent,
      sliderMax,
      sliderCurrentValue,
      viewStartTime,
      viewEndTime,
      isPlay,
    } = this.props;

    return (
      <TileInstantPlaybackControlWrapperStyled
        onMouseDown={onMouseEvent('static')}
      >
        <PlayControlIconStyled
          className={`wni ${isPlay ? 'wni-close' : 'wni-play'}`}
          onClick={onMouseEvent('playControl')}
        />
        <TileInstantPlaybackControlBottomWrapperStyled>
          <IconStyled
            className="wni wni-backmode"
            onClick={onMouseEvent('backMode')}
          />
          <IconStyled
            className="wni wni-search"
            onClick={onMouseEvent('search')}
          />
          <SliderStyle
            min={0}
            max={sliderMax}
            defaultValue={sliderMax}
            value={sliderCurrentValue}
            onChange={onMouseEvent('timePicker')}
          />
          <SpanStyle>{viewStartTime}</SpanStyle>
          <SpanStyle>{viewEndTime}</SpanStyle>
        </TileInstantPlaybackControlBottomWrapperStyled>
      </TileInstantPlaybackControlWrapperStyled>
    );
  }
}

TileInstantPlaybackControl.propTypes = {
  onMouseEvent: PropTypes.func.isRequired,
  sliderMax: PropTypes.number.isRequired,
  sliderCurrentValue: PropTypes.number.isRequired,
  viewStartTime: PropTypes.string.isRequired,
  viewEndTime: PropTypes.string.isRequired,
  isPlay: PropTypes.bool.isRequired,
};

export default withContainer(TileInstantPlaybackControlContainer, TileInstantPlaybackControl);

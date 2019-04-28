import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'wisenet-ui/components/molecules';
import { Label } from 'wisenet-ui/components/atoms';
import {
  MediaControlIDList,
  MediaControlIconButtonList as IconList,
} from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import {
  LeftStyled,
  CenterStyled,
  RightStyled,
  IconButtonStyled,
  IconStyled,
  // PlaySpeedSelect,
  SliderDropDownMenuStyled,
  SliderLabelStyled,
} from './MediaControlBarStyled';

const SearchMediaControlBar = props => {
  const {
    playSpeedValue,
    onClick,
    playMode,
    playSpeedIndex,
    isFullscreen,
    timelineFolding,
  } = props;

  const {
    CAPTURE,
    EXPORT,
    SOUND,
    AREA,
    PREV_EVENT,
    BACKWARD,
    PAUSE,
    PLAY,
    FORWARD,
    AFTER_EVENT,
    OSD,
    STATUS,
    ROTATE,
    ASPECT_RATIO,
    FULLSCREEN,
    PLAY_SPEED,
    TIMELINE_FOLD,
    // PLAY_SPEED_LIST,
  } = MediaControlIDList;

  const leftItems = [
    CAPTURE,
    EXPORT,
    SOUND,
  ];
  const centerItems = [
    AREA,
    PREV_EVENT,
    BACKWARD,
    playMode === 'play' ? PAUSE : PLAY,
    FORWARD,
    AFTER_EVENT,
  ];
  const rightItems = [
    OSD,
    STATUS,
    ROTATE,
    ASPECT_RATIO,
    FULLSCREEN,
    TIMELINE_FOLD,
  ];

  // const options = PLAY_SPEED_LIST.map(playSpeed => (
  //   <option
  //     key={playSpeed}
  //     value={playSpeed}
  //   >
  //     {playSpeed}
  //   </option>
  // ));
  const numbers = {
    0: 'x1/8',
    1: 'x1/4',
    2: 'x1/2',
    3: 'x1',
    4: 'x2',
    5: 'x4',
    6: 'x8',
    7: 'x16',
    8: 'x32',
    9: 'x64',
  };

  const dropdownMenuItems = [
    (
      <Slider
        vertical
        min={0}
        max={9}
        defaultValue={playSpeedIndex}
        dots
        marks={numbers}
        included={false}
        dotStyle={{ display: 'none' }}
        disableTooltip
        onChange={onClick(PLAY_SPEED)}
        key="searchSlider"
      />
    ),
  ];

  return (
    <React.Fragment>
      <LeftStyled>
        {leftItems.map(item => (
          <IconButtonStyled onClick={onClick(IconList[item].clickId)} key={IconList[item].iconId}>
            <IconStyled className={`${IconList[item].iconId}`} />
          </IconButtonStyled>
        ))}
      </LeftStyled>
      <CenterStyled>
        {centerItems.map(item => (
          <IconButtonStyled onClick={onClick(IconList[item].clickId)} key={IconList[item].iconId}>
            <IconStyled className={`${IconList[item].iconId}`} />
          </IconButtonStyled>
        ))}
        <SliderDropDownMenuStyled
          menuItems={dropdownMenuItems}
        >
          <SliderLabelStyled>
            <Label>{playSpeedValue}</Label>
          </SliderLabelStyled>
        </SliderDropDownMenuStyled>
        {/* <PlaySpeedSelect
          onChange={onClick(PLAY_SPEED)}
          value={playSpeedValue}
        >
          {options}
        </PlaySpeedSelect> */}
      </CenterStyled>
      <RightStyled>
        {rightItems.map(item => {
          if (item === 'tilelineFold') {
            if (!isFullscreen) {
              return null;
            }
            return (
              <IconButtonStyled
                onClick={onClick(IconList[item].clickId)}
                key={IconList[item].iconId}
              >
                <IconStyled className={`${IconList[item].iconId}-${timelineFolding ? 'up' : 'down'}`} />
              </IconButtonStyled>
            );
          }
          return (
            <IconButtonStyled onClick={onClick(IconList[item].clickId)} key={IconList[item].iconId}>
              <IconStyled className={`${IconList[item].iconId}`} />
            </IconButtonStyled>
          );
        })}
      </RightStyled>
    </React.Fragment>
  );
};

SearchMediaControlBar.defaultProps = {
  playSpeedValue: 'x1',
  playSpeedIndex: 3,
  isFullscreen: false,
  timelineFolding: false,
};

SearchMediaControlBar.propTypes = {
  playSpeedValue: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  playMode: PropTypes.oneOf([MediaControlIDList.PAUSE, MediaControlIDList.PLAY, 'stop']).isRequired,
  playSpeedIndex: PropTypes.number,
  isFullscreen: PropTypes.bool,
  timelineFolding: PropTypes.bool,
};

export default SearchMediaControlBar;

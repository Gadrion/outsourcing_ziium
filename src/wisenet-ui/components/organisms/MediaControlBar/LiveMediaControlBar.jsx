import React from 'react';
import PropTypes from 'prop-types';
import {
  MediaControlIDList,
  MediaControlIconButtonList as IconList,
} from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import { PatternSelect } from 'wisenet-ui/components/organisms';
import {
  LeftStyled,
  RightStyled,
  IconButtonStyled,
  IconStyled,
  LayoutPageInput,
  LayoutPageLabel,
  DropDownMenuStyled,
} from './MediaControlBarStyled';

const LiveMediaControlBar = props => {
  const {
    onClick,
    layoutPageInputValue,
    layoutPageLimitValue,
    recordState,
  } = props;

  const {
    RECORD,
    EXPORT,
    SOUND,
    ALARM,
    OSD,
    CH_INFO,
    STATUS,
    LAYOUT_PAGE_LEFT,
    LAYOUT_PAGE_INPUT,
    LAYOUT_PAGE_RIGHT,
    PATTERN,
    ASPECT_RATIO,
    FULLSCREEN,
  } = MediaControlIDList;

  const leftItems = [
    RECORD,
    EXPORT,
    SOUND,
    ALARM,
  ];

  const rightItems = [
    OSD,
    CH_INFO,
    STATUS,
    LAYOUT_PAGE_LEFT,
    LAYOUT_PAGE_INPUT,
    'layoutPageLimitValue',
    LAYOUT_PAGE_RIGHT,
    PATTERN,
    ASPECT_RATIO,
    FULLSCREEN,
  ];

  const dropdownMenuItems = [
    (
      <PatternSelect
        key="patternSelect"
        onClick={type => onClick(PATTERN)({
          target: {
            value: type,
          },
        })}
      />
    ),
  ];

  return (
    <React.Fragment>
      <LeftStyled>
        {leftItems.map(item => (
          <IconButtonStyled onClick={onClick(IconList[item].clickId)} key={IconList[item].iconId}>
            <IconStyled isActive={item === RECORD && recordState} className={`${IconList[item].iconId}`} />
          </IconButtonStyled>
        ))}
      </LeftStyled>
      <RightStyled>
        {rightItems.map(item => {
          if (item === LAYOUT_PAGE_INPUT) {
            return (
              <LayoutPageInput
                value={layoutPageInputValue}
                key={item}
                onChange={onClick(item)}
              />
            );
          }
          if (item === 'layoutPageLimitValue') {
            return (
              <LayoutPageLabel key={item}>
                {`/ ${layoutPageLimitValue}`}
              </LayoutPageLabel>
            );
          }
          if (item === PATTERN) {
            return (
              <DropDownMenuStyled
                menuItems={dropdownMenuItems}
                key={IconList[item].iconId}
              >
                <IconButtonStyled>
                  <IconStyled className={`${IconList[item].iconId}`} />
                </IconButtonStyled>
              </DropDownMenuStyled>
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

LiveMediaControlBar.defaultProps = {
  layoutPageInputValue: 1,
  layoutPageLimitValue: 1,
  recordState: true,
};

LiveMediaControlBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  layoutPageLimitValue: PropTypes.number,
  layoutPageInputValue: PropTypes.number,
  recordState: PropTypes.bool,
};

export default LiveMediaControlBar;

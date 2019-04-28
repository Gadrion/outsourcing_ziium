import React from 'react';
import PropTypes from 'prop-types';
import {
  MediaControlIDList,
  MediaControlIconButtonList as IconList,
} from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import {
  TileControlBarStyled,
  IconButtonStyled,
  IconStyled,
} from './TileControlBarStyled';

class TileControlBar extends React.PureComponent {
  render() {
    const {
      onClick,
      // disable,
      className,
      pcRecord,
    } = this.props;

    const {
      CAPTURE,
      PC_RECORD,
      INSTANT_PLAYBACK,
      PTZ_CONTROL,
      SETUP,
      SOUND,
      ROTATE,
      ASPECT_RATIO,
    } = MediaControlIDList;

    // const {
    //   capture,
    //   instantPlayback,
    //   ptz,
    //   dZoom,
    //   volume,
    //   aspectRatio,
    // } = disable;

    const buttonItems = [
      CAPTURE,
      PC_RECORD,
      INSTANT_PLAYBACK,
      PTZ_CONTROL,
      SETUP,
      SOUND,
      ROTATE,
      ASPECT_RATIO,
    ];

    return (
      <TileControlBarStyled className={className}>
        {buttonItems.map(item => (
          <IconButtonStyled
            onClick={onClick(IconList[item].clickId)}
            key={IconList[item].iconId}
            // disabled={IconList[item].disabled}
          >
            <IconStyled isActive={item === PC_RECORD && pcRecord} className={`${IconList[item].iconId}`} />
          </IconButtonStyled>
        ))}
      </TileControlBarStyled>
    );
  }
}

TileControlBar.defaultProps = {
  onClick: () => {},
  // disable: {},
  className: null,
  pcRecord: false,
};

TileControlBar.propTypes = {
  onClick: PropTypes.func,
  // disable: PropTypes.oneOfType([PropTypes.any]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  pcRecord: PropTypes.bool,
};

export default TileControlBar;

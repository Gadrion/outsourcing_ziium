import React from 'react';
import PropTypes from 'prop-types';
import tilePTZControlType from 'wisenet-ui/util/static/constants/mediaControl/tilePTZControlType';
import { MediaControlIDList } from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import {
  TilePTZFunctionBarStyled,
  IconButtonStyled,
  IconStyled,
} from './TilePTZFunctionBarStyled';

class TilePTZFunctionBar extends React.PureComponent {
  render() {
    const {
      onClick,
      ptzInfo,
      className,
    } = this.props;

    const {
      MANUAL_TRACKING,
      AUTO_TRACKING,
      AREA_ZOOM,
      RETURN_1X,
      BACK,
    } = tilePTZControlType;

    const {
      CAPTURE,
      INSTANT_PLAYBACK,
      D_ZOOM,
    } = MediaControlIDList;

    const ptzFunctionItems = [
      {
        clickId: BACK,
        iconId: 'wni wni-backmode',
        support: true,
      },
      {
        clickId: CAPTURE,
        iconId: 'wni wni-capture',
        support: true,
      },
      {
        clickId: INSTANT_PLAYBACK,
        iconId: 'wni wni-instant-playback',
        support: true,
      },
      {
        clickId: MANUAL_TRACKING,
        iconId: 'wni wni-tracking-manual',
        support: ptzInfo.manualTracking,
      },
      {
        clickId: AUTO_TRACKING,
        iconId: 'wni wni-tracking-auto',
        support: ptzInfo.digitalAutoTracking,
      },
      {
        clickId: AREA_ZOOM,
        iconId: 'wni wni-areazoom',
        support: ptzInfo.areaZoom,
      },
      {
        clickId: RETURN_1X,
        iconId: 'wni wni-return-1-x',
        support: ptzInfo.areaZoom || ptzInfo.zoom,
      },
      {
        clickId: D_ZOOM,
        iconId: 'wni wni-dzoom',
        support: true,
      },
    ];

    return (
      <TilePTZFunctionBarStyled className={className}>
        {ptzFunctionItems.map(item => item.support && (
          <IconButtonStyled
            onMouseDown={e => { e.stopPropagation(); }}
            onMouseUp={e => { e.stopPropagation(); }}
            onClick={onClick(item.clickId)}
            key={item.iconId}
          >
            <IconStyled className={`${item.iconId}`} />
          </IconButtonStyled>
        ))}
      </TilePTZFunctionBarStyled>
    );
  }
}

TilePTZFunctionBar.defaultProps = {
  onClick: () => {},
  // disable: {},
  className: null,
};

TilePTZFunctionBar.propTypes = {
  onClick: PropTypes.func,
  // disable: PropTypes.oneOfType([PropTypes.any]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  ptzInfo: PropTypes.instanceOf(Object).isRequired,
};

export default TilePTZFunctionBar;

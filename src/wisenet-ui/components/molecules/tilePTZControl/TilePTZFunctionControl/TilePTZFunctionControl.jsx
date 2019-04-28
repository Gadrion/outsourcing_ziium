import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import tilePTZControlType from 'wisenet-ui/util/static/constants/mediaControl/tilePTZControlType';
import {
  TilePTZFunctionWrapperStyled,
  TilePTZFunctionDivStyled,
  TileCenter,
  IconButtonStyled,
  IconStyled,
} from './TilePTZFunctionControlStyled';

class TilePTZFunctionControl extends PureComponent {
  render() {
    const {
      onClick,
      className,
    } = this.props;

    const {
      MANUAL_TRACKING,
      AUTO_TRACKING,
      AREA_ZOOM,
      RETURN_1X,
    } = tilePTZControlType;

    const ptzFunctionItems = [
      {
        clickId: MANUAL_TRACKING,
        iconId: 'wni wni-tracking-manual',
      },
      {
        clickId: AUTO_TRACKING,
        iconId: 'wni wni-tracking-auto',
      },
      {
        clickId: AREA_ZOOM,
        iconId: 'wni wni-areazoom',
      },
      {
        clickId: RETURN_1X,
        iconId: 'wni wni-return-1-x',
      },
    ];

    return (
      <TilePTZFunctionWrapperStyled className={className}>
        {ptzFunctionItems.map(item => (
          <TilePTZFunctionDivStyled key={item.iconId}>
            <IconButtonStyled
              onClick={onClick(item.clickId)}
            >
              <IconStyled className={`tui ${item.iconId}`} />
            </IconButtonStyled>
          </TilePTZFunctionDivStyled>
        ))}
        <TileCenter>+</TileCenter>
      </TilePTZFunctionWrapperStyled>
    );
  }
}

TilePTZFunctionControl.defaultProps = {
  onClick: () => {},
  className: null,
};

TilePTZFunctionControl.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default TilePTZFunctionControl;

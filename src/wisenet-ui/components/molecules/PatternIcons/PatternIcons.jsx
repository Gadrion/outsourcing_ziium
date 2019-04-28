import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PatternIcon } from 'wisenet-ui/components/atoms';
import {
  PatternIconsStyled,
  IconButtonStyled,
  IconStyled,
} from './PatternIconsStyled';

class PatternIcons extends Component {
  patternIconsItem = {
    '4_3': [
      {
        clickId: '4_2X2',
      },
      {
        clickId: '4_3X3',
      },
      {
        clickId: '4_1+5',
      },
      {
        clickId: '4_1+7',
      },
    ],
    '16_9': [
      {
        clickId: '16_1X2',
      },
      {
        clickId: '16_2X1',
      },
      {
        clickId: '16_1X3',
      },
      {
        clickId: '16_3X2',
      },
      {
        clickId: 'dynamic',
        iconId: 'wni-monitoring',
      },
    ],
  }

  render() {
    const { type, onClick } = this.props;
    const items = this.patternIconsItem[type];
    return (
      <PatternIconsStyled>
        {items.map(item => {
          if (item.clickId === 'dynamic') {
            return (
              <IconButtonStyled onClick={() => onClick(item.clickId)} key={`Icon-${item.clickId}`}>
                <IconStyled className={`wni ${item.iconId}`} />
              </IconButtonStyled>
            );
          }
          return (
            <IconButtonStyled onClick={() => onClick(item.clickId)} key={`Icon-${item.clickId}`}>
              <PatternIcon type={item.clickId} />
            </IconButtonStyled>
          );
        })}
      </PatternIconsStyled>
    );
  }
}

PatternIcons.defaultProps = {
  type: '4_3',
};

PatternIcons.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default PatternIcons;

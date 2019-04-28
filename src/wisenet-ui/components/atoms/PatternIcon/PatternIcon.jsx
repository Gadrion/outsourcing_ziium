import React from 'react';
import PropTypes from 'prop-types';
import staticLayoutPattern from 'wisenet-ui/util/static/constants/layoutPattern/staticLayoutPattern';
import {
  PatternIconTile,
  PatternIconLayout,
} from './PatternIconStyled';

const PatternIcon = ({ type }) => {
  const { cols, rows, items } = staticLayoutPattern[type];
  const widthRatio = 100 / cols;
  const heightRatio = 100 / rows;

  return (
    <PatternIconLayout size={25}>
      {items.map(item => (
        <PatternIconTile
          {...item}
          widthRatio={widthRatio}
          heightRatio={heightRatio}
          key={`PatternIconTile-${item.x}-${item.y}`}
        />
      ))}
    </PatternIconLayout>
  );
};

PatternIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PatternIcon;

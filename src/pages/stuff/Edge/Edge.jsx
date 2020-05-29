import React from 'react';
import { bool, node } from 'prop-types';
import { EdgeStyled } from './EdgeStyled';

const Edge = ({
  children,
  top, left, bottom, right, ...rest
}) => (
  <EdgeStyled top={top} left={left} bottom={bottom} right={right} {...rest}>
    {children}
  </EdgeStyled>
);

Edge.defaultProps = {
  top: null,
  left: null,
  bottom: null,
  right: null,
};

Edge.propTypes = {
  top: bool,
  left: bool,
  bottom: bool,
  right: bool,
  children: node.isRequired,
};

export default Edge;

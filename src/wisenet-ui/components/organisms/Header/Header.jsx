import React from 'react';
import PropTypes from 'prop-types';
import { Logo } from 'wisenet-ui/components/atoms';
import {
  HeaderStyled,
  LeftStyled,
  CenterStyled,
  RightStyled,
} from './HeaderStyled';

const Header = ({
  nodeCenter,
  nodeRight,
  className,
}) => (
  <HeaderStyled
    className={className}
  >
    <LeftStyled>
      <Logo />
    </LeftStyled>
    <CenterStyled>
      {nodeCenter}
    </CenterStyled>
    <RightStyled>
      {nodeRight}
    </RightStyled>
  </HeaderStyled>
);


Header.propTypes = {
  nodeCenter: PropTypes.node,
  nodeRight: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

Header.defaultProps = {
  nodeCenter: null,
  nodeRight: null,
  className: null,
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import { Span } from 'wisenet-ui/components/atoms';
import { Container, TitleWrapper, CloseButtonStyled } from './HeaderStyled';

const Header = ({ langData, onClose }) => (
  <Container>
    <TitleWrapper>
      <Span>{langData[0]}</Span>
    </TitleWrapper>
    <CloseButtonStyled onClick={onClose}>
      <i className="tui tui-close" />
    </CloseButtonStyled>
  </Container>
);

Header.defaultProps = {
  onClose: () => {},
};

Header.propTypes = {
  onClose: PropTypes.func,
  langData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;

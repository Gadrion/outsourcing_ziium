import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'wisenet-ui/components/atoms';
import { Container, ButtonWrapper } from './FooterStyled';

const Footer = ({ onConfirm, onCancel, langData }) => (
  <Container>
    <ButtonWrapper>
      <Button onClick={onConfirm}>{langData[0]}</Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button onClick={onCancel}>{langData[1]}</Button>
    </ButtonWrapper>
  </Container>
);

Footer.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

Footer.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  langData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './BodyStyled';

const Body = ({ contents }) => (
  <Container>
    {contents}
  </Container>
);

Body.defaultProps = {
  contents: null,
};

Body.propTypes = {
  contents: PropTypes.element,
};

export default Body;

import React from 'react';
import PropTypes from 'prop-types';
import { SpanStyled } from './SpanStyled';

const Span = props => {
  const {
    children,
  } = props;
  return (
    <SpanStyled {...props}>
      {children}
    </SpanStyled>
  );
};

Span.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Span;

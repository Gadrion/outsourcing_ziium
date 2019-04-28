import React from 'react';
import PropTypes from 'prop-types';
import {
  LoginTemplateStyled,
  LoginFormStyled,
} from './LoginTemplateStyled';

const LoginTemplate = ({
  children,
}) => (
  <LoginTemplateStyled>
    <LoginFormStyled>
      {children}
    </LoginFormStyled>
  </LoginTemplateStyled>
);

LoginTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginTemplate;

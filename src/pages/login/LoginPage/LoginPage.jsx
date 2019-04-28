import React from 'react';
import PropTypes from 'prop-types';
import { LoginPageContainer } from 'containers/pages';
import { LoginTemplate } from 'templates';
import { LoginForm } from 'wisenet-ui/components/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';

const LoginPage = ({ handleSubmit }) => (
  <LoginTemplate>
    <LoginForm onSubmit={handleSubmit} />
  </LoginTemplate>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withContainer(LoginPageContainer, LoginPage);

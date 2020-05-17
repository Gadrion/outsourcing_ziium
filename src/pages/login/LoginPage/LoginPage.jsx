import React from 'react';
import PropTypes from 'prop-types';
import { LoginPageContainer } from 'containers/pages';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TextField } from '@material-ui/core';
import { LoginContainerStyled, LoginTitleStyled, LoginButtonStyled } from './LoginPageStyled';

const LoginPage = ({ onChange, onKeyDown, onClick }) => (
  <LoginContainerStyled noValidate autoComplete="off" onKeyDown={onKeyDown}>
    <LoginTitleStyled>Login</LoginTitleStyled>
    <TextField label="ID" autoFocus={true} onChange={onChange('id')}/>
    <TextField label="Password" type="password" onChange={onChange('password')}/>
    <LoginButtonStyled variant="outlined" fullWidth onClick={onClick}>Login</LoginButtonStyled>
  </LoginContainerStyled>
);

LoginPage.propTypes = {
};

export default withContainer(LoginPageContainer, LoginPage);

import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLogin
      ? <Component {...props} />
      : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.any]).isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    isLogin: state.loginModule.get('isLogin'),
  }),
)(PrivateRoute);

import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { Auth } from 'util/lib';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (Auth.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default PrivateRoute;

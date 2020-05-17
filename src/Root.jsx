import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { PrivateRoute } from 'routes';
import { StylesProvider } from "@material-ui/core/styles";
import {
  LoginPage,
  HelpPage,
  MainPage,
  PreLoader,
} from 'pages';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <PreLoader>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute component={MainPage} />
          </Switch>
        </PreLoader>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export default Root;

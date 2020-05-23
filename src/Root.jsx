import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { PrivateRoute } from 'routes';
import { StylesProvider } from "@material-ui/core/styles";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import {
  LoginPage,
  HelpPage,
  MainPage,
  PreLoader,
} from 'pages';

import * as firebase from 'firebase';
import { config } from "./firebase/config";

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <StylesProvider injectFirst>
          <PreLoader>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <PrivateRoute component={MainPage} />
            </Switch>
          </PreLoader>
        </StylesProvider>
      </FirebaseDatabaseProvider>
    </BrowserRouter>
  </Provider>
);

export default Root;

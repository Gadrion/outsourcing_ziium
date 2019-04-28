import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { PrivateRoute } from 'routes';
import {
  LoginPage,
  HelpPage,
  MainPage,
  PreLoader,
} from 'pages';

const Root = () => (
  <Provider store={store}>
    {/* <BrowserRouter basename="/gdjung/NVR_Project/dev/build/index.html"> */}
    <BrowserRouter>
      <PreLoader>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/help" component={HelpPage} />
          <PrivateRoute component={MainPage} />
        </Switch>
      </PreLoader>
    </BrowserRouter>
  </Provider>
);

export default Root;

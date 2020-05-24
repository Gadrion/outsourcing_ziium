import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  WorkPage,
  SearchPage,
} from 'pages';
// import { LangActions } from 'store/actionCreators';

class MainRoutes extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Switch>
        <Route path="/work" component={WorkPage} />
        <Route path="/search" component={SearchPage} />
        <Redirect path="/" to="/work" />
      </Switch>
    );
  }
}

export default MainRoutes;

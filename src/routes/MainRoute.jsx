import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  LivePage,
  SearchPage,
  SetupPage,
} from 'pages';
import { LangActions } from 'store/actionCreators';
// import NavigationBar from 'components/Common';
// import LiveRoutes from '../containers/pages/Live';
// import PlaybackRoutes from '../containers/pages/Playback';
// import SetupRoutes from '../containers/pages/Setup';

class MainRoutes extends React.Component {
  componentDidMount() {
    LangActions.getCurrentLanguage();
  }

  render() {
    return (
      <Switch>
        <Route path="/live" component={LivePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/setup" component={SetupPage} />
        <Redirect path="/" to="/live" />
      </Switch>
    );
  }
}

export default MainRoutes;

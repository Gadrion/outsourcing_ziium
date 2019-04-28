import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
// import SetupLayoutContainer from 'containers/Setup';
import {
  VideoProfilePage,
  DateTimePage,
  DevicePage,
  IvaPage,
  NetworkPage,
  TabExamplePage,
  SliderExamplePage,
  SchedulerExamplePage,
  TableExamplePage,
  LanguagePage,
  TimelineExamplePage,
  VideoSetupPage,
  TileBarPage,
} from 'pages';

const SETUP_COMPONENT = {
  VideoProfilePage,
  DateTimePage,
  DevicePage,
  IvaPage,
  NetworkPage,
  TabExamplePage,
  SliderExamplePage,
  SchedulerExamplePage,
  TableExamplePage,
  LanguagePage,
  TimelineExamplePage,
  VideoSetupPage,
  TileBarPage,
};

const setRoute = data => (
  data.map(item => {
    if (item.isSupport) {
      if (Object.prototype.hasOwnProperty.call(item, 'childs')) {
        return setRoute(item.childs);
      }
      if (Object.prototype.hasOwnProperty.call(item, 'page')) {
        return (<Route key={item.id} path={item.link} component={SETUP_COMPONENT[item.page]} />);
      }
    }
    return null;
  })
);

const SetupRoute = ({ data }) => (
  <Switch>
    {setRoute(data)}
    <Redirect path="/" to="/setup/basic/videoProfile" />
  </Switch>
);

SetupRoute.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};

export default SetupRoute;

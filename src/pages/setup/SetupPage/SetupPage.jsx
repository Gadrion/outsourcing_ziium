import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SetupPageContainer } from 'containers/pages';
import { SetupRoute } from 'routes';
import { SideMenu, FlexiblePage } from 'wisenet-ui/components/organisms';

const defaultPath = ['basic'];

const SetupPage = ({
  setupMenu,
  location,
  // sidebarPosition,
}) => (
  <FlexiblePage
    defaultSideWidth={316}
    sideComponent={(
      <SideMenu data={setupMenu} location={location} defaultPath={defaultPath} />
    )}
  >
    <SetupRoute data={setupMenu} />
  </FlexiblePage>
);

SetupPage.propTypes = {
  setupMenu: PropTypes.instanceOf(Array),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  // sidebarPosition: PropTypes.string,
};

SetupPage.defaultProps = {
  setupMenu: [],
  // sidebarPosition: 'left',
};

export default withContainer(SetupPageContainer, SetupPage);

import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { PageTemplate } from 'templates';
import { HelpPageContainer } from 'containers/pages';
import {
  HelpPageStyled,
  HeaderStyled,
  SpanStyled,
} from './HelpPageStyled';

const HelpPage = () => (
  <HelpPageStyled>
    <HeaderStyled
      nodeRight={(
        <SpanStyled>Online Help</SpanStyled>
      )}
    />
    <PageTemplate
      sidebar={(
        <span>Sidebar</span>
        // <SideMenu data={setupMenu} location={location} defaultPath={defaultPath} />
      )}
    >
      {'Contents'}
    </PageTemplate>
  </HelpPageStyled>
);

export default withContainer(HelpPageContainer, HelpPage);

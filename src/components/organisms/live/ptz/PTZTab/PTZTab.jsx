import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Map } from 'immutable';
import { Tab } from 'wisenet-ui/components/atoms';
import { Tabs } from 'wisenet-ui/components/organisms';
import { PTZTabContainer } from 'containers/organisms';
import {
  PTZFocusZoomController,
  PTZPreset,
  PTZSwing,
  PTZGroup,
  PTZPresetTour,
  PTZPresetTrace,
} from 'components/organisms';
import {
  Container,
  DisableMask,
  ZoomFocusWrapper,
  TabWrapper,
} from './PTZTabStyled';

const tabData = [
  {
    key: 'tab_preset',
    header: 'TITLE_PRESET',
    component: (
      <PTZPreset />
    ),
  },
  {
    key: 'tab_swing',
    header: 'TITLE_SWING',
    component: (
      <PTZSwing />
    ),
  },
  {
    key: 'tab_group',
    header: 'TITLE_GROUP',
    component: (
      <PTZGroup />
    ),
  },
  {
    key: 'tab_tour',
    header: 'TITLE_TOUR',
    component: (
      <PTZPresetTour />
    ),
  },
  {
    key: 'tab_trace',
    header: 'TITLE_TRACE',
    component: (
      <PTZPresetTrace />
    ),
  },
];

const PTZTab = ({ selectedChannel, lang }) => {
  let channel = selectedChannel.get('channel');
  channel = typeof channel !== 'undefined' ? channel - 1 : channel;
  const tabArr = tabData.map(tab => (
    <Tab
      key={tab.key}
      header={lang[tab.header]}
      component={React.cloneElement(tab.component, {
        currentChannel: channel + 1,
      })}
    />
  ));

  return (
    <Container id="ptztab_wrapper">
      <DisableMask id="ptz_disable_mask" />
      <ZoomFocusWrapper>
        <PTZFocusZoomController currentChannel={channel} />
      </ZoomFocusWrapper>
      <TabWrapper>
        <Tabs>
          {tabArr}
        </Tabs>
      </TabWrapper>
    </Container>
  );
};

PTZTab.propTypes = {
  selectedChannel: PropTypes.instanceOf(Map),
  lang: PropTypes.instanceOf(Object).isRequired,
};

PTZTab.defaultProps = {
  selectedChannel: Map({}),
};

export default withContainer(PTZTabContainer, PTZTab);

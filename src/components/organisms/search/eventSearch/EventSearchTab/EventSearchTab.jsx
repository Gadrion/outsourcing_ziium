import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, BasicDatePicker } from 'wisenet-ui/components/organisms';
import { TargetDevice } from 'components/organisms';
import { EventSearchTabContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';

const EventSearchTab = ({ data }) => {
  const cameraList = data.toJS().map(camera => (
    {
      id: camera.channel,
      name: camera.channelName,
      icon: 'tui tui-ch-live-chlist',
      additional: ` (${camera.model})`,
    }
  ));

  const menuItems = [
    {
      title: 'Target Device',
      content: <TargetDevice cameraList={cameraList} />,
    },
    {
      title: 'Date',
      content: <BasicDatePicker />,
      style: {
        height: '400px',
      },
    },
  ];

  return (
    <Accordion menus={menuItems} />
  );
};

EventSearchTab.defaultProps = {
  data: [],
};

EventSearchTab.propTypes = {
  data: PropTypes.oneOfType([PropTypes.any]),
};

export default withContainer(EventSearchTabContainer, EventSearchTab);

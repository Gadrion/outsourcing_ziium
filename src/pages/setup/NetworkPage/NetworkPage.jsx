import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { NetworkPageContainer } from 'containers/pages';
import { UmpPlayer } from 'wisenet-ui/components/molecules';

const NetworkPage = ({ sessionKey, connectedCameraList }) => (
  <div style={{ width: 640, height: 480 }}>
    {
      connectedCameraList.length !== 0
        ? <UmpPlayer sessionKey={sessionKey} channel={`${connectedCameraList[0].channel + 1}`} />
        : <p> No connected camera!! </p>
    }
  </div>
);

NetworkPage.propTypes = {
  sessionKey: PropTypes.string.isRequired,
  connectedCameraList: PropTypes.instanceOf(Array).isRequired,
};

export default withContainer(NetworkPageContainer, NetworkPage);

import React from 'react';
import PropTypes from 'prop-types';
import { PosTargetDeviceContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Tree } from 'wisenet-ui/components/organisms';
import {
  Container,
  TreeWrapper,
} from './PosTargetDeviceStyled';

const PosTargetDevice = ({
  posDeviceList,
  onPOSDeviceSelect,
}) => (
  <Container>
    <TreeWrapper>
      <Tree
        treeData={posDeviceList}
        onSelectChanged={onPOSDeviceSelect}
        showCheckbox
        showIcon
        canDrag={false}
      />
    </TreeWrapper>
  </Container>
);

PosTargetDevice.propTypes = {
  posDeviceList: PropTypes.arrayOf(PropTypes.shape({
    DeviceName: PropTypes.string,
    Enable: PropTypes.bool,
    Port: PropTypes.number,
    EventPlaybackStartTime: PropTypes.number,
    EncodingType: PropTypes.string,
    ReceiptEnd: PropTypes.string,
    ReceiptStart: PropTypes.string,
    ChannelIDList: PropTypes.arrayOf(PropTypes.string),
  })),
  onPOSDeviceSelect: PropTypes.func.isRequired,
  // lang: PropTypes.object.isRequired,
};

PosTargetDevice.defaultProps = {
  posDeviceList: [{
    DeviceName: '',
    Enable: false,
    Port: 0,
    EventPlaybackStartTime: 0,
    EncodingType: '',
    ReceiptEnd: '',
    ReceiptStart: '',
    ChannelIDList: [],
  }],
};

export default withContainer(PosTargetDeviceContainer, PosTargetDevice);

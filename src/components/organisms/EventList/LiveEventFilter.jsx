import React from 'react';
import PropTypes from 'prop-types';
import { LiveEventFilterContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Tree } from 'wisenet-ui/components/organisms';
import {
  TreeWrapper,
} from './EventListStyled';

const LiveEventFilter = ({
  eventFilterList,
  onEventFilterSelect,
}) => (
  <TreeWrapper>
    <Tree
      treeData={eventFilterList}
      onSelectChanged={onEventFilterSelect}
      showCheckbox
      // showIcon
      canDrag={false}
    />
  </TreeWrapper>
);

LiveEventFilter.propTypes = {
  eventFilterList: PropTypes.arrayOf(PropTypes.shape({
    DeviceName: PropTypes.string,
    Enable: PropTypes.bool,
    Port: PropTypes.number,
    EventPlaybackStartTime: PropTypes.number,
    EncodingType: PropTypes.string,
    ReceiptEnd: PropTypes.string,
    ReceiptStart: PropTypes.string,
    ChannelIDList: PropTypes.arrayOf(PropTypes.string),
  })),
  onEventFilterSelect: PropTypes.func.isRequired,
  // lang: PropTypes.object.isRequired,
};

LiveEventFilter.defaultProps = {
  eventFilterList: [{
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

export default withContainer(LiveEventFilterContainer, LiveEventFilter);

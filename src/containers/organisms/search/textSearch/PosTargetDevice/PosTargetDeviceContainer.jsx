import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextSearchActions } from 'store/actionCreators';

class TargetDeviceContainer extends React.Component {
  posDeviceList = [];

  posSelectedDevices = [];

  constructor(props) {
    super(props);
    TextSearchActions.requestTextSearch({
      requestType: 'GET_POS_CONFIG',
    });
  }

  onPOSDeviceSelect = treeDatas => {
    this.posSelectedDevices = [];
    treeDatas.map(tItem => {
      const treeItem = tItem;
      if (treeItem.checked === 1 || treeItem.checked === 2) {
        if (treeItem.children) {
          if (treeItem.id !== 'all') {
            this.posSelectedDevices.push(treeItem.data.deviceId);
          }
          return {
            id: treeItem.data.deviceId,
            children: this.returnCheckedTreeItem(treeItem.children),
          };
        }
        return treeItem.data.deviceId;
      }
      return null;
    });
    console.log(this.posSelectedDevices);
    TextSearchActions.setCurrentPOSDeviceList(this.posSelectedDevices);
  }

  returnCheckedTreeItem = treeData => {
    const items = treeData.map(tItem => {
      const treeItem = tItem;
      if (treeItem.checked === 1 || treeItem.checked === 2) {
        if (treeItem.children) {
          this.posSelectedDevices.push(treeItem.data.deviceId);
          return {
            id: treeItem.data.deviceId,
            children: this.returnCheckedTreeItem(treeItem.children),
          };
        }
        this.posSelectedDevices.push(treeItem.data.deviceId);
        return treeItem.data.deviceId;
      }
      return null;
    });
    return items;
  }

  convertDevice2TreeData = posConfigList => {
    const list = posConfigList.map(item => ({
      id: item.DeviceName,
      name: item.DeviceName,
      data: {
        deviceId: item.DeviceID,
      },
      checked: 0,
      parents: ['all'],
      icon: {
        type: 'circle',
        color: 'red',
      },
    }));
    return list;
  }

  render() {
    const { render } = this.props;
    const { posConfigList } = this.props;
    this.posDeviceList = [
      {
        id: 'all',
        name: 'All',
        checked: 0,
        data: {},
        expanded: true,
        children: this.convertDevice2TreeData(posConfigList),
      },
    ];
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

TargetDeviceContainer.defaultProps = {
  posConfigList: [{
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

TargetDeviceContainer.propTypes = {
  render: PropTypes.func.isRequired,
  posConfigList: PropTypes.arrayOf(PropTypes.shape({
    DeviceName: PropTypes.string,
    Enable: PropTypes.bool,
    Port: PropTypes.number,
    EventPlaybackStartTime: PropTypes.number,
    EncodingType: PropTypes.string,
    ReceiptEnd: PropTypes.string,
    ReceiptStart: PropTypes.string,
    ChannelIDList: PropTypes.arrayOf(PropTypes.string),
  })),
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    posConfigList: state.textSearchModule.get('posConfigList'),
  }),
)(TargetDeviceContainer);

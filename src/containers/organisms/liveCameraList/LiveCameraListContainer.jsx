import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List as ListImmutable, fromJS, Map } from 'immutable';
import styled from 'styled-components';
import { CameraInfoActions } from 'store/actionCreators';

const I = styled.i`
  display: inline-block;
  margin-right:4px;
  text-align: center;
  font-size:20px;
`;

class LiveCameraListContainer extends React.Component {
  state = {
    data: ListImmutable([]),
  }

  componentDidMount() {
    const {
      cameraList: curPropsListDataTemp,
      onTileCameraList: curAssignedListTemp,
    } = this.props;
    const curPropsListData = curPropsListDataTemp.toJS();
    const curAssignedList = curAssignedListTemp.toJS();

    const cameraListData = curPropsListData.map(item => {
      const remakedItem = {
        id: '',
        text: '',
        data: {
          ipAddress: '',
          model: '',
          status: '',
        },
      };
      if (item.channel !== undefined) {
        if (Number.isNaN(item.channel)) {
          remakedItem.id = item.channel;
        } else {
          remakedItem.id = String(item.channel);
        }
      }
      if (item.channelName !== undefined) {
        remakedItem.text = item.channelName;
      }

      if (curAssignedList.length > 0) {
        for (let i = 0; i < curAssignedList.length; i += 1) {
          if (curAssignedList[i].channel === item.channel) {
            remakedItem.assigned = true;
          }
        }
      }

      if (item.ipAddress !== undefined) {
        remakedItem.data.ipAddress = item.ipAddress;
      }
      if (item.model !== undefined) {
        remakedItem.data.model = item.model;
      }
      if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
        remakedItem.data.status = true;
      }

      if (item.isOpticalPTZ !== undefined) {
        remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
      } else if (item.status === 'Disconnected') {
        remakedItem.iconLeft = <I className="wni wni-camera-box-disconnect" />;
      } else if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
        remakedItem.iconLeft = <I className="wni wni-camera-box-error" />;
      } else if (item.status === 'AuthFail') {
        remakedItem.iconLeft = <I className="wni wni-camera-box-authority" />;
      } else {
        remakedItem.iconLeft = <I className="wni wni-camera-box" />;
      }

      if (item.focused !== undefined) {
        remakedItem.focused = item.focused;
      }

      return remakedItem;
    });
    this.onUpdate(
      fromJS(cameraListData),
    );
  }

  componentDidUpdate(prevProps) {
    const {
      cameraList: curPropsListDataTemp,
      onTileCameraList: curAssignedListTemp,
      focusedCamera: curFocusedCameraTemp,
    } = this.props;
    const {
      cameraList: prevPropsListDataTemp,
      onTileCameraList: prevPropsAssignedListTemp,
      focusedCamera: prevFocusedCameraTemp,
    } = prevProps;
    const prevPropsListData = prevPropsListDataTemp.toJS();
    const curPropsListData = curPropsListDataTemp.toJS();
    const prevPropsAssignedList = prevPropsAssignedListTemp.toJS();
    const curAssignedList = curAssignedListTemp.toJS();
    const prevFocusedCamera = prevFocusedCameraTemp.toJS();
    const curFocusedCamera = curFocusedCameraTemp.toJS();

    if ((JSON.stringify(prevPropsListData) !== JSON.stringify(curPropsListData))
      || (JSON.stringify(prevPropsAssignedList) !== JSON.stringify(curAssignedList))) {
      const cameraListData = curPropsListData.map(item => {
        const remakedItem = {
          id: '',
          text: '',
          data: {
            ipAddress: '',
            model: '',
            status: '',
          },
        };
        if (item.channel !== undefined) {
          if (Number.isNaN(item.channel)) {
            remakedItem.id = item.channel;
          } else {
            remakedItem.id = String(item.channel);
          }
        }
        if (item.channelName !== undefined) {
          remakedItem.text = item.channelName;
        }

        if (curAssignedList.length > 0) {
          for (let i = 0; i < curAssignedList.length; i += 1) {
            if (curAssignedList[i].channel === item.channel) {
              remakedItem.assigned = true;
            }
          }
        }

        if (item.ipAddress !== undefined) {
          remakedItem.data.ipAddress = item.ipAddress;
        }
        if (item.model !== undefined) {
          remakedItem.data.model = item.model;
        }
        if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
          remakedItem.data.status = true;
        }

        if (item.ptzInfo !== undefined) {
          remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
        } else if (item.status === 'Disconnected') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-disconnect" />;
        } else if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-error" />;
        } else if (item.status === 'AuthFail') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-authority" />;
        } else {
          remakedItem.iconLeft = <I className="wni wni-camera-box" />;
        }

        if (item.focused !== undefined) {
          remakedItem.focused = item.focused;
        }

        return remakedItem;
      });
      this.onUpdate(
        fromJS(cameraListData),
      );
    }

    if (JSON.stringify(prevFocusedCamera) !== JSON.stringify(curFocusedCamera)) {
      const cameraListData = curPropsListData.map(item => {
        const remakedItem = {
          id: '',
          text: '',
          data: {
            ipAddress: '',
            model: '',
            status: '',
          },
        };
        if (item.channel !== undefined) {
          if (Number.isNaN(item.channel)) {
            remakedItem.id = item.channel;
          } else {
            remakedItem.id = String(item.channel);
          }
        }
        if (item.channelName !== undefined) {
          remakedItem.text = item.channelName;
        }

        if (curAssignedList.length > 0) {
          for (let i = 0; i < curAssignedList.length; i += 1) {
            if (curAssignedList[i].channel === item.channel) {
              remakedItem.assigned = true;
            }
          }
        }

        if (item.ipAddress !== undefined) {
          remakedItem.data.ipAddress = item.ipAddress;
        }
        if (item.model !== undefined) {
          remakedItem.data.model = item.model;
        }
        if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
          remakedItem.data.status = true;
        }

        if (item.ptzInfo !== undefined) {
          remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
        } else if (item.status === 'Disconnected') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-disconnect" />;
        } else if (item.status === 'VideoLoss' || item.status === 'ConnectFail') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-error" />;
        } else if (item.status === 'AuthFail') {
          remakedItem.iconLeft = <I className="wni wni-camera-box-authority" />;
        } else {
          remakedItem.iconLeft = <I className="wni wni-camera-box" />;
        }

        if (Number(curFocusedCamera.channel) === Number(item.channel)) {
          remakedItem.focused = true;
        }

        return remakedItem;
      });
      this.onUpdate(
        fromJS(cameraListData),
      );
    }
  }

  onUpdate = data => (
    this.setState({
      data,
    })
  )

  onDBClickListItem = onTileCameraItems => {
    CameraInfoActions.onTileCameraList({
      selectCameraList: onTileCameraItems,
    });
  }

  onDragListItem = onTileCameraItems => {
    const { setDragTileCamera } = this.props;
    setDragTileCamera(ListImmutable(onTileCameraItems));
  }

  render() {
    const { render } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

LiveCameraListContainer.defaultProps = {
  focusedCamera: [],
  setDragTileCamera: () => {},
};

LiveCameraListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  cameraList: PropTypes.instanceOf(ListImmutable).isRequired,
  onTileCameraList: PropTypes.instanceOf(ListImmutable).isRequired,
  focusedCamera: PropTypes.instanceOf(Map),
  setDragTileCamera: PropTypes.func,
};

export default connect(
  state => {
    const { currentNumber: layoutPageCurrentNumber } = state.liveMediaControlModule.get('layoutPageInfo').toJS();

    return ({
      lang: state.langModule.get('lang'),
      cameraList: state.cameraInfoModule.get('cameraList'),
      onTileCameraList: state.cameraInfoModule.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`),
      focusedCamera: state.cameraInfoModule.get('selectTileCamera'),
    });
  },
)(LiveCameraListContainer);

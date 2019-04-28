import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, fromJS, Map } from 'immutable';
import styled from 'styled-components';
import {
  SearchTimelineActions,
  EventSearchActions,
} from 'store/actionCreators';

const I = styled.i`
  display: inline-block;
  margin-right:4px;
  text-align: center;
  font-size:20px;
`;

class SerachCameraListContainer extends React.Component {
  state = {
    data: List([]),
  }

  componentDidMount() {
    const {
      cameraList: curPropsListDataTemp,
      // onTileCameraList: curAssignedListTemp,
    } = this.props;
    const curPropsListData = curPropsListDataTemp.toJS();
    // const curAssignedList = curAssignedListTemp.toJS();

    const cameraListData = curPropsListData.map(item => {
      const remakedItem = {
        id: '',
        text: '',
        data: {
          ipAddress: '',
          model: '',
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

      // if (curAssignedList.length > 0) {
      //   for (let i = 0; i < curAssignedList.length; i += 1) {
      //     if (curAssignedList[i].channel === item.channel) {
      //       remakedItem.assigned = true;
      //     }
      //   }
      // }

      if (item.ipAddress !== undefined) {
        remakedItem.data.ipAddress = item.ipAddress;
      }
      if (item.model !== undefined) {
        remakedItem.data.model = item.model;
      }

      if (item.ptzInfo !== undefined) {
        remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
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
      currentChannel: curCurrentChannel,
      // onTileCameraList: curAssignedListTemp,
      focusedCamera: curFocusedCameraTemp,
    } = this.props;
    const {
      cameraList: prevPropsListDataTemp,
      currentChannel: prevCurrentChannel,
      // onTileCameraList: prevPropsAssignedListTemp,
      focusedCamera: prevFocusedCameraTemp,
    } = prevProps;
    const prevPropsListData = prevPropsListDataTemp.toJS();
    const curPropsListData = curPropsListDataTemp.toJS();
    // const prevPropsAssignedList = prevPropsAssignedListTemp.toJS();
    // const curAssignedList = curAssignedListTemp.toJS();
    const prevFocusedCamera = prevFocusedCameraTemp.toJS();
    const curFocusedCamera = curFocusedCameraTemp.toJS();

    // if ((JSON.stringify(prevPropsListData) !== JSON.stringify(curPropsListData))
    //   || (JSON.stringify(prevPropsAssignedList) !== JSON.stringify(curAssignedList))) {
    if (JSON.stringify(prevPropsListData) !== JSON.stringify(curPropsListData)) {
      const cameraListData = curPropsListData.map(item => {
        const remakedItem = {
          id: '',
          text: '',
          data: {
            ipAddress: '',
            model: '',
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

        // if (curAssignedList.length > 0) {
        //   for (let i = 0; i < curAssignedList.length; i += 1) {
        //     if (curAssignedList[i].channel === item.channel) {
        //       remakedItem.assigned = true;
        //     }
        //   }
        // }

        if (item.ipAddress !== undefined) {
          remakedItem.data.ipAddress = item.ipAddress;
        }
        if (item.model !== undefined) {
          remakedItem.data.model = item.model;
        }

        if (item.ptzInfo !== undefined) {
          remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
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

        // if (curAssignedList.length > 0) {
        //   for (let i = 0; i < curAssignedList.length; i += 1) {
        //     if (curAssignedList[i].channel === item.channel) {
        //       remakedItem.assigned = true;
        //     }
        //   }
        // }

        if (item.ipAddress !== undefined) {
          remakedItem.data.ipAddress = item.ipAddress;
        }
        if (item.model !== undefined) {
          remakedItem.data.model = item.model;
        }

        if (item.ptzInfo !== undefined) {
          remakedItem.iconLeft = <I className="wni wni-ptz-control" />;
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

    if (JSON.stringify(curCurrentChannel) !== JSON.stringify(prevCurrentChannel)) {
      if (curCurrentChannel !== -1) {
        const { searchDateObj: { year, month, day } } = this.props;

        SearchTimelineActions.setCurrentChannel(curCurrentChannel);
        SearchTimelineActions.getTimeline({
          startDate: new Date(year, month - 1, day),
          type: 'eventTab',
        });
      }
    }
  }

  onUpdate = data => (
    this.setState({
      data,
    })
  )

  onClickListItem = selectedCameraInfo => {
    /**
     * id = 채널
     */
    const { id } = selectedCameraInfo;
    SearchTimelineActions.setCurrentChannel(Number(id));
    const year = (new Date()).getUTCFullYear();
    const month = (new Date()).getMonth() + 1;
    const param = {
      index: Number(id),
      date: `${year}-${month}`,
    };
    EventSearchActions.findRecordingDate(param);
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

SerachCameraListContainer.defaultProps = {
  currentChannel: -1,
  focusedCamera: [],
};

SerachCameraListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  cameraList: PropTypes.instanceOf(List).isRequired,
  currentChannel: PropTypes.number,
  // onTileCameraList: PropTypes.instanceOf(List).isRequired,
  focusedCamera: PropTypes.instanceOf(Map),
  searchDateObj: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default connect(
  state => ({
    cameraList: state.cameraInfoModule.get('cameraList'),
    currentChannel: state.searchTimelineModule.get('currentChannel'),
    // onTileCameraList: state.cameraInfoModule.get('tileCameraList'),
    focusedCamera: state.cameraInfoModule.get('selectTileCamera'),
    searchDateObj: state.eventSearchModule.get('searchDateObj'),
  }),
)(SerachCameraListContainer);

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { PTZControlActions } from 'store/actionCreators';
import tilePTZControlType from 'wisenet-ui/util/static/constants/mediaControl/tilePTZControlType';

const minMove = 8;
const moveLevel = 30;

class TilePTZControlContainer extends React.Component {
  state = {
    openPTZDirectionControl: false,
    openPTZFunctionBar: true,
    ptzMode: 'ptz',
  };

  downCheck = false;

  startPoint = {
    x: 0,
    y: 0,
  };

  curPTZ = {
    pan: 0,
    tilt: 0,
    zoom: 0,
  };

  zoomTimer = null;

  componentDidMount() {
    const { ptzInfo } = this.props;
    this.setState({
      openPTZDirectionControl: ptzInfo.pan || ptzInfo.tilt,
    });
  }

  stopPTZ = () => {
    const { currentChannel } = this.props;
    PTZControlActions.requestPtzControl({
      requestType: 'CONTROL_STOP',
      params: {
        Channel: currentChannel,
      },
    });
    this.zoomTimer = null;
    this.delta = 0;
  }

  onTilePTZControlEvent = type => event => {
    event.stopPropagation();
    // console.log('onTilePTZControlEvent::', type);
    switch (type) {
      case 'down': {
        if (event.button === 2) return;
        this.setState({ openPTZDirectionControl: false });
        this.startPoint.x = event.nativeEvent.offsetX;
        this.startPoint.y = event.nativeEvent.offsetY;
        this.downCheck = true;
        break;
      }
      case 'move': {
        if (this.downCheck) {
          const { ptzMode } = this.state;
          if (ptzMode === tilePTZControlType.AREA_ZOOM) return;
          let pan = 0;
          let tilt = 0;
          const moveX = this.startPoint.x - event.nativeEvent.offsetX;
          const moveY = this.startPoint.y - event.nativeEvent.offsetY;
          // console.log(moveX, moveY);

          if (moveX < -minMove) { // left -> right
            if (moveX < -moveLevel * 6) pan = 6;
            else if (moveX < -moveLevel * 5) pan = 5;
            else if (moveX < -moveLevel * 4) pan = 4;
            else if (moveX < -moveLevel * 3) pan = 3;
            else if (moveX < -moveLevel * 2) pan = 2;
            else pan = 1;
          } else if (moveX > minMove) { // right -> left
            if (moveX > moveLevel * 6) pan = -6;
            else if (moveX > moveLevel * 5) pan = -5;
            else if (moveX > moveLevel * 4) pan = -4;
            else if (moveX > moveLevel * 3) pan = -3;
            else if (moveX > moveLevel * 2) pan = -2;
            else pan = -1;
          }

          if (moveY < -minMove) { // top -> bottom
            if (moveY < -moveLevel * 6) tilt = -6;
            else if (moveY < -moveLevel * 5) tilt = -5;
            else if (moveY < -moveLevel * 4) tilt = -4;
            else if (moveY < -moveLevel * 3) tilt = -3;
            else if (moveY < -moveLevel * 2) tilt = -2;
            else tilt = -1;
          } else if (moveY > minMove) { // bottom -> top
            if (moveY > moveLevel * 6) tilt = 6;
            else if (moveY > moveLevel * 5) tilt = 5;
            else if (moveY > moveLevel * 4) tilt = 4;
            else if (moveY > moveLevel * 3) tilt = 3;
            else if (moveY > moveLevel * 2) tilt = 2;
            else tilt = 1;
          }
          if (this.curPTZ.pan !== pan || this.curPTZ.tilt !== tilt) {
            this.curPTZ.pan = pan;
            this.curPTZ.tilt = tilt;
            this.startPTZ(pan, tilt, 0);
          }
        }
        break;
      }
      case 'leave':
      case 'up': {
        if (!this.downCheck) return;
        this.downCheck = false;
        this.setState({ openPTZDirectionControl: true });

        const { ptzMode } = this.state;

        if (ptzMode === tilePTZControlType.AREA_ZOOM) {
          this.startAreaZoom(this.startPoint.x, this.startPoint.y,
            event.nativeEvent.offsetX, event.nativeEvent.offsetY,
            event.currentTarget.clientWidth, event.currentTarget.clientHeight);
          return;
        }
        // ptz Mode
        if (Math.abs(this.startPoint.x - event.nativeEvent.offsetX) <= minMove
        && Math.abs(this.startPoint.y - event.nativeEvent.offsetY) <= minMove) {
          // click 위치로 이동
          this.startPoint.x = event.nativeEvent.offsetX;
          this.startPoint.y = event.nativeEvent.offsetY;
          this.startAreaZoom(this.startPoint.x, this.startPoint.y,
            event.nativeEvent.offsetX, event.nativeEvent.offsetY,
            event.currentTarget.clientWidth, event.currentTarget.clientHeight);
        } else {
          this.stopPTZ();
        }
        break;
      }
      case 'wheel': {
        const zoom = event.deltaY < 0 ? 2 : -2;
        if (!this.zoomTimer) {
          this.zoomTimer = setTimeout(this.stopPTZ, 800);
          this.startPTZ(0, 0, zoom);
        } else {
          this.resetZoomTimer();
          if (zoom !== this.curPTZ.zoom) {
            this.startPTZ(0, 0, zoom);
          }
        }
        break;
      }
      default:
        break;
    }
  }

  startAreaZoom = (x1, y1, x2, y2, tileWidth, tileHeight) => {
    const { currentChannel } = this.props;
    const areaZoomParam = {
      Channel: currentChannel,
      X1: x1,
      Y1: y1,
      X2: x2,
      Y2: y2,
      TileWidth: tileWidth,
      TileHeight: tileHeight,
    };

    PTZControlActions.requestPtzControl({
      requestType: 'CONTROL_AREAZOOM',
      params: areaZoomParam,
    });
  }

  startPTZ = (pan, tilt, zoom) => {
    const { currentChannel } = this.props;
    const continuousParam = {
      Channel: currentChannel,
      Pan: pan,
      Tilt: tilt,
      Zoom: zoom,
    };

    this.curPTZ.pan = pan;
    this.curPTZ.tilt = tilt;
    this.curPTZ.zoom = zoom;

    PTZControlActions.requestPtzControl({
      requestType: 'CONTROL_CONTINUOUS',
      params: continuousParam,
    });
  }

  // 연속적으로 Wheel Event 발생 시, 마지막 Event에 대해 Zoom Stop 하기 위해 Timer Reset
  resetZoomTimer = () => {
    clearTimeout(this.zoomTimer);
    this.zoomTimer = setTimeout(this.stopPTZ, 800);
  }

  onTilePTZDirectionMouseDown = type => event => {
    event.stopPropagation();
    const { currentChannel } = this.props;
    const continuousParam = {
      Channel: currentChannel,
      Pan: 0,
      Tilt: 0,
    };
    switch (type) {
      case tilePTZControlType.TOP_LEFT:
        continuousParam.Pan = -1;
        continuousParam.Tilt = 1;
        break;
      case tilePTZControlType.TOP:
        continuousParam.Tilt = 1;
        break;
      case tilePTZControlType.TOP_RIGHT:
        continuousParam.Pan = 1;
        continuousParam.Tilt = 1;
        break;
      case tilePTZControlType.RIGHT:
        continuousParam.Pan = 1;
        break;
      case tilePTZControlType.BOTTOM_RIGHT:
        continuousParam.Pan = 1;
        continuousParam.Tilt = -1;
        break;
      case tilePTZControlType.BOTTOM:
        continuousParam.Tilt = -1;
        break;
      case tilePTZControlType.BOTTOM_LEFT:
        continuousParam.Pan = -1;
        continuousParam.Tilt = -1;
        break;
      case tilePTZControlType.LEFT:
        continuousParam.Pan = -1;
        break;
      default:
        break;
    }
    PTZControlActions.requestPtzControl({
      requestType: 'CONTROL_CONTINUOUS',
      params: continuousParam,
    });
  }

  onTilePTZDirectionMouseUp = () => event => {
    event.stopPropagation();
    this.stopPTZ();
  }

  setAutoTracking = type => {
    const { currentChannel } = this.props;
    const { ptzMode } = this.state;
    const enable = (ptzMode !== type);
    const autoTrackingParam = {
      Channel: currentChannel,
      Enable: enable ? 'True' : 'False',
    };

    this.setState({
      ptzMode: enable ? type : 'ptz',
    });

    PTZControlActions.requestPtzControl({
      requestType: 'SET_AUTOTRACKING',
      params: autoTrackingParam,
    });
  }

  setAreaZoom = type => {
    const { ptzMode } = this.state;
    this.setState({
      ptzMode: (ptzMode !== type) ? type : 'ptz',
    });
  }

  setReturnX1 = () => {
    const { currentChannel, ptzInfo } = this.props;
    if (ptzInfo.areaZoom) {
      const areaZoomX1Param = {
        Channel: currentChannel,
        Type: '1x',
      };
      PTZControlActions.requestPtzControl({
        requestType: 'CONTROL_AREAZOOM',
        params: areaZoomX1Param,
      });
    } else {
      this.startPTZ(0, 0, -4);
    }
  }

  onTilePTZFunctionEvent = type => event => {
    event.stopPropagation();
    // console.log('onTilePTZFunctionClick::', type);
    switch (type) {
      case tilePTZControlType.MANUAL_TRACKING:
        break;
      case tilePTZControlType.AUTO_TRACKING: {
        this.setAutoTracking(type);
        break;
      }
      case tilePTZControlType.AREA_ZOOM:
        this.setAreaZoom(type);
        break;
      case tilePTZControlType.RETURN_1X:
        this.setReturnX1();
        break;
      case tilePTZControlType.BACK: {
        const { returnTileMode } = this.props;
        returnTileMode();
        break;
      }
      default:
        break;
    }
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

TilePTZControlContainer.propTypes = {
  render: PropTypes.func.isRequired,
  currentChannel: PropTypes.number,
  returnTileMode: PropTypes.func.isRequired,
  ptzInfo: PropTypes.instanceOf(Object).isRequired,
  // attributesLoaded: PropTypes.bool,
  // attributes: PropTypes.instanceOf(Object),
};

TilePTZControlContainer.defaultProps = {
  currentChannel: 1,
  // attributesLoaded: false,
  // attributes: {},
};

export default TilePTZControlContainer;
// export default connect(
//   state => ({
//     // attributes: state.sunapiModule.get('attributes'),
//     // attributesLoaded: state.sunapiModule.get('loaded'),
//   }),
// )(TilePTZControlContainer);

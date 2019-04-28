import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CameraInfoActions, LiveMediaControlActions } from 'store/actionCreators';
import { Map, List } from 'immutable';

class LiveVideoLayoutContainer extends React.Component {
  state = {
    tileList: [],
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      dragTileCameraList: prevDragTileCameraList,
      layoutPageCurrentNumber: prevLayoutPageCurrentNumber,
      tileCameraList: prevTileCameraList,
      layoutPagePatternTileCount: prevLayoutPagePatternTileCount,
    } = prevProps;

    const {
      dragTileCameraList,
      layoutPageCurrentNumber,
      tileCameraList,
      layoutPagePatternTileCount,
    } = this.props;

    const { tileList: stateTileList } = this.state;

    const tileList = tileCameraList.toJS();

    if (JSON.stringify(prevDragTileCameraList) !== JSON.stringify(dragTileCameraList)) {
      if (dragTileCameraList.size !== 0) {
        this.onDragTileCameaList({ dragTileCameraList });
      }
    } else if ((prevLayoutPageCurrentNumber !== layoutPageCurrentNumber) || (
      prevLayoutPagePatternTileCount !== layoutPagePatternTileCount)) {
      this.onUpdate({
        tileList: [],
        isReset: true,
      });
    } else if (JSON.stringify(prevTileCameraList) !== JSON.stringify(tileCameraList)) {
      this.onUpdate({
        tileList,
        isReset: false,
      });
    } else if (stateTileList.length === 0 && tileList.length !== 0) {
      this.onUpdate({
        tileList,
        isReset: false,
      });
    }
  }

  selectClick = uid => { // event
    const { layoutPageCurrentNumber } = this.props;
    CameraInfoActions.setSelectTileCamera({ uid, layoutPageCurrentNumber });
  }

  getCurrentTileList = ({ tileList, emptyTileList }) => {
    LiveMediaControlActions.backupLayoutControl({
      needBackupLayoutData: false,
      backupLayout: Map({ tileList, emptyTileList }),
    });
    LiveMediaControlActions.patternControl({ pattern: 'SPECIAL' });
  }

  onDragTileCameaList = ({ dragTileCameraList }) => {
    CameraInfoActions.onTileCameraList({
      selectCameraList: dragTileCameraList.toJS(),
      toItem: dragTileCameraList.size === 1 ? this.moveItem : undefined,
    });

    // tile에 다 비치하면 비우기
    const { setDragTileCamera } = this.props;
    setDragTileCamera();
  }

  setMoveItem = moveItem => {
    this.moveItem = moveItem;
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  render() {
    const { render, selectTileCamera } = this.props;
    const selectUid = selectTileCamera.get('uid');

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        selectUid,
      },
    );
  }
}

LiveVideoLayoutContainer.propTypes = {
  render: PropTypes.func.isRequired,
  tileCameraList: PropTypes.oneOfType([PropTypes.any]).isRequired,
  selectTileCamera: PropTypes.instanceOf(Map).isRequired,
  dragTileCameraList: PropTypes.instanceOf(List).isRequired,
  setDragTileCamera: PropTypes.func.isRequired,
  layoutPageCurrentNumber: PropTypes.number.isRequired,
  layoutPagePatternTileCount: PropTypes.number.isRequired,
};

export default connect(
  state => {
    const { currentNumber: layoutPageCurrentNumber } = state.liveMediaControlModule.get('layoutPageInfo').toJS();
    return (
      {
        tileCameraList: state.cameraInfoModule.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`),
        layoutPageCurrentNumber,
        layoutPagePatternTileCount: state.liveMediaControlModule.get('layoutPageInfo').get('patternTileCount'),
        pattern: state.liveMediaControlModule.get('pattern'),
        type: state.liveMediaControlModule.get('layoutType'),
        selectTileCamera: state.cameraInfoModule.get('selectTileCamera'),
        needBackupLayoutData: state.liveMediaControlModule.get('needBackupLayoutData'),
        backupLayout: state.liveMediaControlModule.get('backupLayout'),
      }
    );
  },
)(LiveVideoLayoutContainer);

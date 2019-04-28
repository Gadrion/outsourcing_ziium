import React from 'react';
import PropTypes from 'prop-types';
import { Map, List, fromJS } from 'immutable';
import staticLayoutPattern from 'wisenet-ui/util/static/constants/layoutPattern/staticLayoutPattern';

class VideoLayoutContainer extends React.Component {
  state = {
    rows: 1,
    cols: 1,
    margin: [0, 0],
    tileList: List([]),
    emptyTileList: List([]),
    height: 900,
    width: 1200,
    // verticalCompact: false,
    isOverTileLength: false,
    preventCollision: true,
    useCSSTransforms: false,
    isDragEnd: true,
  };

  componentDidMount() {
    const { pattern } = this.props;
    this.changePattern(pattern);
  }

  componentDidUpdate(prevProps) { // prevProps, prevState, snapshot
    const {
      pattern: prevPattern,
    } = prevProps;

    const {
      tileList: propsTileList,
      pattern,
      needBackupLayoutData,
      isReset,
    } = this.props;

    const {
      tileList: stateTileList,
      // cols,
      // rows,
      isOverTileLength,
    } = this.state;

    // const {
    //   tileList: prevStateTileList,
    // } = prevState;

    const tileList = stateTileList.toJS();

    const stateTileListLength = tileList.length;

    if (!isOverTileLength && (stateTileListLength < propsTileList.length)) {
      const newTile = propsTileList[stateTileListLength];
      if (newTile.i) { // i는 lib에서 특수한 key값으로 사용
        const findTileIndex = tileList.findIndex(tile => tile.i === newTile.i);
        if (findTileIndex === -1) {
          this.removeLayoutEmpty(newTile.i);
          tileList.push({
            ...newTile,
            empty: false,
            isDraggable: true,
            static: !!newTile.static, // true
          });
        } else {
          tileList[findTileIndex] = {
            ...tileList[findTileIndex],
            ...newTile,
          };
        }

        this.onUpdate({
          tileList: fromJS(tileList),
        });
      } else {
        const emptyCheckArr = this.haveLayoutEmpty();

        if (emptyCheckArr) {
          tileList.push({
            ...emptyCheckArr,
            channel: newTile.channel,
            empty: false,
            isDraggable: true,
            static: !!newTile.static, // true
            uid: newTile.uid,
            // key: `${stateTileListLength}`,
          });
          this.onUpdate({
            tileList: fromJS(tileList),
          });
        } else {
          this.onUpdate({
            isOverTileLength: true,
          });
        }
      }
    } else if (stateTileListLength > propsTileList.length) {
      tileList.some((tile, tileIndex) => {
        const findTile = propsTileList.find(propsTile => (
          propsTile.uid === tile.uid
        ));
        if (!findTile) {
          const {
            emptyTileList: stateEmptyTileList,
          } = this.state;
          const emptyTileList = stateEmptyTileList.toJS();

          const emptyTile = {
            ...tileList.splice(tileIndex, 1)[0],
            channel: null,
            empty: true,
            isDraggable: false,
          };

          emptyTileList.splice(emptyTile.index, 0, emptyTile);
          emptyTileList.sort((a, b) => a.index - b.index);

          this.onUpdate({
            tileList: fromJS(tileList),
            emptyTileList: fromJS(emptyTileList),
            isOverTileLength: false,
          });
          return true;
        }
        return false;
      });
    }

    if (prevPattern !== pattern) {
      const { backupLayout: propsBackupLayout } = this.props;
      this.changePattern(pattern);
      if (propsBackupLayout.size !== 0 && pattern !== 'SPECIAL') {
        const backupLayout = propsBackupLayout.toJS();
        this.onUpdate({
          tileList: fromJS(backupLayout.tileList),
          emptyTileList: fromJS(backupLayout.emptyTileList),
          isOverTileLength: false,
        });
      }
    }

    if (needBackupLayoutData) {
      const { getCurrentTileList } = this.props;
      getCurrentTileList({ ...this.state });
    }

    if (isReset && stateTileListLength !== 0) {
      const patternInfo = staticLayoutPattern[pattern];
      const { items } = patternInfo;

      this.onUpdate({
        tileList: fromJS([]),
        emptyTileList: fromJS(items.map((item, index) => (
          {
            ...item,
            i: `${index.toString()}-${Math.floor((Math.random() * 1000) + 1)}`,
            empty: true,
            isDraggable: false,
            isResizable: false,
            static: false,
            index,
          }
        ))),
      });
    }
  }

  changePattern = pattern => {
    const emptyTileList = [];
    const { tileList: stateTileList } = this.state;
    const tileList = stateTileList.toJS();
    const patternInfo = staticLayoutPattern[pattern];

    const {
      rows,
      cols,
      items,
    } = patternInfo;

    if (pattern === 'SPECIAL') {
      const { selectUid } = this.props;
      const findTile = tileList.find(tile => tile.uid === selectUid);
      this.setState({
        cols,
        rows,
        emptyTileList: fromJS(findTile ? emptyTileList : [{
          ...items[0],
          i: `${0}-${Math.floor((Math.random() * 1000) + 1)}`,
          empty: true,
          isDraggable: false,
          isResizable: false,
          static: false,
          index: 0,
        }]),
        tileList: fromJS(findTile ? [findTile] : []),
      });
    } else {
      items.map((item, index) => {
        const findTileIndex = tileList.findIndex(tile => tile.index === index);
        if (findTileIndex === -1) {
          emptyTileList.push({
            ...item,
            i: `${index.toString()}-${Math.floor((Math.random() * 1000) + 1)}`,
            empty: true,
            isDraggable: false,
            isResizable: false,
            static: false,
            index,
          });
        } else {
          tileList[findTileIndex] = {
            ...tileList[findTileIndex],
            ...item,
          };
        }
        return null;
      });

      this.setState({
        cols,
        rows,
        emptyTileList: fromJS(emptyTileList),
        tileList: fromJS(tileList),
      });
    }
  }

  haveLayoutEmpty = () => {
    const {
      emptyTileList: stateEmptyTileList,
    } = this.state;

    const emptyTileList = stateEmptyTileList.toJS();

    const emptyTile = emptyTileList.shift();
    this.setState({
      emptyTileList: fromJS(emptyTileList),
    });

    return emptyTile;
  }

  removeLayoutEmpty = i => {
    const {
      emptyTileList: stateEmptyTileList,
    } = this.state;

    const emptyTileList = stateEmptyTileList.toJS();
    const findEmptyTileIndex = emptyTileList.findIndex(emptyTile => emptyTile.i === i);
    if (findEmptyTileIndex !== -1) {
      emptyTileList.splice(findEmptyTileIndex, 1);

      this.setState({
        emptyTileList: fromJS(emptyTileList),
      });
    }
  }

  setComponentSize = ({ height, width }) => {
    this.setState({
      height,
      width,
    });
  }

  makeDragItemDragEndEvent = data => (
    new CustomEvent('dragItemDragEnd', {
      bubbles: true,
      cancelable: true,
      detail: data,
    })
  );

  getStaticTile = childDom => {
    if (childDom.className.indexOf('react-grid-item') !== -1
      || childDom.className.indexOf('react-grid-layout') !== -1) {
      return childDom;
    }

    if (!childDom) {
      return null;
    }

    return this.getStaticTile(childDom.parentElement);
  }

  moveCheck = type => (_, oldItem, newItem, p, e, el) => {
    switch (type) {
      case 'dragStart':
        this.setState({ isDragEnd: true });
        break;
      case 'dragStop': {
        const element = el;
        this.setState({ isDragEnd: false });
        element.style.pointerEvents = 'none';
        const findDom = document.elementFromPoint(e.clientX, e.clientY);

        if (findDom && findDom.className.indexOf('react-grid-placeholder') === -1) {
          const findStaticDom = this.getStaticTile(findDom);
          if (findStaticDom) {
            const {
              tileList: stateTileList,
              emptyTileList: stateEmptyTileList,
            } = this.state;

            const allTileList = [...stateTileList.toJS(), ...stateEmptyTileList.toJS()];
            const fromEvent = this.makeDragItemDragEndEvent({
              fromData: allTileList.find(tile => tile.i === oldItem.i),
            });
            const changeEvent = this.makeDragItemDragEndEvent({ isChange: true });

            findStaticDom.dispatchEvent(fromEvent);
            findStaticDom.style.zIndex = '10';
            element.dispatchEvent(changeEvent);
            element.style.zIndex = -1;
            setTimeout(() => {
              const ele = el; // lint error prevention
              ele.style.zIndex = '';
              findStaticDom.style.zIndex = '';
            }, 1000);
          }
        }
        element.style.pointerEvents = 'inherit';
        break;
      }
      default:
        break;
    }
  }

  dragItemDragEnd = event => toData => {
    event.preventDefault();
    const { tileChange } = this;
    tileChange(event.detail.fromData, toData);
  }

  tileChange = (fromData, toData) => {
    const {
      tileList: stateTileList,
      emptyTileList: stateEmptyTileList,
    } = this.state;
    const { tileItemChange } = this;
    const tileList = stateTileList.toJS();
    const emptyTileList = stateEmptyTileList.toJS();
    const dragAfterTileList = tileList.map(tileItemChange(fromData, toData));
    const dragAfterEmptyTileList = emptyTileList.map(tileItemChange(fromData, toData));

    dragAfterEmptyTileList.sort((a, b) => a.index - b.index);
    setTimeout(() => this.onUpdate({
      tileList: fromJS(dragAfterTileList),
      emptyTileList: fromJS(dragAfterEmptyTileList),
    }));
  }

  tileItemChange = (fromData, toData) => tile => {
    if (tile.i === fromData.i) {
      return {
        ...tile,
        x: toData.x,
        y: toData.y,
        w: toData.w,
        h: toData.h,
        index: toData.index,
      };
    }

    if (tile.i === toData.i) {
      return {
        ...tile,
        x: fromData.x,
        y: fromData.y,
        w: fromData.w,
        h: fromData.h,
        index: fromData.index,
      };
    }
    return tile;
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  );

  render() {
    const {
      render,
    } = this.props;

    const {
      height,
      rows,
      cols,
      tileList: stateTileList,
      emptyTileList: stateEmptyTileList,
      width,
    } = this.state;

    const rowHeight = Math.ceil(height / rows);
    const itemWidth = Math.ceil(width / cols);

    const tileList = fromJS([...stateTileList.toJS(), ...stateEmptyTileList.toJS()]);

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        tileList,
        rowHeight,
        itemWidth,
      },
    );
  }
}

VideoLayoutContainer.defaultProps = {
  pattern: 'SPECIAL',
  needBackupLayoutData: false,
  backupLayout: Map({}),
  getCurrentTileList: () => {},
  selectUid: '0',
  isReset: false,
};

VideoLayoutContainer.propTypes = {
  render: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  tileList: PropTypes.oneOfType([PropTypes.any]).isRequired,
  needBackupLayoutData: PropTypes.bool,
  backupLayout: PropTypes.instanceOf(Map),
  getCurrentTileList: PropTypes.func,
  selectUid: PropTypes.string,
  isReset: PropTypes.bool,
};

export default VideoLayoutContainer;

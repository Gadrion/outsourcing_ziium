import React from 'react';
import PropTypes from 'prop-types';
import { List, fromJS } from 'immutable';

class VideoDynamicLayoutContainer extends React.Component {
  state = {
    rows: 1,
    cols: 3,
    rowHeight: 300,
    margin: [0, 0],
    tileList: List([
      // {
      //   i: `left`,
      //   w: 1,
      //   h: 1,
      //   x: 0,
      //   y: 0,
      //   static: false, // true
      // }
    ]),
    height: 900,
    verticalCompact: true,
    // compactType: null, // ver horizontal
    useCSSTransforms: false,
    isDraggable: true,
    isResizable: true,
    width: 1200,
  };

  componentDidUpdate() { // prevProps, prevState, snapshot
    const {
      tileList: propsTileList,
    } = this.props;

    const {
      tileList: stateTileList,
      cols,
      rows,
    } = this.state;

    const tileList = stateTileList.toJS();

    const stateTileListLength = tileList.length;

    if (stateTileListLength < propsTileList.length) {
      const emptyCheckArr = this.haveLayoutEmpty();

      if (emptyCheckArr) {
        const newTile = propsTileList[stateTileListLength];
        tileList.push({
          i: `${stateTileListLength}-${Math.floor((Math.random() * 1000) + 1)}`,
          w: 1,
          h: 1,
          ...newTile,
          ...emptyCheckArr,
          static: !!newTile.static, // true
          key: `${stateTileListLength}`,
        });
        this.onUpdate({
          tileList: fromJS(tileList),
        });
      } else {
        this.onUpdate({
          rows: (cols - 2) > rows ? rows + 1 : rows,
          cols: (cols - 2) <= rows ? cols + 1 : cols,
        });
      }
    } else if (stateTileListLength > propsTileList.length) {
      tileList.some(tile => {
        const findTile = propsTileList.find(propsTile => propsTile.uid === tile.uid);
        if (!findTile) {
          const findTileIndex = tileList.findIndex(findList => findList.i === tile.i);
          tileList.splice(findTileIndex, 1);
          this.dynamicCreationCheck(tileList);

          this.onUpdate({
            tileList: fromJS(tileList),
          });
          return true;
        }
        return false;
      });
    }
  }

  haveLayoutEmpty = () => {
    const {
      tileList,
      cols,
      rows,
    } = this.state;

    const checkArr = Array.from(Array(rows), () => new Array(cols));

    tileList.toJS().map(tile => {
      for (let i = tile.y; i < tile.y + tile.h; i += 1) {
        for (let j = tile.x; j < tile.x + tile.w; j += 1) {
          checkArr[i][j] = true;
        }
      }
      return null;
    });

    for (let i = 0; i < rows; i += 1) {
      for (let j = 1; j < cols - 1; j += 1) {
        if (!checkArr[i][j]) {
          return {
            x: j,
            y: i,
            key: `${i}-${j}`,
          };
        }
      }
    }

    return undefined;
  }

  dynamicCreationCheck = libTileList => {
    const {
      cols: stateCols,
      rows: stateRows,
      tileList: stateTileList,
    } = this.state;

    let cols = 3;
    let rows = 1;
    const tileList = stateTileList.toJS();

    const newTileList = libTileList.map(libTile => {
      const tile = tileList.find(stateTile => stateTile.i === libTile.i);
      const tileRow = tile.y + tile.h;
      const tileCol = tile.x + tile.w + 1;

      rows = tileRow > rows ? tileRow : rows;

      if (tileCol > cols) {
        cols = tileCol;
      } else if (tile.x < 1) {
        cols = stateCols + 1;
      }

      if (tile.x < 1) {
        return {
          ...tile,
          x: tile.x + 1,
          isChange: true,
        };
      }
      return tile;
    });

    // 제한 사항 필요시 반영할 예정
    // const tileListLength = tileList.length;

    // rows = rows > tileListLength + 3 ? tileListLength : rows;
    // cols = cols > tileListLength + 5 ? tileListLength + 2 : cols;

    this.onUpdate({
      rows: stateRows === rows ? stateRows : rows,
      cols: stateCols === cols ? stateCols : cols,
      tileList: fromJS(newTileList),
    });
  }

  dynamicMoveCheck = (tileList, oldItem, newItem) => {
    if (JSON.stringify(oldItem) !== JSON.stringify(newItem)) {
      this.dynamicCreationCheck(tileList);
    }
  }

  setComponentSize = ({ height, width }) => {
    this.setState({
      height,
      width,
    });
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
      width: stateWidth,
      cols,
    } = this.state;


    const rowHeight = Math.round(height / rows);
    const width = Math.round(stateWidth * (cols / (cols - 2)));
    const left = Math.round(width / cols);

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        rowHeight,
        width,
        left,
      },
    );
  }
}

VideoDynamicLayoutContainer.propTypes = {
  render: PropTypes.func.isRequired,
  tileList: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default VideoDynamicLayoutContainer;

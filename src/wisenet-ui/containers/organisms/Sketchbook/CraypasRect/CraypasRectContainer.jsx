import React from 'react';
import PropTypes from 'prop-types';

class CraypasRectContainer extends React.Component {
  state = {
    svgObjects: [],
  };

  isDown = false;

  isLocationMode = false;

  selectedItemIndex = 0;

  isResizeItem = false;

  minimunSize = 30;

  componentDidMount = () => {
    const { objects } = this.props;
    this.setState({
      svgObjects: objects,
    });
  }

  componentDidUpdate = oldProps => {
    // console.log('Base Craypas - componentDidUpdate');
    const newProps = this.props;
    // console.log(oldProps, newProps);
    if (oldProps.objects !== newProps.objects) {
      this.setState({
        svgObjects: newProps.objects,
      });
      // console.log('Base Craypas - componentDidUpdate');
    }
  }

  onResizeButtonMouseDown = () => {
    this.isResizeItem = true;
  }

  onResizeButtonMouseUp = () => {
    this.isResizeItem = false;
  }

  onMouseDown = e => {
    if (e.nativeEvent.button === 0 && this.selectedItemIndex === -1) {
      const { svgObjects } = this.state;
      this.isDown = true;
      const list = [...svgObjects];
      const keyValue = (new Date()).getTime();
      list.push({
        id: `rect-${svgObjects.length}-${keyValue}`,
        key: `rect-${svgObjects.length}-${keyValue}`,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
        width: 1,
        height: 1,
        tagname: 'rect',
        selected: true,
      });

      this.objectStartX = e.nativeEvent.offsetX;
      this.objectStartY = e.nativeEvent.offsetY;
      this.isCreateMode = true;

      this.setState({
        svgObjects: list,
      });
      this.selectedItemIndex = svgObjects.length;
    } else if (e.nativeEvent.button === 0) {
      const { svgObjects } = this.state;
      // 만약 오른쪽 아래 모서리를 선택했다면?
      if (
        this.isResizeItem
      ) {
        this.objectStartX = svgObjects[this.selectedItemIndex].x;
        this.objectStartY = svgObjects[this.selectedItemIndex].y;
        this.isDown = true;
      } else {
        // 선택된 아이템을 이동시켜본다 (사각형 테두리 내를 선택했다면)
        this.isLocationMode = true;
        this.originObjectX = e.nativeEvent.offsetX - svgObjects[this.selectedItemIndex].x;
        this.originObjectY = e.nativeEvent.offsetY - svgObjects[this.selectedItemIndex].y;
      }
    }
  }

  onMouseMove = e => {
    const { svgObjects } = this.state;
    // console.log(this.selectedItemIndex);
    if (this.isDown && !this.isLocationMode && this.isCreateMode) {
      const list = [...svgObjects];
      const minX = this.objectStartX !== -1
        ? Math.min(this.objectStartX, e.nativeEvent.offsetX)
        : e.nativeEvent.offsetX;
      const minY = this.objectStartY !== -1
        ? Math.min(this.objectStartY, e.nativeEvent.offsetY)
        : e.nativeEvent.offsetY;
      const width = Math.abs(e.nativeEvent.offsetX - this.objectStartX);
      const height = Math.abs(e.nativeEvent.offsetY - this.objectStartY);
      list[this.selectedItemIndex].width = width;
      list[this.selectedItemIndex].height = height;
      list[this.selectedItemIndex].x = minX;
      list[this.selectedItemIndex].y = minY;

      this.setState({
        svgObjects: list,
      });
    } else if (this.isDown && !this.isLocationMode && this.isResizeItem) {
      const list = [...svgObjects];
      const minX = this.objectStartX !== -1
        ? Math.min(this.objectStartX, e.nativeEvent.offsetX)
        : e.nativeEvent.offsetX;
      const minY = this.objectStartY !== -1
        ? Math.min(this.objectStartY, e.nativeEvent.offsetY)
        : e.nativeEvent.offsetY;
      const width = Math.abs(e.nativeEvent.offsetX - this.objectStartX);
      const height = Math.abs(e.nativeEvent.offsetY - this.objectStartY);
      list[this.selectedItemIndex].width = width;
      list[this.selectedItemIndex].height = height;
      list[this.selectedItemIndex].x = minX;
      list[this.selectedItemIndex].y = minY;
      this.setState({
        svgObjects: list,
      });
    } else if (this.isLocationMode) {
      const list = [...svgObjects];
      list[this.selectedItemIndex].x = e.nativeEvent.offsetX - this.originObjectX;
      list[this.selectedItemIndex].y = e.nativeEvent.offsetY - this.originObjectY;
      this.setState({
        svgObjects: list,
      });
    } else {
      // collision
      const res = svgObjects.map(obj => {
        if (this.rectangleCollision(
          obj.x,
          obj.y,
          obj.width,
          obj.height,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
        )) {
          return true;
        }
        return false;
      });

      const newState = [...svgObjects];
      const selectedArrays = this.getCount(res, true);
      // console.log(selectedArrays);
      switch (selectedArrays) {
        case 0:
          this.selectedItemIndex = -1;
          // 선택된 항목이 없으면 모두 false 로 변경
          for (let i = 0; i < newState.length; i += 1) {
            newState[i].selected = false;
          }
          break;
        case 1:
          // 선택된 항목이 1개이므로 해당 아이템을 true, 나머지는 false
          this.selectedItemIndex = res.findIndex(x => x === true);
          for (let i = 0; i < newState.length; i += 1) {
            if (i === this.selectedItemIndex) {
              newState[i].selected = true;
            } else {
              newState[i].selected = false;
            }
          }
          break;
        default:
        {
          // 선택된 항목이 다수개일 경우
          // 1. 기존 선택된 아이템이 또 선택되어 있으면 기존 선택된 것을 유지 하도록 함
          let findItemIndex;
          if (res[this.selectedItemIndex] !== true) {
            findItemIndex = res.findIndex(x => x === true);
          } else {
            break;
          }
          for (let i = 0; i < newState.length; i += 1) {
            if (i === findItemIndex) {
              newState[i].selected = true;
            } else {
              newState[i].selected = false;
            }
          }
          break;
        }
      }
      // if (newState.length > 0) {
      //   console.log(newState[0].selected);
      // }
      const frontItem = newState.find(x => x.selected === true);
      const newState2 = newState.filter(x => x.selected === false);

      if (typeof frontItem !== 'undefined') {
        // console.log(frontItem.id);
        this.selectedItemIndex = newState2.push(frontItem) - 1;
      }
      this.setState({
        svgObjects: newState2,
      });
    }
  }

  onMouseUp = () => {
    // 아이템을 추가한 경우 사이즈가 너무 작으면 최소 사이즈로 변경시킴
    if (this.isCreateMode) {
      const { svgObjects } = this.state;
      const newState = [...svgObjects];
      for (let i = 0; i < newState.length; i += 1) {
        if (newState[i].width < this.minimunSize) {
          newState[i].width = this.minimunSize;
        }
        if (newState[i].height < this.minimunSize) {
          newState[i].height = this.minimunSize;
        }
      }
      this.setState(newState);
      const { updateObject } = this.props;
      if (updateObject !== null && typeof updateObject !== 'undefined') {
        updateObject(newState);
      }
    }

    this.isDown = false;
    this.isLocationMode = false;
    this.objectStartX = -1;
    this.objectStartY = -1;
    this.isCreateMode = false;
    this.isResizeItem = false;
  }

  onWheel = () => {
    // console.log('onMouseWheel - CraypasRect');
  }

  onMouseOver = () => {
    // console.log('onMouseOver - CraypasRect');
  }

  onMouseOut = () => {
    // console.log('onMouseOut - CraypasRect');
  }

  onContextMenu = e => {
    // console.log('onContextMenu - CraypasRect');
    e.preventDefault();
    if (this.selectedItemIndex !== -1) {
      // 오른쪽 버튼 클릭시 제거
      const { svgObjects } = this.state;
      const list = [...svgObjects];

      list.splice(this.selectedItemIndex, 1);
      // console.log(this.selectedItemIndex, list);
      this.setState({
        svgObjects: list,
      });
    }
  }

  rectangleCollision = (x, y, width, height, px, py) => {
    if (px >= x && px <= x + width && py >= y && py <= y + height) {
      return true;
    }
    return false;
  }

  getCount = (arr, val) => {
    let count = 0;
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === val) {
        count += 1;
      }
    }
    return count;
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

CraypasRectContainer.propTypes = {
  updateObject: PropTypes.func,
  render: PropTypes.func.isRequired,
  objects: PropTypes.arrayOf(PropTypes.object),
};

CraypasRectContainer.defaultProps = {
  objects: [],
  updateObject: null,
};

export default CraypasRectContainer;

import React from 'react';
import PropTypes from 'prop-types';

class CraypasCircleContainer extends React.Component {
  state = {
    svgObjects: [],
  };

  isDown = false;

  isLocationMode = false;

  selectedItemIndex = 0;

  isResizeItem = false;

  minimunSize = 30;

  componentDidUpdate = oldProps => {
    const newProps = this.props;
    if (oldProps.objects !== newProps.objects) {
      this.setState({
        svgObjects: newProps.objects,
      });
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
      list.push({
        key: e.nativeEvent.offsetX * e.nativeEvent.offsetX,
        cx: e.nativeEvent.offsetX,
        cy: e.nativeEvent.offsetY,
        r: 1,
        tagname: 'circle',
        selected: true,
      });

      this.setState({
        svgObjects: list,
      });
      this.selectedItemIndex = svgObjects.length;
      console.log('!! mouseDown ', this.selectedItemIndex);
    } else {
      const { svgObjects } = this.state;
      // 만약 오른쪽 아래 모서리를 선택했다면?
      if (e.nativeEvent.offsetX
        < svgObjects[this.selectedItemIndex].cx + svgObjects[this.selectedItemIndex].r
        && e.nativeEvent.offsetX
        > svgObjects[this.selectedItemIndex].cx + svgObjects[this.selectedItemIndex].r - 10
        && e.nativeEvent.offsetY
        < svgObjects[this.selectedItemIndex].cy + svgObjects[this.selectedItemIndex].r
        && e.nativeEvent.offsetY
        > svgObjects[this.selectedItemIndex].cy + svgObjects[this.selectedItemIndex].r - 10) {
        this.isDown = true;
      } else {
        // 선택된 아이템을 이동시켜본다 (사각형 테두리 내를 선택했다면)
        this.isLocationMode = true;
        this.originObjectX = e.nativeEvent.offsetX - svgObjects[this.selectedItemIndex].cx;
        this.originObjectY = e.nativeEvent.offsetY - svgObjects[this.selectedItemIndex].cy;
      }
    }
  }

  onMouseMove = e => {
    const { svgObjects } = this.state;
    if (this.isDown && !this.isLocationMode) {
      console.log('!! mouseMove ', this.selectedItemIndex);
      const list = [...svgObjects];

      list[this.selectedItemIndex].r = e.nativeEvent.offsetX - list[this.selectedItemIndex].cx;
      list[this.selectedItemIndex].r = e.nativeEvent.offsetY - list[this.selectedItemIndex].cy;
      console.log(list[this.selectedItemIndex].r);
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
          obj.cx,
          obj.cy,
          obj.r,
          obj.r,
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
          console.log('selectedItemIndex = -1');
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
          // 선택된 항목이 다수개일 경우
          // 1. 기존 선택된 아이템이 또 선택되어 있으면 기존 선택된 것을 유지 하도록 함
          if (res[this.selectedItemIndex] === true) {
            return;
          }
          this.selectedItemIndex = res.findIndex(x => x === true);
          for (let i = 0; i < newState.length; i += 1) {
            if (i === this.selectedItemIndex) {
              newState[i].selected = true;
            } else {
              newState[i].selected = false;
            }
          }
          break;
      }
      this.setState(newState);
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
      updateObject(newState);
    }
    this.isDown = false;
    this.isLocationMode = false;
    this.objectStartX = -1;
    this.objectStartY = -1;
    this.isCreateMode = false;
    this.isResizeItem = false;
  }

  onWheel = () => {

  }

  onMouseOver = () => {

  }

  onMouseOut = () => {

  }

  onContextMenu = () => {

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

CraypasCircleContainer.propTypes = {
  updateObject: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default CraypasCircleContainer;

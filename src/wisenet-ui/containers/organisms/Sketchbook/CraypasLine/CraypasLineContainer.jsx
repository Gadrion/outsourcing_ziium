import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

class CraypasLineContainer extends React.Component {
  state = {
    isOver: false,
    isDown: false,
    objects: List([]),
    collision: false,
  }

  clickCount = 0;

  componentDidUpdate = () => {
  }

  onResizeButtonMouseDown = () => {

  }

  onResizeButtonMouseUp = () => {

  }

  onMouseDown = e => {
    const { isOver, objects } = this.state;
    const channel = 'sketchbook';
    if (e.nativeEvent.button === 0) {
      // left button down
      if (isOver && this.clickCount === 0) {
        e.preventDefault();
        // 클릭한 것이 라인인지 여부를 판단해보자. 그리고 여러개 중 어떤 항목인지도.
        const resVal = objects.toJS().map(obj => {
          if (this.lineCollision(
            obj.x1,
            obj.y1,
            obj.x2,
            obj.y2,
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            0.1,
          )) {
            return true;
          }
          return false;
        });
        const selectedIndex = resVal.findIndex(x => x === true);
        if (selectedIndex === -1) {
          // 선택된 것이 없음. 라인을 그리기 위한 클릭으로 간주함
          this.state.isDown = true;

          console.log(`!!![Channel ${channel}] PT Start point: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`);

          let changed = List([...objects]);
          for (let i = 0; i < changed.size; i += 1) {
            changed = changed.setIn([i, 'style'], {
              stroke: 'rgb(255,0,0)',
              strokeWidth: 2,
            });
          }
          this.setState({
            objects: changed.push(Map({
              key: e.nativeEvent.offsetX * e.nativeEvent.offsetX,
              x1: e.nativeEvent.offsetX,
              y1: e.nativeEvent.offsetY,
              x2: e.nativeEvent.offsetX,
              y2: e.nativeEvent.offsetY,
              tag: 'line',
              style: {
                stroke: 'rgb(0,0,255)',
                strokeWidth: 2,
              },
            })),
          });
          this.clickCount = 1;
          console.log('this.clickCount = 1');
          console.log(`objects count : ${objects.size}`);
        } else {
          // 선택된 것이 아이템
          console.log('Select! ', selectedIndex);
          // const changed = objects.setIn([selectedIndex, 'style'], {
          //   stroke: 'rgb(0,0,255)',
          //   strokeWidth: 2,
          // }).update([!selectedIndex, 'style'], {
          //   stroke: 'rgb(255,0,0)',
          //   strokeWidth: 2,
          // });

          let changed = List([...objects]);

          // 선택되지 않은 것들은 다시 원래 스타일로 원복
          for (let i = 0; i < changed.size; i += 1) {
            if (i !== selectedIndex) {
              changed = changed.setIn([i, 'style'], {
                stroke: 'rgb(255,0,0)',
                strokeWidth: 2,
              });
            } else {
              changed = changed.setIn([i, 'style'], {
                stroke: 'rgb(0,0,255)',
                strokeWidth: 2,
              });
            }
          }

          this.setState({
            objects: changed,
          });
        }
      } else if (isOver && this.clickCount === 1) {
        console.log('this.clickCount = 0');
        this.clickCount = 0;
      }
    } else if (e.nativeEvent.button === 1) {
      // wheel button down
    } else if (e.nativeEvent.button === 2) {
      // right button down
      e.preventDefault();
    }
  }

  onMouseMove = e => {
    const { objects } = this.state;
    // const channel = 'sketchbook';
    // console.log('this.clickCount = ', this.clickCount);
    if (this.clickCount === 1) {
      e.preventDefault();

      // const newEle = objects.slice();
      // newEle[newEle.length - 1].x2 = e.nativeEvent.offsetX;
      // newEle[newEle.length - 1].y2 = e.nativeEvent.offsetY;
      const newEle = objects
        .setIn([objects.size - 1, 'x2'], e.nativeEvent.offsetX)
        .setIn([objects.size - 1, 'y2'], e.nativeEvent.offsetY);
      this.setState({
        objects: newEle,
      });
    } else {
      // 충돌검사 해서 마우스 커서 모양을 바꿔볼까.
      const resVal = objects.toJS().map(obj => {
        if (this.lineCollision(
          obj.x1,
          obj.y1,
          obj.x2,
          obj.y2,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
          0.1,
        )) {
          return true;
        }
        return false;
      });
      if (typeof resVal.find(x => x === true) === 'undefined') {
        this.setState({
          collision: false,
        });
      } else {
        this.setState({
          collision: true,
        });
      }
    }
  }

  lineCollision = (x1, y1, x2, y2, px, py, offset) => {
    const xDist = (x2 - x1) * (x2 - x1);
    const yDist = (y2 - y1) * (y2 - y1);

    const distP1x = (px - x1) * (px - x1);
    const distP1y = (py - y1) * (py - y1);
    const distP2x = (px - x2) * (px - x2);
    const distP2y = (py - y2) * (py - y2);
    const result = Math.abs((Math.sqrt(xDist + yDist))
      - (Math.sqrt(distP1x + distP1y)
      + Math.sqrt(distP2x + distP2y)));
    // console.log('result : ', result);
    return result < offset;
  }

  onMouseUp = e => {
    const { isOver, isDown } = this.state;
    const channel = 'sketchbook';
    if (isOver && isDown) {
      e.preventDefault();
      this.state.isDown = false;
      if (e.nativeEvent.which === 1) {
        // left button
        console.log(`!!![Channel ${channel}] PT End point: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`);
      }
    }
  };

  onWheel = e => {
    const channel = 'sketchbook';
    e.preventDefault();
    if (e.nativeEvent.wheelDelta < 0) {
      console.log(`!!![Channel ${channel}] Zoom in`);
    } else {
      console.log(`!!![Channel ${channel}] Zoom out`);
    }
  };

  onMouseOver = e => {
    // const channel = 'sketchbook';
    // console.log(`!!![Channel ${channel}] Mouse over`);
    e.preventDefault();
    this.state.isOver = true;
  };

  onMouseOut = e => {
    // const channel = 'sketchbook';
    // console.log(`!!![Channel ${channel}] Mouse out`);
    e.preventDefault();
    this.state.isOver = false;
  };

  onContextMenu = e => {
    console.log('on context menu ~');
    const { isOver, objects } = this.state;
    if (isOver && this.clickCount === 1) {
      const newEle = objects.delete(objects.size - 1);
      // newEle.splice(newEle.length - 1, 1);
      this.setState({
        objects: newEle,
      });

      this.clickCount = 0;
    }
    e.preventDefault();
  }

  rectangleCollision = (x, y, width, height, px, py) => {
    if (px >= x && px <= x + width && py >= y && py <= y + height) {
      return true;
    }
    return false;
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

CraypasLineContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default CraypasLineContainer;

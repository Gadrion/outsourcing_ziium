import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './PTZMouseEvent.scss';

const cx = classNames.bind(styles);

class PTZMouseEvent extends Component {
  state = {
    isOver: false,
    isDown: false,
  }

  static defaultProps = {
    channel: 0,
  }

  componentDidMount() {

  }

  onMouseDown = e => {
    const { isOver } = this.state;
    const { channel } = this.props;
    if (isOver) {
      e.preventDefault();
      this.state.isDown = true;
      if (e.nativeEvent.which === 1) {
        // left button
        console.log(`!!![Channel ${channel}] PT Start point: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`);
      }
    }
  };

  onMouseMove = e => {
    const { isOver, isDown } = this.state;
    const { channel } = this.props;
    if (isOver && isDown) {
      e.preventDefault();
      if (e.nativeEvent.which === 1) {
        // left button
        console.log(`!!![Channel ${channel}] PT Move point: (${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY})`);
      }
    }
  };

  onMouseUp = e => {
    const { isOver, isDown } = this.state;
    const { channel } = this.props;
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
    const { channel } = this.props;
    e.preventDefault();
    if (e.nativeEvent.wheelDelta < 0) {
      console.log(`!!![Channel ${channel}] Zoom in`);
    } else {
      console.log(`!!![Channel ${channel}] Zoom out`);
    }
  };

  onMouseOver = e => {
    const { channel } = this.props;
    console.log(`!!![Channel ${channel}] Mouse over`);
    e.preventDefault();
    this.state.isOver = true;
  };

  onMouseOut = e => {
    const { channel } = this.props;
    console.log(`!!![Channel ${channel}] Mouse out`);
    e.preventDefault();
    this.state.isOver = false;
  };

  onFocus = () => null;

  onBlur = () => null;

  render() {
    const {
      children,
    } = this.props;
    const style = {
      width: '640px',
      height: '480px',
      position: 'relative',
      border: '1px solid black',
    };
    return (
      <div
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onWheel={this.onWheel}
        style={style}
      >
        <div
          className={cx('wrapper')}
          style={{
            width: '640px',
            height: '480px',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <i className={`tui tui-ch-live-ptz-tracking-manual ${cx('icon')}`} />
          <i className={`tui tui-ch-live-ptz-tracking-auto ${cx('icon')}`} />
          <i className={`tui tui-ch-live-ptz-areazoom ${cx('icon')}`} />
          <i className={`tui tui-ch-live-ptz-areazoom-1x ${cx('icon')}`} />
        </div>
        {children}
      </div>
    );
  }
}

PTZMouseEvent.propTypes = {
  children: PropTypes.node.isRequired,
  channel: PropTypes.number,
};


export default PTZMouseEvent;

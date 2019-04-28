import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { IconButton } from 'wisenet-ui/components/atoms';
import styles from './TileCommonBar.scss';

const cx = classnames.bind(styles);

class TileCommonBar extends Component {
  componentDidMount() {

  }

  onmousedown = e => {
    e.stopPropagation();
    console.log('onmousedown :::::::::');
  }

  onclick = e => {
    e.stopPropagation();
    console.log('onclick :::::::::', e.currentTarget);
  }

  onclickfullscreen = e => {
    e.stopPropagation();
    console.log('onclickfullscreen :::::::::');

    if (!document.fullscreenElement // alternative standard method
      && !document.mozFullScreenElement
      && !document.webkitFullscreenElement) { // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }

  render() {
    return (
      <div className={cx('TileCommonBar')} onMouseDown={this.onmousedown}>
        <IconButton className={`${'tui tui-wn5-top-playback'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-capture'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-record'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-backup'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-sound'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-mic'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-top-live'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-ch-live-info'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-status'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-pixel'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-setup'} ${cx('TileCommonBar-icon')}`} onClick={this.onclick} />
        <IconButton className={`${'tui tui-wn5-toolbar-fullscreen'} ${cx('TileCommonBar-icon')}`} onClick={this.onclickfullscreen} />
      </div>
    );
  }
}

export default TileCommonBar;

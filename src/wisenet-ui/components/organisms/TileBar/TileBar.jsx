import React, { Component } from 'react';
import classnames from 'classnames/bind';
import { IconButton } from 'wisenet-ui/components/atoms';
import axios from 'axios';
import styles from './TileBar.scss';

const cx = classnames.bind(styles);

class TileBar extends Component {
  componentDidMount() {

  }

  mouseenter = e => {
    e.stopPropagation();
    e.currentTarget.firstChild.style.visibility = 'visible';
  }

  mouseleave = e => {
    e.stopPropagation();
    e.currentTarget.firstChild.style.visibility = 'hidden';
  }

  onmousedown = e => {
    e.stopPropagation();
    console.log('onmousedown :::::::::');
  }

  onclick = e => {
    e.stopPropagation();
    console.log('onclick :::::::::', e.currentTarget, this.deviceip, this.userid, this.password);
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
    this.deviceip = axios.defaults.baseURL.replace('http://', '');
    this.userid = sessionStorage.getItem('WISENET_USER_ID');
    this.password = sessionStorage.getItem('WISENET_USER_PASSWORD');

    return (
      <div className={cx('tilebar-container')} onMouseEnter={this.mouseenter} onMouseLeave={this.mouseleave}>
        <div className={cx('tilebar')} onMouseDown={this.onmousedown}>
          <IconButton className={`${'tui tui-ch-playback-play'} ${cx('tilebar-icon')}`} onClick={this.onclick} />
          <IconButton className={`${'tui tui-ptz'} ${cx('tilebar-icon')}`} onClick={this.onclick} />
          <IconButton className={`${'tui tui-ch-live-digitalzoom'} ${cx('tilebar-icon')}`} onClick={this.onclick} />
          <IconButton className={`${'tui tui-setup'} ${cx('tilebar-icon')}`} onClick={this.onclick} />
          <IconButton className={`${'tui tui-ch-fullscreen'} ${cx('tilebar-icon')}`} onClick={this.onclickfullscreen} />
        </div>
      </div>
    );
  }
}

TileBar.propTypes = {

};

export default TileBar;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import LiveMediaControlBar from './LiveMediaControlBar';
import SearchMediaControlBar from './SearchMediaControlBar';
import {
  MediaControlBarStyled,
} from './MediaControlBarStyled';

class MediaControlBar extends Component {
  constructor(props) {
    super(props);
    this.factorys = {
      [umpPlayMode.LIVE]: data => <LiveMediaControlBar {...data} />,
      [umpPlayMode.PLAYBACK]: data => <SearchMediaControlBar {...data} />,
    };
  }

  componentDidMount() {
    // MediaControlBar에서 theme를 가져다 사용하는데 한번 그리고 다시 그리는 호출이 없으면
    // 색상이 제대로 적용되지 않는다.
    // MediaControlBar가 장비로 부터 값을 받아와서 아이콘을 그리게 된다면 forceUpdate는 필요없다.
    // 아직 장비로 부터 값을 받아와서 아이콘을 그리지 않기 때문에 강제로 재 랜더 시킴.
    this.forceUpdate();
  }

  render() {
    const {
      type,
    } = this.props;

    const factory = this.factorys[type];
    const barComponent = factory ? factory(this.props) : null;

    return (
      <MediaControlBarStyled>
        {barComponent}
      </MediaControlBarStyled>
    );
  }
}

MediaControlBar.propTypes = {
  type: PropTypes.oneOf([umpPlayMode.LIVE, umpPlayMode.PLAYBACK]).isRequired,
};

export default MediaControlBar;

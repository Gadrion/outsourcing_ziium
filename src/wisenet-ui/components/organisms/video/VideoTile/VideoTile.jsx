import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tile } from 'wisenet-ui/components/organisms';
import {
  TileContainer,
  TileLiveContainer,
  TilePlaybackContainer,
  TileBackupContainer,
} from 'wisenet-ui/containers/organisms';
import { withContainer, withContainers } from 'wisenet-ui/util/hoc';

import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';

class VideoTile extends Component {
  constructor(props) {
    super(props);
    const LiveVideoTile = withContainers([TileLiveContainer, TileContainer], Tile);
    const PlaybackVideoTile = withContainers([TilePlaybackContainer, TileContainer], Tile);
    const BackupVideoTile = withContainer(TileBackupContainer, Tile);

    this.factorys = {
      [umpPlayMode.LIVE]: data => <LiveVideoTile {...data} />,
      [umpPlayMode.PLAYBACK]: data => <PlaybackVideoTile {...data} />,
      [umpPlayMode.BACKUP]: data => <BackupVideoTile {...data} />,
    };
  }

  render() {
    const { type } = this.props;

    const factory = this.factorys[type];
    const TileComponent = factory ? factory(this.props) : null;
    return (
      <React.Fragment>
        {TileComponent}
      </React.Fragment>
    );
  }
}

VideoTile.defaultProps = {
  type: umpPlayMode.LIVE,
};

VideoTile.propTypes = {
  type: PropTypes.oneOf([umpPlayMode.LIVE, umpPlayMode.PLAYBACK, umpPlayMode.BACKUP]),
};

export default VideoTile;

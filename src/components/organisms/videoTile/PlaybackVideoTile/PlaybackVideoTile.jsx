import React from 'react';
import PropTypes from 'prop-types';
import { VideoTile } from 'wisenet-ui/components/organisms';
import { PlaybackVideoTileContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import {
  OSDWrapperStyled,
} from './PlaybackVideoTileStyled';

class PlaybackVideoTile extends React.PureComponent {
  render() {
    const {
      channelName,
      OSDDisplay,
    } = this.props;
    return (
      <>
        <VideoTile {...this.props} type={umpPlayMode.PLAYBACK} />
        {
          OSDDisplay && (
            <OSDWrapperStyled>
              <span>{channelName}</span>
            </OSDWrapperStyled>
          )
        }
      </>
    );
  }
}

PlaybackVideoTile.propTypes = {
  channelName: PropTypes.string.isRequired,
  OSDDisplay: PropTypes.bool.isRequired,
};

export default withContainer(PlaybackVideoTileContainer, PlaybackVideoTile);

import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { VideoTile } from 'wisenet-ui/components/organisms';
import {
  TilePTZControl,
  LiveVideoTileBar,
  ChannelInfo,
  TileInstantPlaybackControl,
} from 'components/organisms';
import { LiveVideoTileContainer } from 'containers/organisms';

import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import { MediaControlIDList } from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';

import {
  LiveVideoTileStyled,
  TileControlBarStyled,
  LiveVideoTileStatusStyled,
} from './LiveVideoTileStyled';

class LiveVideoTile extends React.PureComponent {
  render() {
    const {
      onTileBarClick,
      onMouseEvent,
      openTileControl,
      statusIcon,
      OSDDisplay,
      channelName,
      channelInfo,
      channelInfoDisplay,
      tileMode,
      returnTileMode,
      ...rest
    } = this.props;
    return (
      <LiveVideoTileStyled
        onMouseEnter={onMouseEvent('enter')}
        onMouseLeave={onMouseEvent('leave')}
        onDoubleClick={onMouseEvent('doubleClick')}
      >
        <VideoTile
          {...rest}
          type={umpPlayMode.LIVE}
          channelInfoDisplay={channelInfoDisplay}
          codec={channelInfo.codec}
        />
        {(tileMode === MediaControlIDList.INSTANT_PLAYBACK) && (
          <TileInstantPlaybackControl
            currentChannel={rest.channel}
            returnTileMode={returnTileMode}
          />
        )}
        {(tileMode === MediaControlIDList.PTZ_CONTROL) && (
          <TilePTZControl
            currentChannel={rest.channel}
            ptzInfo={rest.ptzInfo}
            returnTileMode={returnTileMode}
          />
        )}
        {
          OSDDisplay && (
            <LiveVideoTileBar
              uid={rest.uid}
              channel={rest.channel}
              channelName={channelName}
            />
          )
        }
        {
          channelInfoDisplay.isVisible && (
            <ChannelInfo info={channelInfo} mode={channelInfoDisplay.isDevelopMode} />
          )
        }
        {
          statusIcon && (
            <LiveVideoTileStatusStyled>
              <i className={`wni ${statusIcon}`} />
            </LiveVideoTileStatusStyled>
          )
        }
        {
          openTileControl && (
            <TileControlBarStyled onClick={onTileBarClick} pcRecord={rest.pcRecord} />
          )
        }
      </LiveVideoTileStyled>
    );
  }
}

LiveVideoTile.defaultProps = {
  statusIcon: null,
  channelName: '',
  sdFail: false,
  sdFull: false,
  motionDetection: false,
  defocusDetection: false,
  ivaDetection: false,
};

LiveVideoTile.propTypes = {
  onTileBarClick: PropTypes.func.isRequired,
  onMouseEvent: PropTypes.func.isRequired,
  openTileControl: PropTypes.bool.isRequired,
  statusIcon: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  channelName: PropTypes.string,
  sdFail: PropTypes.bool,
  sdFull: PropTypes.bool,
  motionDetection: PropTypes.bool,
  defocusDetection: PropTypes.bool,
  ivaDetection: PropTypes.bool,
  channelInfo: PropTypes.shape({
    resolution: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    codec: PropTypes.string,
    bps: PropTypes.string,
    fps: PropTypes.number,
  }).isRequired,
  OSDDisplay: PropTypes.bool.isRequired,
  channelInfoDisplay: PropTypes.shape({
    isVisible: PropTypes.bool,
    isDevelopMode: PropTypes.bool,
  }).isRequired,
  tileMode: PropTypes.oneOf(['normal', MediaControlIDList.PTZ_CONTROL, MediaControlIDList.INSTANT_PLAYBACK, MediaControlIDList.D_ZOOM]).isRequired,
  returnTileMode: PropTypes.func.isRequired,
};

export default withContainer(LiveVideoTileContainer, LiveVideoTile);

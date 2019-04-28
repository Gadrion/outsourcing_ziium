import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SearchMediaControlBarContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import { MediaControlBar } from 'wisenet-ui/components/organisms';
// import { MediaControlBarWrapperStyled } from './SearchMediaControlBarStyled';

class SearchMediaControlBar extends PureComponent {
  render() {
    const {
      onClick,
      playSpeedValue,
      playMode,
      playSpeedIndex,
      isFullscreen,
      timelineFolding,
      className,
    } = this.props;

    return (
      <div
        className={className}
      >
        <MediaControlBar
          type={umpPlayMode.PLAYBACK}
          playSpeedValue={playSpeedValue}
          onClick={onClick}
          playMode={playMode}
          playSpeedIndex={playSpeedIndex}
          isFullscreen={isFullscreen}
          timelineFolding={timelineFolding}
        />
      </div>
    );
  }
}

SearchMediaControlBar.defaultProps = {
  className: null,
};

SearchMediaControlBar.propTypes = {
  playSpeedValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  playMode: PropTypes.string.isRequired,
  playSpeedIndex: PropTypes.number.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  timelineFolding: PropTypes.bool.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default withContainer(SearchMediaControlBarContainer, SearchMediaControlBar);

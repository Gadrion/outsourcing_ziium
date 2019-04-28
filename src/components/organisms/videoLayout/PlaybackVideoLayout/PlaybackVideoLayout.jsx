import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { VideoLayout } from 'wisenet-ui/components/organisms';
import { PlaybackVideoLayoutContainer } from 'containers/organisms';
import { PlaybackVideoTile } from 'components/organisms';
import { PlaybackVideoLayoutStyled } from './PlaybackVideoLayoutStyled';

class PlaybackVideoLayout extends PureComponent {
  render() {
    const {
      type,
      tileList,
      setCurrentTime,
      currentTabName,
      rows,
      cols,
    } = this.props;
    // 생성시킬 Tile Component 정의
    const channelName = tileList.length !== 0 ? tileList[0].channelName : '';
    const tile = (
      <PlaybackVideoTile
        setCurrentTime={setCurrentTime}
        currentTabName={currentTabName}
        channelName={channelName}
      />
    );

    return (
      <PlaybackVideoLayoutStyled>
        <VideoLayout
          type={type}
          VideoTile={tile}
          tileList={tileList}
          rows={rows}
          cols={cols}
        />
      </PlaybackVideoLayoutStyled>
    );
  }
}

PlaybackVideoLayout.propTypes = {
  type: PropTypes.oneOf(['dynamic', 'static']).isRequired,
  tileList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  currentTabName: PropTypes.oneOf(['eventTab', 'textTab']).isRequired,
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
};

export default withContainer(PlaybackVideoLayoutContainer, PlaybackVideoLayout);

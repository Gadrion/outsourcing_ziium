import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LiveMediaControlBarContainer } from 'containers/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import umpPlayMode from 'wisenet-ui/util/static/constants/umpPlayer/umpPlayMode';
import { MediaControlBar } from 'wisenet-ui/components/organisms';
import { MediaControlBarWrapperStyled } from './LiveMediaControlBarStyled';

class LiveMediaControlBar extends PureComponent {
  render() {
    const {
      onClick,
      layoutPageCurrentNumber,
      layoutPageMaxNumber,
      recordState,
    } = this.props;

    return (
      <MediaControlBarWrapperStyled>
        <MediaControlBar
          type={umpPlayMode.LIVE}
          onClick={onClick}
          layoutPageInputValue={layoutPageCurrentNumber}
          layoutPageLimitValue={layoutPageMaxNumber}
          recordState={recordState}
        />
      </MediaControlBarWrapperStyled>
    );
  }
}

LiveMediaControlBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  layoutPageCurrentNumber: PropTypes.number.isRequired,
  layoutPageMaxNumber: PropTypes.number.isRequired,
  recordState: PropTypes.bool.isRequired,
};

export default withContainer(LiveMediaControlBarContainer, LiveMediaControlBar);

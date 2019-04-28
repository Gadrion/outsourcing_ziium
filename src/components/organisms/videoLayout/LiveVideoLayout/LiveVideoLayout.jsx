import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { VideoLayout } from 'wisenet-ui/components/organisms';
import { LiveVideoLayoutContainer } from 'containers/organisms';
import { LiveVideoTile } from 'components/organisms';
import { LiveVideoLayoutStyled } from './LiveVideoLayoutStyled';

class LiveVideoLayout extends PureComponent {
  render() {
    const {
      selectClick,
      setMoveItem,
      ...rest
    } = this.props;

    // 생성시킬 Tile Component 정의
    const tile = (
      <LiveVideoTile
        selectClick={selectClick}
      />
    );

    return (
      <LiveVideoLayoutStyled>
        <VideoLayout
          VideoTile={tile}
          selectClick={selectClick}
          onMouseUpItem={setMoveItem}
          {...rest}
        />
      </LiveVideoLayoutStyled>
    );
  }
}

LiveVideoLayout.propTypes = {
  type: PropTypes.oneOf(['dynamic', 'static']).isRequired,
  tileList: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectClick: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired,
  setMoveItem: PropTypes.func.isRequired,
};

export default withContainer(LiveVideoLayoutContainer, LiveVideoLayout);

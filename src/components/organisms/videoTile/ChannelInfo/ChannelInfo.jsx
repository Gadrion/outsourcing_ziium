import React from 'react';
import PropTypes from 'prop-types';
import {
  ChannelInfoWrapperStyled,
  ChnnelInfoTextStyled,
} from './ChannelInfoStyled';

class ChannelInfo extends React.PureComponent {
  render() {
    const {
      info,
      mode,
    } = this.props;
    return (
      <ChannelInfoWrapperStyled>
        <ChnnelInfoTextStyled>
          {info.resolution.width}
          {' x '}
          {info.resolution.height}
        </ChnnelInfoTextStyled>
        <ChnnelInfoTextStyled>
          {info.codec}
        </ChnnelInfoTextStyled>
        {
          mode && (
            <React.Fragment>
              <ChnnelInfoTextStyled>
                {info.fps}
                {' fps'}
              </ChnnelInfoTextStyled>
              <ChnnelInfoTextStyled>
                {info.bps}
                {' kbps'}
              </ChnnelInfoTextStyled>
            </React.Fragment>
          )
        }
      </ChannelInfoWrapperStyled>
    );
  }
}

ChannelInfo.propTypes = {
  info: PropTypes.shape({
    resolution: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    codec: PropTypes.string,
    bps: PropTypes.string,
    fps: PropTypes.number,
  }).isRequired,
  mode: PropTypes.bool.isRequired,
};

export default ChannelInfo;

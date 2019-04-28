import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { LiveVideoTileBarContainer } from 'containers/organisms';
import {
  OSDWrapperStyled,
  OSDLeftWrapperStyled,
  OSDRightWrapperStyled,
  ChannelNameStyled,
  EventIconStyled,
  VerticalLineStyled,
  CloseIconStyled,
} from './LiveVideoTileBarStyled';

class LiveVideoTileBar extends React.PureComponent {
  render() {
    const {
      channelName,
      sdFail,
      sdFull,
      motionDetection,
      defocusDetection,
      ivaDetection,
      onDeleteTile,
      networkAlarmInput,
    } = this.props;
    return (
      <OSDWrapperStyled>
        <OSDLeftWrapperStyled>
          <ChannelNameStyled>{channelName}</ChannelNameStyled>
        </OSDLeftWrapperStyled>
        <OSDRightWrapperStyled>
          {sdFail && <EventIconStyled className="wni wni-event-sdcard-over" />}
          {sdFull && <EventIconStyled className="wni wni-event-sdcard-full" />}
          {motionDetection && <EventIconStyled className="wni wni-event-motion" />}
          {ivaDetection && <EventIconStyled className="wni wni-event-iva" />}
          {defocusDetection && <EventIconStyled className="wni wni-event-defoucs" />}
          {networkAlarmInput && <EventIconStyled className="wni wni-event-sensor" />}
          {true && <EventIconStyled className="wni wni-event-textevent" />}
          <VerticalLineStyled />
          <CloseIconStyled className="wni wni-close" onClick={onDeleteTile} />
        </OSDRightWrapperStyled>
      </OSDWrapperStyled>
    );
  }
}

LiveVideoTileBar.defaultProps = {
  channelName: '',
  sdFail: false,
  sdFull: false,
  motionDetection: false,
  defocusDetection: false,
  ivaDetection: false,
  networkAlarmInput: false,
};

LiveVideoTileBar.propTypes = {
  channelName: PropTypes.string,
  sdFail: PropTypes.bool,
  sdFull: PropTypes.bool,
  motionDetection: PropTypes.bool,
  defocusDetection: PropTypes.bool,
  ivaDetection: PropTypes.bool,
  onDeleteTile: PropTypes.func.isRequired,
  networkAlarmInput: PropTypes.bool,
};

export default withContainer(LiveVideoTileBarContainer, LiveVideoTileBar);

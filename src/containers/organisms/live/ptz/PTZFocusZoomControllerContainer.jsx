import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PTZZoomFocusActions } from 'store/actionCreators';

class PTZFocusZoomControllerContainer extends React.Component {
  state = {
    zoom: 0,
  };

  onSliderAfterChange = ({ id }) => {
    const { currentChannel } = this.props;
    this.setState({
      [id]: 0,
    });
    PTZZoomFocusActions.controlStop({
      Channel: currentChannel,
    });
  }

  onSliderChange = ({ value, id }) => {
    const { currentChannel } = this.props;
    this.setState({
      [id]: value,
    });

    PTZZoomFocusActions.controlZoom({
      Zoom: value,
      Channel: currentChannel,
    });
  }

  onZoomBtnChange = flag => {
    const { currentChannel, attributes } = this.props;
    if (flag === '+') {
      PTZZoomFocusActions.controlZoom({
        Zoom: attributes.ZoomLevel.maxValue,
        Channel: currentChannel,
      });
    } else {
      PTZZoomFocusActions.controlZoom({
        Zoom: attributes.ZoomLevel.minValue,
        Channel: currentChannel,
      });
    }
  }

  onFocusBtnChange = flag => {
    const { currentChannel } = this.props;

    if (flag === 'Near' || flag === 'Far') {
      PTZZoomFocusActions.controlFocus({
        Channel: currentChannel,
        Focus: flag,
      });
    } else {
      PTZZoomFocusActions.controlAutoFocus({
        Channel: currentChannel,
      });
    }
  }

  render() {
    const { render } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

PTZFocusZoomControllerContainer.defaultProps = {
  currentChannel: -1,
  attributes: {},
};

PTZFocusZoomControllerContainer.propTypes = {
  render: PropTypes.func.isRequired,
  currentChannel: PropTypes.number,
  attributes: PropTypes.instanceOf(Object),
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    attributes: state.sunapiModule.get('attributes'),
    attributesLoaded: state.sunapiModule.get('loaded'),
  }),
)(PTZFocusZoomControllerContainer);

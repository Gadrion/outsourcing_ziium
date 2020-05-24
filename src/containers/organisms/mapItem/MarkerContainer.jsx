import { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';
import { connect } from 'react-redux';

class MarkerContainer extends Component {
  state = {
    isOpen: false,
    imageFiles: [],
  };

  onLoad = marker => {
    this.marker = marker;
    console.log('marker: ', marker);
  }

  onClick = type => () => {
    switch (type) {
      case 'marker': {
        const { placeId } = this.props;
        MapActions.showMapData({ placeId });
        break;
      }
      case 'info': {
        const {
          userId, position, address, label, placeId, memo, history,
        } = this.props;
        const { imageFiles } = this.state;
        MapActions.updateMapData({
          userId,
          position,
          address,
          label,
          placeId,
          memo,
          history,
          imageFiles
        });
        break;
      }
      case 'delete': {
        const { placeId } = this.props;
        MapActions.deleteMapData({ placeId });
        break;
      }
      case 'close': {
        MapActions.showMapData({ placeId: '' });
        break;
      }
      default:
        break;
    }
  }

  onChange = type => event => {
    switch (type) {
      case 'file': {
        console.log('event', event.target.files);
        this.setState({
          imageFiles: event.target.files,
        })
        break;
      }
    }
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

MarkerContainer.defaultProps = {
  label: 'qwe',
  position: {
    lat: 37.772,
    lng: -122.214,
  },
};

MarkerContainer.propTypes = {
  render: PropTypes.func.isRequired,
  label: PropTypes.string,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lag: PropTypes.number,
  }),
  userId: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Array).isRequired,
};

export default connect(
  (state, props) => {
    const showPlaceId = state.mapModule.get('showPlaceId');
    const { placeId } = props;
    return ({
      isOpen: showPlaceId === placeId,
    });
  },
)(MarkerContainer);

import { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions, StuffActions } from 'store/actionCreators';
import { connect } from 'react-redux';

class MarkerContainer extends Component {
  state = {
    isOpen: false,
  };

  updateState = this.setState;

  componentDidUpdate({ option: prevOption, filter: prevFilter }) {
    const { filter, option, status } = this.props;

    if (
      JSON.stringify(option) !== JSON.stringify(prevOption)
      || JSON.stringify(filter) !== JSON.stringify(prevFilter)
    ) {
      const filter1 = status !== filter.status;
      // const visible = Object.keys(filter).reduce((acc, key) => (
      //   !!(acc || (option[key] && filter[key]))
      // ), false);

      this.updateState({ visible: filter1 });
    }
  }

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
          position, address, label, placeId, memo, history, option, imageFiles,
        } = this.props;
        StuffActions.setForm({
          name: label,
          memo,
          option,
          position,
          address,
          placeId,
          history,
          status: 'open',
          imageFiles,
        });
        StuffActions.open(true);
        break;
      }
      case 'delete': {
        // 물건이 팔림
        const { placeId, history } = this.props;
        MapActions.deleteMapData({ placeId, history });
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
        });
        break;
      }
      default:
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
  option: {},
  filter: {},
  status: '',
  imageFiles: [],
};

MarkerContainer.propTypes = {
  render: PropTypes.func.isRequired,
  label: PropTypes.string,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lag: PropTypes.number,
  }),
  placeId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  memo: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Array).isRequired,
  option: PropTypes.instanceOf(Object),
  filter: PropTypes.instanceOf(Object),
  status: PropTypes.string,
  imageFiles: PropTypes.instanceOf(Array),
};

export default connect(
  (state, props) => {
    const showPlaceId = state.mapModule.get('showPlaceId');
    const filter = state.mapModule.get('filter');
    const { placeId } = props;
    // const visible = status !== moduleStatus; // close로 같으면 안보여야 함.
    return ({
      isOpen: showPlaceId === placeId,
      filter,
      // visible,
    });
  },
)(MarkerContainer);

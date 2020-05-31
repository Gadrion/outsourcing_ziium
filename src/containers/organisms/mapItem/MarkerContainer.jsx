import { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions, StuffActions } from 'store/actionCreators';
import { connect } from 'react-redux';

class MarkerContainer extends Component {
  state = {
    isOpen: false,
    imageFiles: [],
    visible: true,
  };

  updateState = this.setState;

  componentDidUpdate({ option: prevOption, filter: prevFilter }) {
    const { filter, option, status } = this.props;

    if (
      JSON.stringify(option) !== JSON.stringify(prevOption)
      || JSON.stringify(filter) !== JSON.stringify(prevFilter)
    ) {
      const visible = Object.keys(filter).reduce((acc, key) => (
        !!(acc || (option[key] && filter[key]))
      ), false);
      console.log(status !== filter.status, visible);
      this.updateState({ visible: status !== filter.status && visible });
    }
  }

  onLoad = marker => {
    this.marker = marker;
    console.log('marker: ', marker);
  }

  mapDataUpdate = ({ status, imageFiles }) => {
    const {
      position, address, label, placeId, memo, history,
    } = this.props;
    // 필수 정보
    const updateInfo = {
      position, address, label, placeId, memo, history, status,
    };

    // 없을 수도 있는 정보
    if (imageFiles) { updateInfo.imageFiles = imageFiles; }

    MapActions.updateMapData(updateInfo);
  }

  onClick = type => e => {
    switch (type) {
      case 'marker': {
        const { placeId } = this.props;
        MapActions.showMapData({ placeId });
        break;
      }
      case 'info': {
        const {
          imageFiles = [],
        } = this.state;
        const {
          label = '', memo = '', option = {},
        } = this.props;
        StuffActions.setForm({
          name: label,
          memo,
          imageFiles,
          option,
        });
        StuffActions.open(true);
        this.mapDataUpdate({ status: 'open', imageFiles });
        break;
      }
      case 'infoSave': {
        const {
          position, address, label, placeId, memo, history,
        } = this.props;
        // 필수 정보
        MapActions.updateMapData({
          position,
          address,
          label,
          placeId,
          memo,
          history,
          status: 'open',
          ...e,
        });
        break;
      }
      case 'delete': {
        // 물건이 팔림
        this.mapDataUpdate({ status: 'close' });
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

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';

class WorkPageContainer extends React.Component {
  libraries = ['places'];

  state = {
    addItemFocus: false,
    viewType: 'all',
    positionSearchOpen: false,
    itemSearchOpen: false,
    showIncompleteOpen: false,
  }

  componentDidMount() {
    MapActions.getCurrentLocation();
  }

  onClick = type => event => {
    switch (type) {
      case 'logout':
        break;
      case 'addItem': {
        const { addItemFocus } = this.state;
        this.setState({ addItemFocus: !addItemFocus });
        break;
      }
      case 'positionSearch': {
        this.setSearchPositionOpen(true);
        break;
      }
      case 'all':
      case 'newItem':
      case 'oldItem': {
        const { viewType } = this.state;
        if (viewType !== type) {
          this.setState({
            viewType: type,
          });
        }
        break;
      }
      case 'itemSearchClose':
        this.setState({ itemSearchOpen: false });
        break;
      case 'itemSearch': {
        const { itemSearchOpen } = this.state;
        this.setState({ itemSearchOpen: !itemSearchOpen });
        break;
      }
      case 'map': {
        const { showPlaceId } = this.props;
        if (showPlaceId !== '') {
          MapActions.showMapData({ placeId: '' });
        }
        const { addItemFocus } = this.state;
        if (addItemFocus) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          MapActions.getMapGeocode({ lat, lng });
        }
        break;
      }
      case 'showIncomplete': {
        const { showIncompleteOpen } = this.state;
        MapActions.setMarkerFilter({ status: showIncompleteOpen ? 'all' : 'close' });
        this.setState({ showIncompleteOpen: !showIncompleteOpen });
        break;
      }
      default:
        break;
    }
  }

  setSearchPositionOpen = isOpen => {
    this.setState({
      positionSearchOpen: isOpen,
    });
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

WorkPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    theme: state.themeModule.get('theme'),
    currentPosion: state.mapModule.get('currentPosion'),
    modifyMapList: state.mapModule.get('modifyMapList'),
    load: state.mapModule.get('load'),
    showPlaceId: state.mapModule.get('showPlaceId'),
  }),
  () => ({}),
)(WorkPageContainer);

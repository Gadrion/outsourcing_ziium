import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';

class WorkPageContainer extends React.Component {
  state = {
    addItemFocus: false,
    viewType: 'all',
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
      case 'positionSearch':
        break;
      case 'all':
      case 'newItem':
      case 'oldItem': {
        const { viewType } = this.state;
        if (viewType !== type) {
          this.setState({
            viewType: type,
          })
        }
        break;
      }
      case 'itemSearch':
        break;
      case 'map': {
        const { addItemFocus } = this.state;
        if (addItemFocus) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          MapActions.getMapGeocode({ lat, lng });
        }
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

WorkPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    theme: state.themeModule.get('theme'),
    currentPosion: state.mapModule.get('currentPosion'),
    modifyMapList: state.mapModule.get('modifyMapList'),
    load: state.mapModule.get('load'),
  }),
  () => ({}),
)(WorkPageContainer);

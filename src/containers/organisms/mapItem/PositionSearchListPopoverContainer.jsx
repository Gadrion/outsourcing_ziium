import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MapActions } from 'store/actionCreators';

class PositionSearchListPopoverContainer extends Component {
  state = {
    selectedIndex: 0,
  }

  setRef = ref => {
    this.buttonRef = ref;
  }

  onClick = type => event => {
    switch (type) {
      case 'positionSearchToggle': {
        const { isOpen } = this.props;
        MapActions.setPositionSearchOpen({ isOpen: !isOpen });
        break;
      }
      case 'close': {
        MapActions.setPositionSearchOpen({ isOpen: false });
        break;
      }
      case 'selectedIndex': {
        const { selectedIndex } = this.state;
        if (selectedIndex !== event) {
          console.log('selectedIndex', event);
          this.setState({
            selectedIndex: event,
          });
        }
        break;
      }
      case 'positionChange': {
        const { selectedIndex } = this.state;
        const { positionSearchList, modifyMapList } = this.props;
        const findIndex = modifyMapList.findIndex(mapData => mapData.placeId === positionSearchList[selectedIndex].placeId);
        MapActions.setPositionSearchOpen({ isOpen: false });
        if (findIndex === -1) {
          MapActions.getMapGeocodeSuccess({ ...positionSearchList[selectedIndex] });
          setTimeout(() => {
            MapActions.showMapData({ placeId: positionSearchList[selectedIndex].placeId });
          }, 300);
        } else {
          MapActions.showMapData({ placeId: positionSearchList[selectedIndex].placeId });
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

PositionSearchListPopoverContainer.propTypes = {

};

export default connect(
  state => ({
    isOpen: state.mapModule.get('positionSearchListOpen'),
    positionSearchList: state.mapModule.get('positionSearchList'),
    modifyMapList: state.mapModule.get('modifyMapList'),
  }),
)(PositionSearchListPopoverContainer);
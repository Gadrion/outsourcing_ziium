import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapActions } from 'store/actionCreators';

class SearchBoxContainer extends Component {
  onLoad = ref => this.searchBox = ref;

  onPlacesChanged = () => {
    const { setSearchPositionOpen } = this.props;
    setSearchPositionOpen(false);
    console.log('this.searchBox.getPlaces()', this.searchBox.getPlaces());
    const placeList = this.searchBox.getPlaces().map(place => ({
      address: place.formatted_address,
      placeId: place.place_id,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }));

    MapActions.setPositionSearchOpen({ isOpen: true, positionSearchList: placeList });
  }

  onClick = type => event => {
    switch (type) {
      case 'backgroud': {
        const { setSearchPositionOpen } = this.props;
        setSearchPositionOpen(false);
        break;
      }
      case 'search': {
        console.log(this.searchBox.getPlaces())
        break;
      }
    }
    // console.log('type', type);
    // console.log('event', event);
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

SearchBoxContainer.propTypes = {

};

export default SearchBoxContainer;

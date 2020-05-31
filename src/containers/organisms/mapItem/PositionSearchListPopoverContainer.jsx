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
        console.log('selectedIndex', event);
        this.setState({
          selectedIndex: event,
        })
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
  }),
)(PositionSearchListPopoverContainer);
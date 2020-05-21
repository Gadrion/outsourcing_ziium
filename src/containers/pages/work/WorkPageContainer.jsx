import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PreLoadActions } from 'store/actionCreators';

class WorkPageContainer extends React.Component {
  state = {
    addItemFocus: false,
    viewType: 'all',
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
          console.log('event', event.latLng.lat());
          console.log('event', event.latLng.lng());
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
  }),
  () => ({}),
)(WorkPageContainer);

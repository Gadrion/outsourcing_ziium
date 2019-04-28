import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';

class NetworkPageContainer extends React.Component {
  render() {
    const { render, cameraList } = this.props;
    const connectedCameraList = cameraList.toJS().filter(camera => camera.status === 'Success');
    return render({
      ...this,
      ...this.state,
      ...this.props,
      connectedCameraList,
    });
  }
}

NetworkPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  cameraList: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  state => ({
    sessionKey: state.preLoadModule.get('sessionKey'),
    cameraList: state.cameraInfoModule.get('cameraList'),
  }),
)(NetworkPageContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

class PTZTabContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { selectedChannel } = nextProps;
    if (typeof selectedChannel.get('channel') === 'undefined') {
      document.getElementById('ptz_disable_mask').style.display = 'block';
      document.getElementById('ptztab_wrapper').style.pointerEvents = 'none';
    } else {
      document.getElementById('ptz_disable_mask').style.display = 'none';
      document.getElementById('ptztab_wrapper').style.pointerEvents = 'auto';
    }
    return true;
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

PTZTabContainer.propTypes = {
  render: PropTypes.func.isRequired,
  selectedChannel: PropTypes.instanceOf(Map),
};

PTZTabContainer.defaultProps = {
  selectedChannel: Map({}),
};

export default connect(
  state => ({
    selectedChannel: state.cameraInfoModule.get('selectTileCamera'),
    lang: state.langModule.get('lang'),
  }),
)(PTZTabContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { SunapiActions, PostLoadActions } from 'store/actionCreators';
import { connect } from 'react-redux';

class MainPageContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

MainPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

// export default MainPageContainer;
export default connect(
  state => ({
    sessionKey: state.preLoadModule.get('sessionKey'),
  }),
)(MainPageContainer);

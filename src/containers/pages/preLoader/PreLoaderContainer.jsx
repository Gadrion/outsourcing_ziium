import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PreLoadActions } from 'store/actionCreators';

class PreLoaderContainer extends React.Component {
  componentDidMount() {
    // PreLoadActions.sessionKeyGet();
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

PreLoaderContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    theme: state.themeModule.get('theme'),
  }),
  () => ({}),
)(PreLoaderContainer);

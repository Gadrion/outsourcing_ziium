import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as baseActions from 'store/modules/baseModule';

class LoginPageContainer extends React.Component {
  componentDidUpdate() {
    const { isLogin, history } = this.props;

    if (isLogin) {
      history.push('/');
    }
  }

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

LoginPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(
  state => ({
    pendding: state.loginModule.get('pendding'),
    isLogin: state.loginModule.get('isLogin'),
    userInfo: state.loginModule.get('userInfo'),
    isAdmin: state.loginModule.get('isAdmin'),
  }),
)(LoginPageContainer));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginActions } from 'store/actionCreators';

class LoginPageContainer extends React.Component {
  state = {
    id: 'test@gmail.com',
    password: '123456',
  }

  constructor(props) {
    super(props);

    const isLogin = sessionStorage.getItem('isLogin') ? true : false;
    if (isLogin) {
      const id = sessionStorage.getItem('id');
      const password = atob(sessionStorage.getItem('password'));

      LoginActions.login({ id, password });
    }
  }

  componentDidUpdate() {
    const { isLogin, history } = this.props;

    if (isLogin) {
      history.push('/');
    }
  }

  onChange = type => event => {
    const { target } = event;

    this.setState({
      [type]: target.value,
    });
  }

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.onClick();
    }
  }

  onClick = () => {
    const { id, password } = this.state;
    if (id !== '' && password !== '') {
      LoginActions.login({ id, password });
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
    error: state.loginModule.get('error'),
  }),
)(LoginPageContainer));

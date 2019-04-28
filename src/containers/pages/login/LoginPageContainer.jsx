import React from 'react';
import PropTypes from 'prop-types';
import Auth from 'util/lib/Auth';
import { LoginActions } from 'store/actionCreators';
import { withRouter } from 'react-router-dom';
// import * as baseActions from 'store/modules/baseModule';

class LoginPageContainer extends React.Component {
  constructor(props) {
    super(props);

    if (Auth.isAuthenticated()) {
      props.history.push('/');
    }
  }

  handleSubmit = ({
    userid,
    password,
  }) => {
    const { history } = this.props;
    LoginActions.login({
      userid,
      password,
      history,
    });
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(LoginPageContainer);

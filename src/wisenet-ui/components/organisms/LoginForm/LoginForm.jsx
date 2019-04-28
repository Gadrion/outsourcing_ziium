import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SectionStyled,
  LogoStyled,
  InputStyled,
  ButtonStyled,
} from './LoginFormStyled';

class LoginForm extends Component {
  state = {
    userid: '',
    password: '',
  }

  handleChange = e => (
    this.setState({
      [e.target.id]: e.target.value,
    })
  )

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { userid, password } = this.state;

    onSubmit({
      userid,
      password,
    });
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <React.Fragment>
        <SectionStyled>
          <LogoStyled />
        </SectionStyled>
        <SectionStyled>
          <InputStyled
            id="userid"
            placeholder="아이디"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        </SectionStyled>
        <SectionStyled>
          <InputStyled
            type="password"
            id="password"
            placeholder="비밀번호"
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          />
        </SectionStyled>
        <SectionStyled>
          <ButtonStyled
            point
            onClick={this.handleSubmit}
          >
            {'로그인'}
          </ButtonStyled>
        </SectionStyled>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;

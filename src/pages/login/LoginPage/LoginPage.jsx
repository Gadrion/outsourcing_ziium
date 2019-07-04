import React from 'react';
import PropTypes from 'prop-types';
import { LoginPageContainer } from 'containers/pages';
import { LoginTemplate } from 'templates';
import { LoginForm } from 'wisenet-ui/components/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';

const LoginPage = ({ isLogin, userInfo, isAdmin }) => (
  <LoginTemplate>
    지완 보아라 내가 지금 힘들다
    {isLogin && (
      <>
        <div>
          {`${userInfo.email} 로그인 실패 관리자에게 문의할 것`}
        </div>
        <div>
          {`관리자 권한 여부 ${isAdmin ? '있음' : '없음'}`}
        </div>
      </>
    )}
    {/* <LoginForm onSubmit={handleSubmit} /> */}
  </LoginTemplate>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withContainer(LoginPageContainer, LoginPage);

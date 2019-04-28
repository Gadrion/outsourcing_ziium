import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withContainer } from 'wisenet-ui/util/hoc';
import * as themes from 'wisenet-ui/styles/themes';
import { ThemeActions } from 'store/actionCreators';
import { PreLoaderContainer } from 'containers/pages';
import MainStyled from 'styles/MainStyled';
// import { Helmet } from 'react-helmet';

class PreLoader extends React.Component {
  componentDidMount() {
    if (
      typeof localStorage.getItem('WISENET-NVR-THEME') === 'undefined'
      || localStorage.getItem('WISENET-NVR-THEME') === null
    ) {
      localStorage.setItem('WISENET-NVR-THEME', 'black');
    }

    const themeName = localStorage.getItem('WISENET-NVR-THEME');
    ThemeActions.changeTheme({
      theme: themeName,
      setStorage: true,
    });
  }

  render() {
    const { children, theme } = this.props;
    return (
      <ThemeProvider theme={themes[theme]}>
        <React.Fragment>
          {/* <Helmet
            onChangeClientState={(newState, addedTags) => umpScriptOnload(addedTags)}
          >
            <script src="./media/ump-player.min.js" />
          </Helmet> */}
          {children}
          <MainStyled />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

PreLoader.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(PreLoaderContainer, PreLoader);

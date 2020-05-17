import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withContainer } from 'wisenet-ui/util/hoc';
import * as themes from 'wisenet-ui/styles/themes';
import { LoginActions } from 'store/actionCreators';
import { PreLoaderContainer } from 'containers/pages';
import MainStyled from 'styles/MainStyled';
import * as firebase from 'firebase';

class PreLoader extends React.Component {
  auth = firebase.auth();

  database = firebase.database();

  constructor(props) {
    super(props);

    // LoginActions.login();
  }

  // getTest = () => {
  //   // const memeRef = this.database.ref('\"test\"/');
  //   // const memeRef = this.database.ref('admin');
  //   const memeRef = firebase.database().ref('admin');
  //   console.log('memeRef', memeRef);
  //   memeRef.on('child_added', data => {
  //     console.log('data', data.val());
  //   });
  //   firebase.database().ref('admin').once('value', data => {
  //     console.log('data value', data.val());
  //   });
  //   memeRef.on('child_changed', data => {
  //     console.log('child_changed', data.val());
  //   });
  // }

  // setTest = () => {
  //   const memeRef = this.database.ref('\"test\"/');
  //   console.log('key', memeRef.push().key);
  //   memeRef.update({
  //     // test: 'fuck',
  //     test2: 'fuck',
  //   });
  // }

  render() {
    const { children, theme } = this.props;
    return (
      <ThemeProvider theme={themes[theme]}>
        <React.Fragment>
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

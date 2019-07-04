import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { withContainer } from 'wisenet-ui/util/hoc';
import * as themes from 'wisenet-ui/styles/themes';
import { LoginActions } from 'store/actionCreators';
import { WorkPageContainer } from 'containers/pages';
import * as firebase from 'firebase';

class WorkPage extends React.Component {

  componentDidMount() {
    // this.setTest();
  }

  setTest = () => {
    const memeRef = this.database.ref('\"test\"/');
    console.log('key', memeRef.push().key);
    memeRef.update({
      // test: 'fuck',
      test2: 'fuck',
    });
  }

  render() {
    const { children, theme } = this.props;
    return (
      <ThemeProvider theme={themes[theme]}>
        <React.Fragment>
          {children}
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

WorkPage.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string.isRequired,
  // umpScriptOnload: PropTypes.func.isRequired,
};

export default withContainer(WorkPageContainer, WorkPage);

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginActions, ThemeActions } from 'store/actionCreators';

class HeaderContainer extends React.Component {
  state = {
    themeValue: 0,
  }

  componentDidMount() { }

  componentDidUpdate(prevProps) {
    const { theme } = this.props;
    if (prevProps.theme !== theme) {
      this.onUpdate({
        themeValue: theme === 'black' ? 0 : 1,
      });
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  onLogout = () => {
    const { history } = this.props;
    LoginActions.logout();
    history.push('/');
  }

  handleChangeTheme = currentValue => {
    /*
      0 - black
      1 - white
    */
    const newValue = currentValue === 0 ? 1 : 0;
    const newThemeColor = newValue === 0 ? 'black' : 'white';
    ThemeActions.changeTheme({
      theme: newThemeColor,
      setStorage: true,
    });
    this.setState({
      themeValue: newValue,
    });
  }

  handleOpenOnlineHelp = () => {
    const features = 'width=850, height=650, top=0, left=0, scrollbars=yes, resizable=yes';
    window.open('https://www.hanwha-security.com/', '_blank', features);
  }

  render() {
    const { render, attributes } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        modelName: attributes ? attributes.ModelName : '',
      },
    );
  }
}

HeaderContainer.defaultProps = {
  attributes: null,
};


HeaderContainer.propTypes = {
  render: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  attributes: PropTypes.shape({
    Ready: PropTypes.bool,
    ModelName: PropTypes.string,
  }),
  theme: PropTypes.string.isRequired,
};

export default withRouter(connect(
  state => ({
    showPopup: state.headerModule.get('showPopup'),
    theme: state.themeModule.get('theme'),
    attributes: state.sunapiModule.get('attributes'),
  }),
)(HeaderContainer));

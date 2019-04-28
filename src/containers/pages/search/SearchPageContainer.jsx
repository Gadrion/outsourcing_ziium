import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { LayoutActions, ThemeActions } from 'store/actionCreators';

class SearchPageContainer extends React.Component {
  state = {
    currentTabName: 'eventTab',
    resultFolding: false,
    isFolding: false,
  }

  el = {};

  componentDidMount() {
    this.el.onfullscreenchange = () => {
      const fullScreenElement = document.fullscreenElement
        || document.msFullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement;
      if (!fullScreenElement) {
        ThemeActions.changeTheme({
          theme: localStorage.getItem('WISENET-NVR-THEME'),
          setStorage: false,
        });
        LayoutActions.fullscreenModeChange(false);
      }
    };
  }

  componentDidUpdate(prevProps) {
    const { isFullscreen } = this.props;
    if (prevProps.isFullscreen !== isFullscreen && isFullscreen) {
      this.fullscreenMode();
      this.onUpdate({
        resultFolding: true,
      });
    }
  }

  fullscreenMode = () => {
    ThemeActions.changeTheme({
      theme: 'black',
      setStorage: false,
    });
    if (this.el.requestFullscreen) {
      this.el.requestFullscreen();
    } else if (this.el.mozRequestFullScreen) {
      this.el.mozRequestFullScreen();
    } else if (this.el.webkitRequestFullscreen) {
      this.el.webkitRequestFullscreen();
    } else if (this.el.msRequestFullscreen) {
      this.el.msRequestFullscreen();
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  onSelectedTab = name => {
    this.setState({
      currentTabName: name,
    });
  }

  onChangeFolding = type => {
    const { isFolding, resultFolding } = this.state;
    if (type === 'result') {
      this.setState({
        resultFolding: !resultFolding,
      });
    } else {
      this.setState({
        isFolding: !isFolding,
      });
    }
  }

  setRef = e => {
    this.el = e;
  }

  render() {
    const { render, cameraList } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
        cameraList,
      },
    );
  }
}

SearchPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  cameraList: PropTypes.instanceOf(List).isRequired,
  isFullscreen: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    cameraList: state.cameraInfoModule.get('cameraList'),
    isFullscreen: state.layoutModule.get('isFullscreen'),
    timelineFolding: state.layoutModule.get('timelineFolding'),
  }),
)(SearchPageContainer);

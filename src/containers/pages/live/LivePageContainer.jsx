import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, fromJS, Map } from 'immutable';
import styled from 'styled-components';
import { PatternIcon } from 'wisenet-ui/components/atoms';
import { LiveMediaControlActions, LayoutActions, ThemeActions } from 'store/actionCreators';

const I = styled.i`
  display: inline-block;
  margin-right:4px;
  text-align: center;
  font-size:20px;
`;

class LivePageContainer extends React.Component {
  state = {
    tileCameraList: [],
    dragTileCameraList: List([]),
    layoutListData: List([
      {
        id: 'defaultLayout',
        text: 'Default Layout',
        icon: <PatternIcon type="4_3X3" />,
        focused: true,
        data: {
          input: false,
          backupPattern: '',
          backupLayout: {},
        },
      },
    ]),
    selectedLayoutListItem: [],
    isFolding: false,
    addingLayoutListItem: false,
    templayoutNameValue: '',
  }

  inputKey = '';

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

  shouldComponentUpdate(nextProps, nextState) {
    const {
      tileCameraList: nextTileSelectList,
    } = nextProps;

    const {
      dragTileCameraList: nextDragTileCameraList,
    } = nextState;

    const {
      tileCameraList,
    } = this.props;

    const { dragTileCameraList } = this.state;

    if (JSON.stringify(tileCameraList) !== JSON.stringify(nextTileSelectList)
      || (dragTileCameraList.size !== 0 && nextDragTileCameraList.size === 0)) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFullscreen } = this.props;
    const {
      selectedLayoutListItem: curSelectedListItem,
    } = this.state;
    const {
      selectedLayoutListItem: prevSelectedListItem,
    } = prevState;

    if (prevProps.isFullscreen !== isFullscreen && isFullscreen) {
      this.fullscreenMode();
      this.onUpdate({
        isFolding: true,
      });
    }

    if ((JSON.stringify(prevSelectedListItem) !== JSON.stringify(curSelectedListItem))
      && prevSelectedListItem.length !== 0) {
      this.uadateLayoutListItem();
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

  setDragTileCamera = (dragTileCameraList = List([])) => {
    this.setState({
      dragTileCameraList,
    });
  }

  updateSelectedLayoutListItem = selectedLayoutListItem => {
    this.setState({
      // addingLayoutListItem: false,
      selectedLayoutListItem,
    });
  }

  updateInputValue = inputValue => {
    this.setState({
      templayoutNameValue: inputValue,
    });
  }

  onClickLayoutListCtrlButton = type => event => {
    event.stopPropagation();
    const {
      pattern,
      layoutType,
      backupPattern,
      backupLayout,
    } = this.props;
    const {
      layoutListData: layoutListDataTemp,
      selectedLayoutListItem,
      templayoutNameValue,
    } = this.state;
    const layoutListData = layoutListDataTemp.toJS();
    let addingLayoutListItemTemp = false;

    switch (type) {
      case 'Add': {
        if (layoutListData.length < 10) {
          const newLayoutData = {
            id: Math.random().toString(36).substring(2, 15),
            text: `Layout 0${layoutListData.length}`,
            focused: false,
            data: {
              input: true,
              backupPattern: '',
              backupLayout: {},
            },
          };
          if (layoutType === 'dynamic') {
            newLayoutData.icon = <I className="wni wni-monitoring" />;
          } else {
            newLayoutData.icon = <PatternIcon type={pattern} />;
          }
          newLayoutData.data.backupPattern = backupPattern;
          newLayoutData.data.backupLayout = backupLayout;
          layoutListData.push(newLayoutData);
          addingLayoutListItemTemp = true;
        }
        break;
      }

      case 'Save': {
        // const index = layoutListData.length - 1;
        for (let i = 0; i < layoutListData.length; i += 1) {
          if (layoutListData[i].data.input) {
            const newLayoutData = {
              id: layoutListData[i].id,
              text: (templayoutNameValue === '' ? `Layout 0${layoutListData.length}` : templayoutNameValue),
              focused: false,
              data: {
                input: false,
                backupPattern: '',
                backupLayout: {},
              },
            };
            newLayoutData.icon = layoutListData[i].icon;
            newLayoutData.data.input = false;
            newLayoutData.data.backupPattern = layoutListData[i].data.backupPattern;
            newLayoutData.data.backupLayout = layoutListData[i].data.backupLayout;
            layoutListData.splice(i, 1, newLayoutData);
          }
        }
        addingLayoutListItemTemp = false;
        break;
      }

      case 'Edit': {
        for (let i = 0; i < layoutListData.length; i += 1) {
          if (i !== 0 && layoutListData[i].id === selectedLayoutListItem.id) {
            const newLayoutData = {
              id: selectedLayoutListItem.id,
              text: selectedLayoutListItem.text,
              icon: selectedLayoutListItem.iconLeft,
              data: {
                input: true,
                backupPattern: '',
                backupLayout: {},
              },
            };
            newLayoutData.data.backupPattern = backupPattern;
            newLayoutData.data.backupLayout = backupLayout;
            layoutListData.splice(i, 1, newLayoutData);
            addingLayoutListItemTemp = true;
          }
        }
        break;
      }

      case 'Delete': {
        for (let i = 0; i < layoutListData.length; i += 1) {
          if (i !== 0 && layoutListData[i].id === selectedLayoutListItem.id) {
            layoutListData.splice(i, 1);
          }
        }
        break;
      }

      default:
        break;
    }

    this.setState({
      addingLayoutListItem: addingLayoutListItemTemp,
      layoutListData: fromJS(layoutListData),
    });
  }

  uadateLayoutListItem = () => {
    const {
      layoutListData: layoutListDataTemp,
      addingLayoutListItem,
      templayoutNameValue,
    } = this.state;
    const layoutListData = layoutListDataTemp.toJS();
    if (addingLayoutListItem) {
      const index = layoutListData.length - 1;
      const newLayoutData = {
        id: layoutListData[index].id,
        text: (templayoutNameValue === '' ? `Layout 0${layoutListData.length}` : templayoutNameValue),
        focused: false,
        data: {
          input: false,
          backupPattern: '',
          backupLayout: {},
        },
      };
      newLayoutData.icon = layoutListData[index].icon;
      newLayoutData.data.backupPattern = layoutListData[index].data.backupPattern;
      newLayoutData.data.backupLayout = layoutListData[index].data.backupLayout;

      layoutListData.pop();
      layoutListData.push(newLayoutData);
    }

    this.setState({
      layoutListData: fromJS(layoutListData),
      addingLayoutListItem: false,
    });
  }

  onKeyPress = e => {
    this.inputKey = `${this.inputKey}${e.key}`;
    if (this.inputKey.match('dev')) {
      LiveMediaControlActions.channelInfoModeControl();
      this.inputKey = '';
    }
  }

  onChangeFolding = () => {
    const { isFolding } = this.state;
    this.setState({
      isFolding: !isFolding,
    });
  }

  setRef = e => {
    this.el = e;
  }

  render() {
    const { render } = this.props;

    return render({
      ...this,
      ...this.props,
      ...this.state,
    });
  }
}

LivePageContainer.defaultProps = {
  pattern: '',
  layoutType: '',
  backupLayout: {},
};

LivePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  tileCameraList: PropTypes.instanceOf(List).isRequired,
  pattern: PropTypes.string,
  backupPattern: PropTypes.string.isRequired,
  backupLayout: PropTypes.instanceOf(Map),
  layoutType: PropTypes.string,
  isFullscreen: PropTypes.bool.isRequired,
};

export default connect(
  state => {
    const { currentNumber: layoutPageCurrentNumber } = state.liveMediaControlModule.get('layoutPageInfo').toJS();
    return ({
      lang: state.langModule.get('lang'),
      tileCameraList: state.cameraInfoModule.get('tileCameraListPage').get(`${layoutPageCurrentNumber}`),
      selectedChannel: state.cameraInfoModule.get('selectTileCamera'),
      pattern: state.liveMediaControlModule.get('pattern'),
      backupPattern: state.liveMediaControlModule.get('backupPattern'),
      backupLayout: state.liveMediaControlModule.get('backupLayout'),
      layoutType: state.liveMediaControlModule.get('layoutType'),
      isFullscreen: state.layoutModule.get('isFullscreen'),
    });
  },
)(LivePageContainer);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MediaControlIDList } from 'wisenet-ui/util/static/constants/mediaControl/mediaControlType';
import { SearchMediaControlActions, SearchTimelineActions, LayoutActions } from 'store/actionCreators';
import { Map, List } from 'immutable';

class SearchMediaControlBarContainer extends React.Component {
  state = {
    playSpeedValue: 'x1',
    currentPlaySpeed: '1',
    searchState: true,
    playSpeedIndex: 3,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }
    return true;
  }

  onClick = type => event => {
    const {
      playMode,
    } = this.props;

    const {
      searchState,
    } = this.state;

    switch (type) {
      case MediaControlIDList.CAPTURE:
        if (playMode !== 'stop') {
          SearchMediaControlActions.functionControl('capture');
        }
        break;
      case MediaControlIDList.EXPORT:
        break;
      case MediaControlIDList.SOUND:
        break;
      case MediaControlIDList.AREA:
        break;
      case MediaControlIDList.BACKWARD: {
        // 방향 전환시 배속 단위 기본 배속으로 복귀
        const playSpeed = -1;
        SearchMediaControlActions.playSpeedControl({
          playSpeed,
        });
        // 배속 설정 -로 변경
        this.setState({ playSpeedValue: '-x1', searchState: false, playSpeedIndex: 3 });
        break;
      }
      case MediaControlIDList.PAUSE:
      case MediaControlIDList.PLAY: {
        SearchMediaControlActions.playControl({
          playMode: type,
        });
        break;
      }
      case MediaControlIDList.FORWARD: {
        // 방향 전환시 배속 단위 기본 배속으로 복귀
        const playSpeed = 1;
        SearchMediaControlActions.playSpeedControl({
          playSpeed,
        });
        // 배속 설정 +로 변경
        this.setState({ playSpeedValue: 'x1', searchState: true, playSpeedIndex: 3 });
      }
        break;
      case MediaControlIDList.PREV_EVENT:
      case MediaControlIDList.AFTER_EVENT: {
        if (playMode === 'play') {
          this.eventControl(type);
        }
        break;
      }
      case MediaControlIDList.OSD:
        SearchMediaControlActions.OSDDisplayControl();
        break;
      case MediaControlIDList.STATUS:
        break;
      case MediaControlIDList.ROTATE:
        break;
      case MediaControlIDList.ASPECT_RATIO:
        break;
      case MediaControlIDList.FULLSCREEN:
        LayoutActions.fullscreenModeChange(true);
        break;
      case MediaControlIDList.PLAY_SPEED: {
        const speedList = MediaControlIDList.PLAY_SPEED_LIST[event].split('x')[1];
        const playSpeed = searchState ? Number(speedList) : Number(speedList) * -1;
        if (searchState) {
          this.setState({ playSpeedValue: MediaControlIDList.PLAY_SPEED_FRACTION_LIST[event] });
        } else {
          this.setState({ playSpeedValue: MediaControlIDList.PLAY_SPEED_M_FRACTION_LIST[event] });
        }
        this.setState({ currentPlaySpeed: playSpeed, playSpeedIndex: event });
        SearchMediaControlActions.playSpeedControl({
          playSpeed,
        });
        break;
      }
      case MediaControlIDList.TIMELINE_FOLD:
        LayoutActions.timelineFoldingChange();
        break;
      default:
        break;
    }
  };

  // 1/8, 1/4 표기로 현재 playSpeed 문자이용에서 숫자로 변경
  getCurrentPlaySpeed = () => {
    const {
      currentPlaySpeed,
    } = this.state;

    const playSpeed = currentPlaySpeed;

    // return type === MediaControlIDList.BACKWARD ? playSpeed * -1 : playSpeed;
    return playSpeed;
  }

  eventControl = type => {
    const { selectEvent } = this.props;
    const index = selectEvent.toJS() ? selectEvent.toJS().index : -1;
    const nextIndex = type === MediaControlIDList.PREV_EVENT ? index - 1 : index + 1;

    const { filterEvent: propsFilterEvent } = this.props;
    const filterEvent = propsFilterEvent.toJS();
    if (nextIndex >= 0 && nextIndex < filterEvent.length) {
      SearchTimelineActions.setSelectEvent({
        ...filterEvent[nextIndex],
        index: nextIndex,
        isReopen: true,
      });
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

SearchMediaControlBarContainer.propTypes = {
  render: PropTypes.func.isRequired,
  playMode: PropTypes.oneOf(['play', 'stop', 'pause']).isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
  filterEvent: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  state => ({
    playMode: state.searchMediaControlModule.get('playMode'),
    filterEvent: state.searchTimelineModule.get('filterEvent'),
    searchResult: state.textSearchModule.get('searchResult'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
    isFullscreen: state.layoutModule.get('isFullscreen'),
    timelineFolding: state.layoutModule.get('timelineFolding'),
  }),
)(SearchMediaControlBarContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchMediaControlActions } from 'store/actionCreators';
import { Map } from 'immutable';

class PlaybackVideoTileContainer extends React.Component {
  state = {
    startTime: '',
    endTime: '',
    useIsoTimeFormat: true,
    seekingTime: '',
  };

  componentDidMount() {
    const { timeLine: propsTimeLine } = this.props;
    const timeLine = propsTimeLine ? propsTimeLine[0] : null;

    if (timeLine) {
      this.setTime(timeLine);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      selectEvent: nextSelectEvent,
    } = nextProps;

    const {
      selectEvent: propsSelectEvent,
    } = this.props;

    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }

    const toJSNextSelectEvent = nextSelectEvent.toJS();
    const toJSPropsSelectEvent = propsSelectEvent.toJS();

    if (JSON.stringify(toJSNextSelectEvent) !== JSON.stringify(toJSPropsSelectEvent)) {
      const selectEvent = nextSelectEvent.toJS();
      return selectEvent.isReopen;
    }

    return true;
  }

  componentDidUpdate(prevProps) { // , prevState, snapshot
    const {
      timeLine: prevTimeLine,
    } = prevProps;

    const {
      timeLine: propsTimeLine,
      overlappedIDList,
      currentTabName,
      selectEvent: propsSelectEvent,
    } = this.props;

    // 타임라인을 처음 그릴 필요가 있는 경우
    if (JSON.stringify(prevTimeLine) !== JSON.stringify(propsTimeLine)) {
      const timeLine = propsTimeLine ? propsTimeLine[0] : null;

      if (timeLine) {
        if (currentTabName !== 'textTab') {
          this.setTime(timeLine);
        } else {
          const selectEvent = propsSelectEvent.toJS();
          this.setTime(timeLine, selectEvent.StartTime);
        }
      } else {
        SearchMediaControlActions.playControl({
          playMode: 'stop',
        });
      }
    } else {
      const {
        selectEvent: prevSelectEvent,
      } = prevProps;

      if (JSON.stringify(prevSelectEvent) !== JSON.stringify(propsSelectEvent)) {
        const selectEvent = propsSelectEvent.toJS();
        this.onUpdate({
          seekingTime: selectEvent.StartTime,
          overlappedId: overlappedIDList,
        });
      }
    }
  }

  setTime = (timeLine, seekingTime = '') => {
    const { overlappedIDList } = this.props;
    SearchMediaControlActions.playControl({
      playMode: 'play',
    });

    this.onUpdate({
      startTime: timeLine.normal[0].StartTime,
      endTime: timeLine.normal[timeLine.normal.length - 1].EndTime,
      overlappedId: overlappedIDList,
      seekingTime,
    });
  }

  onTimestamp = data => {
    const { setCurrentTime } = this.props;

    setCurrentTime(data.detail.timestamp);
  }

  onCapture = (event, data) => {
    // capture의 기능 확인을 위한 코드
    SearchMediaControlActions.functionControl('none');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(event.detail.blob);
    a.download = `${data.channel}-new_file_name.png`;
    a.click();
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  );

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

PlaybackVideoTileContainer.propTypes = {
  render: PropTypes.func.isRequired,
  overlappedIDList: PropTypes.oneOfType([PropTypes.any]).isRequired,
  timeLine: PropTypes.oneOfType([PropTypes.any]).isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
  currentTabName: PropTypes.oneOf(['eventTab', 'textTab']).isRequired,
};

export default connect(
  state => ({
    sessionKey: state.preLoadModule.get('sessionKey'),
    overlappedIDList: state.searchTimelineModule.get('overlappedIDList'),
    timeLine: state.searchTimelineModule.get('timeLineSearchResults'),
    playMode: state.searchMediaControlModule.get('playMode'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
    functionMode: state.searchMediaControlModule.get('functionMode'),
    playSpeed: state.searchMediaControlModule.get('playSpeed'),
    OSDDisplay: state.searchMediaControlModule.get('OSDDisplay'),
  }),
)(PlaybackVideoTileContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchTimelineActions } from 'store/actionCreators';
import { Map } from 'immutable';

class SearchCurrentTimeContainer extends React.Component {
  state = {
    currentTime: new Date(0, 0, 0, 0, 0, 0).toISOString(),
    isWork: true,
  }

  componentDidUpdate(prevProps) {
    const {
      timeLineSearchResults: prevTimeline,
      searchDateObj: prevSearchDateObj,
    } = prevProps;
    const {
      timeLineSearchResults: timeLine,
      searchDateObj,
    } = this.props;

    if (JSON.stringify(prevTimeline) !== JSON.stringify(timeLine)) {
      this.index = undefined;
      this.onUpdate({
        isWork: true,
        // currentTime: new Date(0, 0, 0, 0, 0, 0).toISOString(),
      });
    } else if (JSON.stringify(prevSearchDateObj) !== JSON.stringify(searchDateObj)) {
      this.onUpdate({
        isWork: false,
        currentTime: new Date(0, 0, 0, 0, 0, 0).toISOString(),
      });
    }
  }

  setCurrentTime = currentTime => {
    const { currentTabName } = this.props;
    const { currentTime: stateCurrentTime } = this.state;
    const { isWork } = this.state;
    const currentTimeSec = Number(/:\d\d\./g.exec(currentTime)[0].replace(/[^0-9]/g, ''));
    const stateCurrentTimeSec = stateCurrentTime
      ? Number(/:\d\d\./g.exec(stateCurrentTime)[0].replace(/[^0-9]/g, ''))
      : 0;

    if (isWork && (currentTimeSec !== stateCurrentTimeSec)) {
      this.nextEventCheck(currentTime, currentTabName);
      this.setState({ currentTime });
    }
  }

  findNextIndex = (currentTime, currentTabName) => {
    const { selectEvent: propsSelectEvent, filterEvent: propsFilterEvent } = this.props;
    const selectEvent = propsSelectEvent.toJS();
    // tab을 변경 하였을 때 기존에 선택된 이벤트가 있을 경우 로직을 타게 하기 위해서 넣은 예외처리
    if ((currentTabName === 'eventTab' && selectEvent.Type === 'UserInput')
      || (currentTabName === 'textTab' && (selectEvent.Type && selectEvent.Type !== 'UserInput'))) {
      selectEvent.index = undefined;
    }
    const filterEvent = propsFilterEvent.toJS();
    const currentEventTime = new Date(currentTime);

    if (typeof selectEvent.index !== 'undefined') {
      if (this.index) {
        this.index = undefined;
      }
      return selectEvent.index + 1;
    }

    if (typeof this.index !== 'undefined') {
      return this.index + 1;
    }

    // 처음 진입하였을 때 이벤트가 없는 구간에서 영상을 시작 할 경우 처음 검색할 이벤트를 찾기 위한 로직
    this.index = filterEvent.findIndex(event => {
      const eventStartTime = new Date(event.StartTime);
      const eventEndTime = new Date(event.EndTime);
      const result = (eventEndTime >= currentEventTime && eventStartTime <= currentEventTime);
      return result;
    });
    return this.index;
  }

  nextEventCheck = (currentTime, currentTabName) => {
    const {
      filterEvent: propsFilterEvent,
      selectEvent: propsSelectEvent,
    } = this.props;

    const selectEvent = propsSelectEvent.toJS();
    const filterEvent = propsFilterEvent.toJS();
    const nextIndex = this.findNextIndex(currentTime, currentTabName);

    if (filterEvent.length !== 0 && filterEvent.length > nextIndex) {
      const currentEventTime = new Date(currentTime);
      const nextEventStartTime = new Date(filterEvent[nextIndex].StartTime);
      const nextEventEndTime = new Date(filterEvent[nextIndex].EndTime);

      if (nextEventEndTime >= currentEventTime && nextEventStartTime <= currentEventTime) {
        const nextEvent = {
          ...selectEvent,
          ...filterEvent[nextIndex],
          index: nextIndex,
        };
        if (JSON.stringify(selectEvent) !== JSON.stringify(nextEvent)) {
          SearchTimelineActions.setSelectEvent({
            ...nextEvent,
            isReopen: false,
          });
        }
      }
    }
  }

  setCurrentTimeWork = workState => {
    this.setState(workState);
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

SearchCurrentTimeContainer.propTypes = {
  render: PropTypes.func.isRequired,
  timeLineSearchResults: PropTypes.oneOfType([PropTypes.any]).isRequired,
  currentTabName: PropTypes.oneOf(['eventTab', 'textTab']).isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
  searchDateObj: PropTypes.oneOfType([PropTypes.any]).isRequired,
  filterEvent: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default connect(
  state => ({
    timeLineSearchResults: state.searchTimelineModule.get('timeLineSearchResults'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
    searchDateObj: state.eventSearchModule.get('searchDateObj'),
    filterEvent: state.searchTimelineModule.get('filterEvent'),
  }),
)(SearchCurrentTimeContainer);

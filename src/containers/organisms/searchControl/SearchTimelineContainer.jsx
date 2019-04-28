import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventSearchActions, SearchTimelineActions } from 'store/actionCreators';
import { Map, List } from 'immutable';

class SearchTimelineContainer extends React.Component {
  state = {
    overlappedList: ['overlapped0', 'overlapped1'],
    currentOverlapValue: 'overlapped0',
    timeLine: [],
    useMouseoverPopup: true,
    zoom: 0,
    zoomDT: '24',
  }

  componentDidUpdate(prevProps) {
    const {
      timeLine: prevTimeLine,
    } = prevProps;

    const {
      timeLine: propsTimeLine,
      filterEvent,
      // currentTabName,
    } = this.props;

    if (JSON.stringify(prevTimeLine) !== JSON.stringify(propsTimeLine)) {
      const timeLine = propsTimeLine ? propsTimeLine[0] : null;
      if (timeLine) {
        const event = filterEvent.toJS();
        const results = [...timeLine.normal, ...event];
        this.onUpdate({
          timeLine: {
            Channel: timeLine.Channel,
            Results: results,
          },
          startDate: timeLine.normal[0].StartTime,
        });
      }
    }
  }

  onClick = type => event => {
    switch (type) {
      case 'overlap':
        this.setState({
          currentOverlapValue: event.target.value,
        });
        break;
      case 'left':
      case 'right': {
        const { currentTabName } = this.props;
        if (currentTabName === 'eventTab') {
          const { searchDateObj } = this.props;
          const { year, month, day } = searchDateObj;
          const date = new Date(year, month - 1, day);
          const directionNum = type === 'left' ? -1 : 1;
          date.setDate(date.getDate() + directionNum);

          EventSearchActions.setSearchDate(date);

          SearchTimelineActions.getTimeline({
            startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            type: 'eventTab',
          });
        }
        break;
      }
      case 'plus':
      case 'minus': {
        const { zoom } = this.state;
        this.setState({
          zoom: type === 'plus' ? Number(zoom + 1) : Number(zoom - 1),
        });
        break;
      }
      case 'channel': {
        const {
          selectEvent,
        } = this.props;

        SearchTimelineActions.setCurrentChannel(Number(event.target.value));
        SearchTimelineActions.getTimeline({
          startDate: selectEvent.toJS().PlayTime,
          type: 'textTab',
        });
        break;
      }
      default:
        break;
    }
  }

  onTimechanged = event => {
    const { setCurrentTimeWork } = this.props;
    const currentTime = event.time.toISOString();

    SearchTimelineActions.setSelectEvent({
      isReopen: true,
      StartTime: currentTime,
    });
    setCurrentTimeWork({
      isWork: true,
      currentTime,
    });
  }

  onMouseDownTimeline = event => {
    if (event.what === 'custom-time') {
      const { setCurrentTimeWork } = this.props;
      setCurrentTimeWork({ isWork: false });
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  );

  customTimeChangeEvent = () => {
    // TimelineClickEvent : getCustomTime
    // const newCurrentTime = e.time;
    // const newSelectedData = e.selectedData;
    // console.log(`CurrentCustomTimeChanged::::::${newCurrentTime}`);
    // console.log(`CurrentSelectedDataChanged::::::${newSelectedData.group}`);
  }

  zoomChangeEvent = e => {
    // console.log(`zoomChanged::::::${e.timelineRange}`);
    this.setState({
      zoomDT: e.timelineRange,
    });
  }

  render() {
    const {
      render,
    } = this.props;
    // console.log(this.props.timeLine);

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

SearchTimelineContainer.propTypes = {
  render: PropTypes.func.isRequired,
  timeLine: PropTypes.oneOfType([PropTypes.any]).isRequired,
  currentTabName: PropTypes.oneOf(['eventTab', 'textTab']).isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
  // searchResult: PropTypes.arrayOf(PropTypes.shape({
  //   ChannelIDList: PropTypes.array,
  //   Data: PropTypes.string,
  //   PlayTime: PropTypes.string,
  //   Result: PropTypes.number,
  //   TextData: PropTypes.string,
  // })).isRequired,
  // SearchCurrentTimeContainer 제어
  setCurrentTimeWork: PropTypes.func.isRequired,
  searchDateObj: PropTypes.instanceOf(Object).isRequired,
  filterEvent: PropTypes.instanceOf(List).isRequired,
};

export default connect(
  state => ({
    overlappedIDList: state.searchTimelineModule.get('overlappedIDList'),
    timeLine: state.searchTimelineModule.get('timeLineSearchResults'),
    searchResult: state.textSearchModule.get('searchResult'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
    searchDateObj: state.eventSearchModule.get('searchDateObj'),
    filterEvent: state.searchTimelineModule.get('filterEvent'),
  }),
)(SearchTimelineContainer);

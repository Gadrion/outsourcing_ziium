import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchTimelineActions } from 'store/actionCreators';

class EventResultContainer extends React.Component {
  state = {
    results: [],
    isDescending: false, // 내림차순 정렬 판단 값. 기본은 오름차순임
    currentItemIndex: this.INIT_PAGE_COUNT,
  };

  INIT_PAGE_COUNT = 10;

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && nextState === this.state) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) { // , prevState, snapshot
    const {
      filterEvent: prevFilterEvent,
    } = prevProps;

    const {
      filterEvent: propsFilterEvent,
    } = this.props;

    if (propsFilterEvent && JSON.stringify(prevFilterEvent) !== JSON.stringify(propsFilterEvent)) {
      const filterEvent = propsFilterEvent.toJS();
      const result = filterEvent.map((item, idx) => ({
        Index: idx + 1,
        Type: item.Type,
        StartTime: (new Date(item.StartTime)).toTimeString().split(' ')[0],
        EndTime: (new Date(item.EndTime)).toTimeString().split(' ')[0],
      }));
      this.onUpdate({
        results: result,
        currentItemIndex: this.INIT_PAGE_COUNT,
      });
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  onSelectEvent = e => {
    const { filterEvent: propsFilterEvent } = this.props;
    const filterEvent = propsFilterEvent.toJS();
    if (!filterEvent[e.data.Index - 1]) {
      console.log('선택한 항목이 어떤건지 모르겠슴다', filterEvent);
      return;
    }
    SearchTimelineActions.setSelectEvent({
      ...filterEvent[e.data.Index - 1],
      // index: e.data.Index,
      isReopen: true,
    });
  }

  descending = () => {
    const { isDescending } = this.state;
    this.onUpdate({
      isDescending: !isDescending,
    });
  }

  onClickViewMore = () => {
    const { currentItemIndex } = this.state;
    this.onUpdate({
      currentItemIndex: currentItemIndex + this.INIT_PAGE_COUNT,
    });
  }

  onClickViewAll = () => {
    const { results } = this.state;
    this.onUpdate({
      currentItemIndex: results.length,
    });
  }

  render() {
    const { render } = this.props;

    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

EventResultContainer.propTypes = {
  render: PropTypes.func.isRequired,
  filterEvent: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    filterEvent: state.searchTimelineModule.get('filterEvent'),
  }),
)(EventResultContainer);

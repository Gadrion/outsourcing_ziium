import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchTimelineActions } from 'store/actionCreators';
import { Map, List } from 'immutable';

class TextListContainer extends React.Component {
  state = {
    isDescending: false,
    currentItemIndex: this.INIT_PAGE_COUNT,
  }

  INIT_PAGE_COUNT = 10;

  shouldComponentUpdate(nextProps, nextState) {
    const { searchResult: nextSearchResult } = nextProps;
    const {
      isDescending: nextIsDescending,
      currentItemIndex: nextItemIndex,
    } = nextState;
    const { searchResult } = this.props;
    const {
      isDescending,
      currentItemIndex,
    } = this.state;

    if (JSON.stringify(nextSearchResult) === JSON.stringify(searchResult)
      && nextIsDescending === isDescending
      && nextItemIndex === currentItemIndex) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) { // , prevState, snapshot
    const {
      searchResult: prevSearchResult,
    } = prevProps;

    const {
      searchResult: propsSearchResult,
    } = this.props;

    if (propsSearchResult
      && JSON.stringify(prevSearchResult) !== JSON.stringify(propsSearchResult)) {
      this.onUpdate({
        isDescending: false,
        currentItemIndex: this.INIT_PAGE_COUNT,
      });
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  onSelect = e => {
    const { Index, Keyword } = e.data;
    const keywordList = Keyword.split(',');
    const {
      searchResult,
      filterEvent: propsFilterEvnet,
      selectEvent: propsSelectEvent,
    } = this.props;
    const filterEvent = propsFilterEvnet.toJS();
    const selectEvent = propsSelectEvent.toJS();
    const haveTextSelectEvent = selectEvent.Type === 'UserInput';
    // 검색 리스트와 타임라인에 그려지는 배열이 다를 수 있기 때문에 검사하는 로직
    const findEventIndex = filterEvent.findIndex(event => (
      event.PlayTime === searchResult[Index].PlayTime
    ));
    const selectObject = haveTextSelectEvent ? filterEvent[findEventIndex] : searchResult[Index];
    selectObject.KeywordsMatched = keywordList;
    SearchTimelineActions.setSelectEvent({
      ...selectObject,
      isReopen: true,
      StartTime: selectObject.PlayTime,
    });
    // 선택 시 처음에 등록된 체널로 세팅
    if (!haveTextSelectEvent) {
      SearchTimelineActions.setCurrentChannel(searchResult[Index].ChannelIDList[0]);
      SearchTimelineActions.getTimeline({
        startDate: selectObject.PlayTime,
        type: 'textTab',
      });
    }
  }

  onDescend = () => {
    const { isDescending } = this.state;
    this.setState({
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
    const { searchResult } = this.props;
    if (searchResult) {
      this.onUpdate({
        currentItemIndex: searchResult.length,
      });
    }
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

TextListContainer.defaultProps = {
};

TextListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.shape({
    ChannelIDList: PropTypes.array,
    Data: PropTypes.string,
    PlayTime: PropTypes.string,
    Result: PropTypes.number,
    TextData: PropTypes.string,
  })).isRequired,
  filterEvent: PropTypes.instanceOf(List).isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    searchResult: state.textSearchModule.get('searchResult'),
    posConfigList: state.textSearchModule.get('posConfigList'),
    eventKeywordCheckStatus: state.textSearchModule.get('eventKeywordCheckStatus'),
    filterEvent: state.searchTimelineModule.get('filterEvent'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
  }),
)(TextListContainer);

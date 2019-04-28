import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextSearchActions } from 'store/actionCreators';

class TextSearchContainer extends React.Component {
  eventKeywordList = [];

  constructor(props) {
    super(props);
    TextSearchActions.requestTextSearch({
      requestType: 'GET_POS_EVENT_CONFIG',
    });
    this.state = {
      searchKeywords: null,
      disableKeyword: false,
    };
  }

  componentDidMount = () => {
    // @daesang.kim
    // 기존에 시간 set 하는 방식이 아래와 같은 방식이라서 번거롭지만 같은 방식 사용
    // 시작시간 초기화 설정 (store에 적용 필요)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    TextSearchActions.setSearchDate({
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    });
    TextSearchActions.setSearchTime({
      hour: startDate.getHours(),
      minute: startDate.getMinutes(),
      second: startDate.getSeconds(),
    });
    TextSearchActions.applySearchDateTime('start');

    // 끝시간 초기화 설정 (store에 적용 필요)
    const endDate = new Date();
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    TextSearchActions.setSearchDate({
      year: endDate.getFullYear(),
      month: endDate.getMonth() + 1,
      day: endDate.getDate(),
    });
    TextSearchActions.setSearchTime({
      hour: endDate.getHours(),
      minute: endDate.getMinutes(),
      second: endDate.getSeconds(),
    });
    TextSearchActions.applySearchDateTime('end');
  }

  validateKeyword = () => {
    const { attributes, keyword, eventKeyword } = this.props;

    let keywordString = '';
    if (eventKeyword.length > 0) {
      eventKeyword.map((item, idx) => {
        if (item.isChecked) {
          if (idx === eventKeyword.length - 1) {
            keywordString = `${keywordString}${item.condition}`;
          } else {
            keywordString = `${keywordString}${item.condition} `;
          }
        }
        return keywordString;
      });
    }

    if (keywordString === '') {
      keywordString = keyword;
    }

    if (keywordString.length > Number(attributes.SearchKeywordMaxLen)) {
      // 키워드 길이는 최대 50
      return false;
    }

    return true;
  }

  validateDate = () => {
    const oneDay = 1000 * 60 * 60 * 24;

    const { searchStartDateObj, searchEndDateObj } = this.props;

    const startDateString = `${searchStartDateObj.year}-${searchStartDateObj.month}-${searchStartDateObj.day}`;
    const endDateString = `${searchEndDateObj.year}-${searchEndDateObj.month}-${searchEndDateObj.day}`;
    const startTimeString = `${searchStartDateObj.hour}:${searchStartDateObj.minute}:${searchStartDateObj.second}`;
    const endTimeString = `${searchEndDateObj.hour}:${searchEndDateObj.minute}:${searchEndDateObj.second}`;

    const startDate = new Date(`${startDateString} ${startTimeString}`);
    const endDate = new Date(`${endDateString} ${endTimeString}`);

    const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    const dayDiff = Math.floor((endUTC - startUTC) / oneDay);
    const timeDiff = Math.floor(((endDate.getTime() - startDate.getTime()) / 1000) % 60);

    if (dayDiff > 7) {
      // 텍스트 검색은 최대 7일까지 가능합니다.
      return false;
    }

    if (dayDiff < 0) {
      // 시작 날짜는 끝 날짜보다 앞서야 합니다.
      return false;
    }

    if (timeDiff < 0) {
      // 종료시간이 시작시간보다 앞설 수 없습니다.
      return false;
    }

    return true;
  }

  onKeywordChange = e => {
    TextSearchActions.setKeyword(e.target.value);
  }

  onSelectChanged = list => {
    for (let i = 0; i < list[0].children.length; i += 1) {
      const { checked } = list[0].children[i];
      TextSearchActions.setEventKeyword({
        index: i,
        checked: checked !== 0,
      });
    }
    let isItemChecked = false;
    if (list.length > 0) {
      list.some(item => {
        if (item.checked !== 0) {
          isItemChecked = true;
          return true;
        }
        return false;
      });
    }
    this.setState({
      disableKeyword: isItemChecked,
    });
  }

  onOptionChange = e => {
    const isChecked = !e.currentTarget.childNodes[0].checked;
    if (e.currentTarget.getAttribute('value') === 'case_sensitive') {
      TextSearchActions.setIsCaseSensitive(isChecked ? 'True' : 'False');
    } else {
      TextSearchActions.setIsWholeWord(isChecked ? 'True' : 'False');
    }
  }

  onApply = () => {
    const { searchToken } = this.props;

    if (this.validateDate() && this.validateKeyword()) {
      if (searchToken !== '') {
        TextSearchActions.requestTextSearch({
          requestType: 'CONTROL_METADATA',
          Mode: 'Cancel',
        });
      }

      TextSearchActions.requestTextSearch({
        requestType: 'CONTROL_METADATA',
        Mode: 'Start',
      });
    }
  }

  onCancel = () => {

  }

  convertEventKeyword2TreeData = list => {
    const result = list.map(item => ({
      id: item.condition,
      name: item.condition,
      checked: item.isChecked === false ? 0 : 1,
      parents: ['all'],
      icon: {
        type: 'circle',
        color: 'red',
      },
    }));
    return result;
  }

  eventKeywordToTree = () => {
    const { eventKeyword } = this.props;
    this.eventKeywordList = [
      {
        id: 'all',
        name: 'All',
        expanded: true,
        children: this.convertEventKeyword2TreeData(eventKeyword.toJS()),
      },
    ];
  }

  render() {
    const { render } = this.props;
    this.eventKeywordToTree();
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

TextSearchContainer.propTypes = {
  render: PropTypes.func.isRequired,
  searchStartDateObj: PropTypes.oneOfType([PropTypes.any]).isRequired,
  searchEndDateObj: PropTypes.oneOfType([PropTypes.any]).isRequired,
  attributes: PropTypes.shape({
    SearchKeywordMaxLen: PropTypes.shape({
      maxLength: PropTypes.string,
    }),
  }).isRequired,
  keyword: PropTypes.string.isRequired,
  eventKeyword: PropTypes.oneOfType([PropTypes.any]).isRequired,
  searchToken: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    searchStartDateObj: state.textSearchModule.get('searchStartDateObj'),
    searchEndDateObj: state.textSearchModule.get('searchEndDateObj'),
    keyword: state.textSearchModule.get('keyword'),
    isCaseSensitive: state.textSearchModule.get('isCaseSensitive'),
    isWholeWord: state.textSearchModule.get('isWholeWord'),
    searchToken: state.textSearchModule.get('searchToken'),
    overlappedIDList: state.searchTimelineModule.get('overlappedIDList'),
    metaDataState: state.textSearchModule.get('metaDataState'),
    posEventConfig: state.textSearchModule.get('posEventConfig'),
    eventKeyword: state.textSearchModule.get('eventKeyword'),
    attributes: state.sunapiModule.get('attributes'),
  }),
)(TextSearchContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventSearchActions, SearchTimelineActions } from 'store/actionCreators';

class BasicDatePickerContainer extends React.Component {
  onDateChange = date => {
    EventSearchActions.setSearchDate(date);
    // const { year, month, day } = date;
    SearchTimelineActions.getTimeline({
      startDate: date,
      type: 'eventTab',
    });
  }

  render() {
    const {
      render,
      calenderSearchResults,
      searchDateObj,
    } = this.props;

    // Calendar 에 활성화 시킬 날짜를 넣어주도록 하는 Parameter
    if (calenderSearchResults
      && calenderSearchResults.CalenderSearchResults
      && calenderSearchResults.CalenderSearchResults[0]) {
      this.includeDates = [];
      const result = calenderSearchResults.CalenderSearchResults[0].Result.split('');
      const year = calenderSearchResults.requestData.Month.split('-')[0];
      const month = calenderSearchResults.requestData.Month.split('-')[1];
      result.forEach((ele, i) => {
        if (ele === '1') {
          this.includeDates.push(new Date(year, month - 1, i + 1));
        }
      });
    }
    this.selectedDate = new Date(searchDateObj.year, searchDateObj.month - 1, searchDateObj.day);
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

BasicDatePickerContainer.propTypes = {
  render: PropTypes.func.isRequired,
  searchDateObj: PropTypes.oneOfType([PropTypes.any]),
  calenderSearchResults: PropTypes.oneOfType([PropTypes.any]),
};

BasicDatePickerContainer.defaultProps = {
  calenderSearchResults: [],
  searchDateObj: null,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    searchDateObj: state.eventSearchModule.get('searchDateObj'),
    calenderSearchResults: state.eventSearchModule.get('calenderSearchResults'),
  }),
)(BasicDatePickerContainer);

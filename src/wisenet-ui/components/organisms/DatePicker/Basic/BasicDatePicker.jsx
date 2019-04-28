import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { DateHeader } from 'wisenet-ui/components/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import { BasicDatePickerContainer } from 'containers/organisms';
import { Wrapper } from './BasicDatePickerStyled';

class BasicDatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
  }

  onSelect = date => {
    const { onDateChange } = this.props;
    onDateChange(date);
  }

  onClickToday = e => {
    const today = new Date();
    this._calendar.handleSelect(today, e);

    const { onDateChange } = this.props;
    onDateChange(today);
  }

  render() {
    const {
      selectedDate,
      includeDates,
    } = this.props;


    return (
      <Wrapper>
        <DatePicker
          inline
          shouldCloseOnSelect={false}
          ref={c => { this._calendar = c; }}
          selected={selectedDate}
          onChange={this.onSelect}
          dateFormat="yyyy-MM-dd HH:mm:ss"
          includeDates={includeDates}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <DateHeader
              date={date}
              changeYear={changeYear}
              changeMonth={changeMonth}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              prevMonthButtonDisabled={prevMonthButtonDisabled}
              nextMonthButtonDisabled={nextMonthButtonDisabled}
              onClick={this.onClickToday}
            />
          )}
        />
      </Wrapper>
    );
  }
}

BasicDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  includeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

BasicDatePicker.defaultProps = {
  selectedDate: null,
  onDateChange: () => {},
  includeDates: [],
};

export default withContainer(BasicDatePickerContainer, BasicDatePicker);

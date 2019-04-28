import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { withContainer } from 'wisenet-ui/util/hoc';
import { DatePickerContainer } from 'containers/organisms';
import DatePicker from 'react-datepicker';
import DateInput from './DateInput';
import DateHeader from './DateHeader';
import StartCalendarContainer from './StartCalendarContainer';
import EndCalendarContainer from './EndCalendarContainer';
import { Wrapper } from './DatePickerPopperStyled';

class CustomDatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const date = new Date();
    if (props.label === 'start') {
      date.setDate(date.getDate() - 7);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    } else {
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
    }
    this.state = {
      currentDate: date,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onClickToday = this.onClickToday.bind(this);
  }

  onSelect = date => {
    const { onDateChange } = this.props;
    onDateChange(date);
    this.setState({
      currentDate: date,
    });
  }

  onClickToday = e => {
    const { onDateChange } = this.props;
    const today = new Date();
    this._calendar.handleSelect(today, e);
    onDateChange(today);
    this.setState({
      currentDate: today,
    });
  }

  render() {
    const { title, label } = this.props;
    const { currentDate } = this.state;

    return (
      <Wrapper>
        <DatePicker
          shouldCloseOnSelect={false}
          ref={c => { this._calendar = c; }}
          customInput={<DateInput data={title} />}
          calendarContainer={label === 'start' ? StartCalendarContainer : EndCalendarContainer}
          selected={currentDate}
          onChange={this.onSelect}
          dateFormat="yyyy-MM-dd HH:mm:ss"
          popperModifiers={{
            flip: {
              enabled: false,
            },
            offset: {
              enabled: true,
              offset: label === 'start' ? '10px, 0px' : '-140px, 0px',
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
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

CustomDatePicker.propTypes = {
  onDateChange: PropTypes.func,
  title: PropTypes.string,
  label: PropTypes.string,
};

CustomDatePicker.defaultProps = {
  onDateChange: () => {},
  title: '',
  label: '',
};

export default withContainer(DatePickerContainer, CustomDatePicker);

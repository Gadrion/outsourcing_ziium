import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import {
  DateHeaderWrapper,
  PrevMonth,
  NextMonth,
  MonthSelect,
  YearSelect,
  TodayButton,
} from './DateHeaderStyled';

const years = [];
const currentYear = (new Date()).getUTCFullYear();
for (let y = 1990; y <= currentYear; y += 1) {
  years.push(y);
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DateHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  onClick,
}) => (
  <DateHeaderWrapper>
    <PrevMonth
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
    >
      {'<'}
    </PrevMonth>
    <YearSelect
      value={new Date(date).getUTCFullYear()}
      onChange={({ target: { value } }) => changeYear(value)}
    >
      {years.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </YearSelect>
    <MonthSelect
      value={months[new Date(date).getMonth()]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
    >
      {months.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </MonthSelect>
    <TodayButton
      onClick={onClick}
    >
      {'Today'}
    </TodayButton>
    <NextMonth
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
    >
      {'>'}
    </NextMonth>
  </DateHeaderWrapper>
);


DateHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  changeYear: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DateHeader;

import React from 'react';
import { CalendarContainer as OriginalCalender } from 'react-datepicker';
import PropTypes from 'prop-types';
import CustomTimePicker from './CustomTimePicker';
import { Container } from './CalendarContainerStyled';
import DateTimeSubmitter from './DateTimeSubmitter';

const EndCalendarContainer = ({ className, children }) => (
  <Container id="end-date-picker-popper">
    <OriginalCalender className={className}>
      {children}
    </OriginalCalender>
    <CustomTimePicker />
    <DateTimeSubmitter flag="end" />
  </Container>
);

EndCalendarContainer.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default EndCalendarContainer;

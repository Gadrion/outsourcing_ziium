import React from 'react';
import { CalendarContainer as OriginalCalender } from 'react-datepicker';
import PropTypes from 'prop-types';
import CustomTimePicker from './CustomTimePicker';
import { Container } from './CalendarContainerStyled';
import DateTimeSubmitter from './DateTimeSubmitter';

const StartCalendarContainer = ({ className, children }) => (
  <Container id="start-date-picker-popper">
    <OriginalCalender className={className}>
      {children}
    </OriginalCalender>
    <CustomTimePicker />
    <DateTimeSubmitter flag="start" />
  </Container>
);

StartCalendarContainer.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default StartCalendarContainer;

import React from 'react';
import PropTypes from 'prop-types';
import CustomDatePicker from './CustomDatePicker';
import { Container, Wrapper } from './DatePickerWrapperStyled';

class DatePickerWrapper extends React.PureComponent {
  render() {
    const {
      title,
    } = this.props;
    return (
      <Container>
        <Wrapper>
          <CustomDatePicker
            title={title.start}
            label="start"
          />
        </Wrapper>
        <Wrapper>
          <CustomDatePicker
            title={title.end}
            label="end"
          />
        </Wrapper>
      </Container>
    );
  }
}

DatePickerWrapper.propTypes = {
  title: PropTypes.oneOfType([PropTypes.any]),
};

DatePickerWrapper.defaultProps = {
  title: null,
};

export default DatePickerWrapper;

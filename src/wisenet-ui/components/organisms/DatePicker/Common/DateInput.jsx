import React from 'react';
import PropTypes from 'prop-types';
import { Span } from 'wisenet-ui/components/atoms';
import { DateWrapper, DateInputWrapper } from './DateInputStyled';

class DateInput extends React.PureComponent {
  render() {
    const { onClick, value, data } = this.props;
    const dataArr = value.split(' ');
    dataArr[1] = dataArr[1].replace(/:/gi, ' : ');
    return (
      <DateWrapper>
        {typeof data !== 'undefined' && <Span>{data}</Span>}
        <DateInputWrapper
          onClick={onClick}
        >
          <Span>
            {dataArr[0]}
          </Span>
          <Span>
            {dataArr[1]}
          </Span>
        </DateInputWrapper>
      </DateWrapper>
    );
  }
}

DateInput.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  data: PropTypes.string,
};

DateInput.defaultProps = {
  onClick: () => {},
  value: '',
  data: '',
};

export default DateInput;

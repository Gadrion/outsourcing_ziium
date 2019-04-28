import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'wisenet-ui/components/atoms';
import {
  SearchOptionMiddleStyled,
  IconButtonStyled,
} from './SearchTimelineOptionMiddleStyled';

class SearchTimelineOptionMiddle extends Component {
  componentDidMount() {}

  render() {
    const {
      IconStyled,
      onClick,
      searchDateObj: { year, month, day },
      currentTime,
    } = this.props;

    const convertMonth = month < 10 ? `0${month}` : month;

    const yyyymmdd = `${year}-${convertMonth}-${day}`;

    const hhmmss = currentTime
      ? new Date(currentTime).toTimeString().split(' ')[0]
      : '00:00:00';

    return (
      <SearchOptionMiddleStyled>
        <IconButtonStyled onClick={onClick('left')}>
          <IconStyled className="wni wni-arrow-left" />
        </IconButtonStyled>
        <Label>{yyyymmdd}</Label>
        <IconButtonStyled onClick={onClick('right')}>
          <IconStyled className="wni wni-arrow-right" />
        </IconButtonStyled>
        <Label>{hhmmss}</Label>
      </SearchOptionMiddleStyled>
    );
  }
}

SearchTimelineOptionMiddle.propTypes = {
  IconStyled: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  searchDateObj: PropTypes.instanceOf(Object).isRequired,
  currentTime: PropTypes.string.isRequired,
};

export default SearchTimelineOptionMiddle;

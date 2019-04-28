import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'wisenet-ui/components/atoms';
import {
  SearchOptionRightStyled,
  ButtonStyled,
} from './SearchTimelineOptionRightStyled';

class SearchTimelineOptionRight extends PureComponent {
  render() {
    const {
      zoomDT,
      onClick,
    } = this.props;

    return (
      <SearchOptionRightStyled>
        <Label>{zoomDT}</Label>
        <ButtonStyled
          disableRipple
          onClick={onClick('plus')}
        >
          <i className="wni wni-add" />
        </ButtonStyled>
        <ButtonStyled
          disableRipple
          onClick={onClick('minus')}
        >
          {/* 임시 */}
          <i className="wni wni-add" />
        </ButtonStyled>
      </SearchOptionRightStyled>
    );
  }
}

SearchTimelineOptionRight.propTypes = {
  zoomDT: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchTimelineOptionRight;

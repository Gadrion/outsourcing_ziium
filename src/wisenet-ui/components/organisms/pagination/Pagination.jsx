import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withContainer } from 'wisenet-ui/util/hoc';
import { PaginationContainer } from 'wisenet-ui/containers/organisms';
import {
  PageNumberStyle,
} from './PaginationStyled';

const Pagination = ({
  pageList,
  handlePageClick,
  currentPageNumber,
  currentPages,
  currentColumn,
  maxPages,
  increasePage,
  decreasePage,
  nextPageColumn,
  prevPageColumn,
}) => {
  const PageNumbers = currentPages.map(number => (
    <PageNumberStyle
      key={number}
      id={number}
      onClick={handlePageClick}
      selected={currentPageNumber === number}
    >
      {number}
    </PageNumberStyle>
  ));
  return (
    <div style={{ display: 'flex' }}>
      <button type="button" disabled={currentColumn === 1} onClick={prevPageColumn}>prevColumn</button>
      <button type="button" disabled={currentColumn === 1 && currentPageNumber === 1} onClick={decreasePage}>prev</button>
      <ul>
        {PageNumbers}
      </ul>
      <button type="button" disabled={currentColumn * maxPages > pageList.length && currentPageNumber === pageList.length} onClick={increasePage}>next</button>
      <button type="button" disabled={currentColumn * maxPages > pageList.length} onClick={nextPageColumn}>nextColumn</button>
    </div>
  );
};

Pagination.propTypes = {
  pageList: PropTypes.oneOfType([PropTypes.any]).isRequired,
  currentPages: PropTypes.oneOfType([PropTypes.any]).isRequired,
  handlePageClick: PropTypes.func.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  currentColumn: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  increasePage: PropTypes.func.isRequired,
  decreasePage: PropTypes.func.isRequired,
  nextPageColumn: PropTypes.func.isRequired,
  prevPageColumn: PropTypes.func.isRequired,
};

export default withContainer(PaginationContainer, Pagination);

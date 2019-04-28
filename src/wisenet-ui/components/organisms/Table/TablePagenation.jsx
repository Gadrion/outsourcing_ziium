import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TablePagenationContainer } from 'wisenet-ui/containers/organisms';
import {
  PagenationWrapper,
  PageChangeIconStyled,
  CurrentPageStyled,
} from './TablePagenationStyled';

const TablePagenation = ({
  page,
  pages: totalPage,
  changePage,
}) => {
  const currentPage = page + 1;
  return (
    <PagenationWrapper>
      <PageChangeIconStyled
        className="wni wni-arrow-left"
        onClick={() => {
          if (currentPage === 1) {
            return null;
          }
          return changePage(currentPage - 1);
        }}
      />
      <span>
        {'Page '}
        <CurrentPageStyled>
          {currentPage}
        </CurrentPageStyled>
        {' of '}
        {totalPage}
      </span>
      <PageChangeIconStyled
        className="wni wni-arrow-right"
        onClick={() => {
          if (currentPage === totalPage) {
            return null;
          }
          return changePage(currentPage + 1);
        }}
      />
    </PagenationWrapper>
  );
};

TablePagenation.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default withContainer(TablePagenationContainer, TablePagenation);

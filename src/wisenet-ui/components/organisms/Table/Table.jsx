import React from 'react';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TableContainer } from 'wisenet-ui/containers/organisms';
import { Checkbox } from 'wisenet-ui/components/atoms';
import TablePagenation from './TablePagenation';
import {
  ReactTableStyled,
  SortIconStyled,
} from './TableStyled';

const makeHeader = (data, depth, isMultiHeader, needChangeBackground) => (
  data.map((item, index) => {
    let component = item.Header;
    let isChangeBackground = needChangeBackground;
    if (depth === 0 && isMultiHeader && index % 2 !== 0) {
      isChangeBackground = true;
    }
    if (item.sortable) {
      component = (
        <div className={item.className}>
          {item.Header}
          <SortIconStyled id="sort-icon" />
        </div>
      );
    }
    if (item.columns) {
      return {
        ...item,
        columns: makeHeader(item.columns, depth + 1, isMultiHeader, isChangeBackground),
        headerClassName: isChangeBackground ? 'multi-header-even' : '',
        resizable: false,
        Header: component,
      };
    }
    return {
      ...item,
      headerClassName: isChangeBackground ? 'multi-header-even' : '',
      resizable: false,
      Header: component,
    };
  })
);

const Table = ({
  className,
  header,
  isMultiHeader,
  data,
  selectCheck,
  onSelect,
  onSelectAll,
  showPagination,
  pageSize,
  rowHeight,
  scroll,
  selectRow,
}) => {
  const customHeader = selectCheck ? [
    {
      Header: () => {
        const isSelectAll = data.length === data.filter(item => item.isSelected === true).length;
        return (
          <Checkbox
            checked={isSelectAll}
            onClick={() => onSelectAll(isSelectAll)}
          />
        );
      },
      Cell: ({ original }) => (
        <Checkbox
          checked={original.isSelected}
          onClick={() => onSelect(original)}
        />
      ),
      sortable: false,
      resizable: false,
      width: 50,
    },
    ...header,
  ] : header;
  const columns = makeHeader(customHeader, 0, isMultiHeader);
  let newPageSize = pageSize || data.length;
  if (pageSize < data.length && !showPagination) {
    newPageSize = data.length;
  }
  return (
    <ReactTableStyled
      className={className}
      columns={columns}
      changeBackground={columns.length % 2 === 0 && isMultiHeader}
      data={data}
      showPagination={showPagination}
      pageSize={newPageSize}
      PaginationComponent={TablePagenation}
      rowHeight={rowHeight - 1}
      scroll={scroll}
      selectRow={selectRow}
      getTrProps={(state, rowInfo) => {
        if (selectRow) {
          return {
            onClick: () => {
              onSelect(rowInfo.original);
            },
            style: {
              backgroundColor: (rowInfo && data[rowInfo.index].isSelected) && '#f2f2f2',
              color: (rowInfo && data[rowInfo.index].isSelected) && '#f37321',
            },
          };
        }
        return {};
      }}
    />
  );
};

Table.defaultProps = {
  className: null,
  header: [],
  isMultiHeader: false,
  data: [],
  onSelect: () => {},
  onSelectAll: () => {},
  original: {},
  showPagination: false,
  pageSize: 0,
  rowHeight: 40,
  scroll: false,
};

Table.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  header: PropTypes.instanceOf(Array),
  isMultiHeader: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    isSelected: PropTypes.bool,
  })),
  selectCheck: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  original: PropTypes.shape({
    index: PropTypes.number,
    isSelected: PropTypes.bool,
  }),
  showPagination: PropTypes.bool,
  pageSize: PropTypes.number,
  rowHeight: PropTypes.number,
  scroll: PropTypes.bool,
  selectRow: PropTypes.bool.isRequired,
};


export default withContainer(TableContainer, Table);

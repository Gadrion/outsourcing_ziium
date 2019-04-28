import styled, { css } from 'styled-components';
import ReactTable from 'react-table';

export const ReactTableStyled = styled(ReactTable)`
  text-align: center;
  border: none !important;
  ${props => props.scroll && css`
      height: inherit;
      .rt-thead.-header, .rt-thead.-headerGroups {
        overflow-y: scroll;
        &::-webkit-scrollbar { 
          display: block; 
        }
      }
  `}
  .rt-thead.-header {
    box-shadow: none !important;
    border-top: 1px solid #a5a5a5;
    background: #e9e9e9 !important;
    ${props => props.changeBackground && css`
      background: #f2f2f2 !important;
    `}
  }
  .rt-thead.-headerGroups {
    border-top: 1px solid #a5a5a5;
    border-bottom: none !important;
    background: #e9e9e9 !important;
    ${props => props.changeBackground && css`
      background: #f2f2f2 !important;
    `}
  }
  .rt-tbody {
    border-top: 1px solid #d2d2d2;
    border-bottom: 1px solid #a5a5a5;
  }
  .rt-tr-group {
    ${props => props.selectRow && css`
      cursor: pointer;
      &:hover {
        background-color: #f2f2f2;
        color: #f37321;
      }
    `}
  }
  ${props => css`
    .rt-th, .rt-td {
      height: ${props.rowHeight}px;
      line-height: ${props.rowHeight}px !important;
      padding: 0 !important;
    }
  `}
  .rt-th {
    border-right: none !important;
    font-size: 12px;
    background-color: #e9e9e9;
    &.multi-header-even {
      background-color: #f2f2f2;
    }
  }
  .rt-td {
    border-right: none !important;
    font-size: 14px;
  }
  .-sort-desc {
    box-shadow: none !important;
    #sort-icon {
      &:after {
        position: relative;
        left: 2px;
        bottom: 1px;
        content: "▼";
        font-size: 10px;
        color: #4c4c4c;
      }
    }
  }
  .-sort-asc {
    box-shadow: none !important;
    #sort-icon {
      &:after {
        position: relative;
        left: 2px;
        content: "▲";
        font-size: 10px;
        color: #4c4c4c;
        top: -4px;
      }
    }
  }
`;

export const SortIconStyled = styled.div`
  display: inline-block;
  width: 1px;
  height: 1px;
`;

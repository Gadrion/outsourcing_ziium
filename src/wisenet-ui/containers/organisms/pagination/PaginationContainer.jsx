import React from 'react';
import PropTypes from 'prop-types';

class PaginationContainer extends React.Component {
  state = {
    dataLength: 0,
    dataPerPage: 0,
    pageList: [],
    currentPages: [],
    currentColumn: 0,
    maxPages: 4,
    currentPageNumber: 0,
    indexOfFirstPage: 0,
    indexOfLastPage: 0,
  }

  componentDidMount() {
    const { dataList, pageOption } = this.props;
    this.makePages(dataList, pageOption.dataPerPage, pageOption.maxPages);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      currentPageNumber: prevCurrentPage,
    } = this.state;
    const {
      currentPageNumber: nextCurrentPage,
    } = nextState;

    if (prevCurrentPage !== nextCurrentPage) {
      return true;
    }

    return false;
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  makePages = (dataList, dataPerPage, maxPages) => {
    const pageNumbers = [];
    const currentPages = [];
    for (let i = 1; i <= Math.ceil(dataList.length / dataPerPage); i += 1) {
      pageNumbers.push(i);
    }

    for (let i = 0; i < maxPages; i += 1) {
      currentPages.push(pageNumbers[i]);
    }

    this.onUpdate({
      dataLength: dataList.length,
      dataPerPage,
      pageList: pageNumbers,
      currentPages,
      currentColumn: 1,
      totalPage: pageNumbers.length,
      currentPageNumber: 1,
    });
  }

  pageChange = pageIndex => {
    const { clickEvent } = this.props;
    const { dataPerPage } = this.state;

    const currentPageNumber = pageIndex;
    const indexOfLastData = currentPageNumber * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    clickEvent({
      currentPageNumber,
      indexOfFirstData,
      indexOfLastData,
    });
  }

  handlePageClick = e => {
    const currentPageNumber = Number(e.target.id);
    this.pageChange(currentPageNumber);
    this.onUpdate({
      currentPageNumber,
    });
  }

  increasePage = () => {
    const { currentPageNumber, currentColumn, maxPages } = this.state;
    const nextPageNumber = currentPageNumber + 1;
    if (nextPageNumber > currentColumn * maxPages) {
      this.nextPageColumn();
    } else {
      this.pageChange(nextPageNumber);
      this.onUpdate({
        currentPageNumber: nextPageNumber,
      });
    }
  }

  decreasePage = () => {
    const { currentPageNumber, currentColumn, maxPages } = this.state;
    const prevPageNumber = currentPageNumber - 1;
    const prevColumn = currentColumn - 1;
    if (prevPageNumber === prevColumn * maxPages) {
      this.prevPageColumn(prevPageNumber);
    } else {
      this.pageChange(prevPageNumber);
      this.onUpdate({
        currentPageNumber: prevPageNumber,
      });
    }
  }

  nextPageColumn = () => {
    const { pageList, currentColumn, maxPages } = this.state;
    const currentColumnNumber = currentColumn + 1;
    const indexOfLastPage = currentColumnNumber * maxPages;
    const indexOfFirstPage = indexOfLastPage - maxPages;

    const currentPages = pageList.slice(indexOfFirstPage, indexOfLastPage);
    this.pageChange(pageList[indexOfFirstPage]);

    this.onUpdate({
      currentPages,
      currentColumn: currentColumnNumber,
      currentPageNumber: pageList[indexOfFirstPage],
    });
  }

  prevPageColumn = () => {
    const { pageList, currentColumn, maxPages } = this.state;
    const currentColumnNumber = currentColumn - 1;
    const indexOfLastPage = currentColumnNumber * maxPages;
    const indexOfFirstPage = indexOfLastPage - maxPages;

    const currentPages = pageList.slice(indexOfFirstPage, indexOfLastPage);
    this.pageChange(pageList[indexOfLastPage - 1]);

    this.onUpdate({
      currentPages,
      currentColumn: currentColumnNumber,
      currentPageNumber: pageList[indexOfLastPage - 1],
    });
  }

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

PaginationContainer.propTypes = {
  render: PropTypes.func.isRequired,
  dataList: PropTypes.oneOfType([PropTypes.any]).isRequired, // pagination을 적용 할 dataList
  pageOption: PropTypes.shape({
    dataPerPage: PropTypes.number,
    maxPages: PropTypes.number,
  }).isRequired, // pagination을 적용 할 dataList
  clickEvent: PropTypes.func.isRequired,
};

export default PaginationContainer;

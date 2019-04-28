import React from 'react';
import PropTypes from 'prop-types';

class TablePagenationContainer extends React.Component {
  componentDidMount() {
  }

  changePage = changedPage => {
    const {
      page,
      onPageChange,
    } = this.props;

    const currentPage = page + 1;
    if (currentPage === changedPage) {
      return null;
    }
    console.log('!!! changed', this.props);
    return onPageChange(changedPage - 1);
  }

  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

// TablePagenationContainer.defaultProps = {
// };

TablePagenationContainer.propTypes = {
  render: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default TablePagenationContainer;

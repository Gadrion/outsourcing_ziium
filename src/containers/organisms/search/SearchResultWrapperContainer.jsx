import React from 'react';
import PropTypes from 'prop-types';

class SearchResultWrapperContainer extends React.Component {
  render() {
    const { render } = this.props;
    return render({
      ...this,
      ...this.state,
      ...this.props,
    });
  }
}

SearchResultWrapperContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default SearchResultWrapperContainer;

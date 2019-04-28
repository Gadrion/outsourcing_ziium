import React from 'react';
import PropTypes from 'prop-types';

class SearchOptionsContainer extends React.Component {
  render() {
    const { render } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

SearchOptionsContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default SearchOptionsContainer;

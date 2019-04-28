import React from 'react';
import PropTypes from 'prop-types';

class DropDownMenuContainer extends React.Component {
  state = {
    isOpend: false,
  }

  constructor(props) {
    super(props);
    this.menu = {};
  }

  setRef = el => {
    this.menu = el;
  }

  onMenuOpen = e => {
    e.preventDefault();
    this.setState({
      isOpend: true,
    }, () => {
      document.addEventListener('click', this.onMenuClose);
    });
  }

  onMenuClose = e => {
    if (!this.menu.contains(e.target)) {
      this.setState({
        isOpend: false,
      }, () => {
        document.removeEventListener('click', this.onMenuClose);
      });
    }
  }

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

DropDownMenuContainer.defaultProps = {
};

DropDownMenuContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default DropDownMenuContainer;

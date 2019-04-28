import React from 'react';
import PropTypes from 'prop-types';

class DateTimePageContainer extends React.Component {
  selectItemChanged = () => {
    console.log('selected item changed ~~');
    this.setState({
      data: 0,
    });
  }

  render() {
    const { render } = this.props;
    return render({
      // handleSelectItemChanged: this.selectItemChanged,
      // data: data,
      ...this,

      // selectItemChanged, render, state, props
      ...this.state,
      // data
      ...this.props,
      // reduxData
    });
  }
}

DateTimePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  // data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DateTimePageContainer;

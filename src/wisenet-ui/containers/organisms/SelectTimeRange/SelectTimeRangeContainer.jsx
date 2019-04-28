import React from 'react';
import PropTypes from 'prop-types';

class SelectTimeRangeContainer extends React.Component {
  state = {
    value: [45, 55],
  }

  handleSliderChange = value => {
    this.setState({
      value,
    });
  }

  handleExportRange = () => {
    const { handleExport } = this.props;
    const { value } = this.state;

    handleExport(value);
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

SelectTimeRangeContainer.propTypes = {
  render: PropTypes.func.isRequired,
  handleExport: PropTypes.func,
};

SelectTimeRangeContainer.defaultProps = {
  handleExport: () => {},
};

export default SelectTimeRangeContainer;

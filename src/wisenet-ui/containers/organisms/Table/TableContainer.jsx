import React from 'react';
import PropTypes from 'prop-types';

class TableContainer extends React.Component {
  componentDidMount() {}

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  onSelectAll = isSelectAll => {
    const { onChangeData, data } = this.props;
    let newData = null;
    if (isSelectAll) {
      newData = data.map(item => ({ ...item, isSelected: false }));
    } else {
      newData = data.map(item => ({ ...item, isSelected: true }));
    }
    onChangeData(newData);
  }

  onSelect = selectedCell => {
    const {
      data,
      onChangeData,
      selectRow,
      selectCheck,
    } = this.props;
    let newData = null;
    if (selectCheck) {
      newData = data.slice();
      const changedCell = {
        ...selectedCell,
        isSelected: !selectedCell.isSelected,
      };
      newData[selectedCell.index] = changedCell;
    } else if (selectRow) {
      newData = data.map(item => {
        if (item.index === selectedCell.index) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return {
          ...item,
          isSelected: false,
        };
      });
    }
    onChangeData(newData, newData[selectedCell.index]);
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

TableContainer.defaultProps = {
  data: [],
  onChangeData: () => {},
  selectRow: false,
  selectCheck: false,
};

TableContainer.propTypes = {
  render: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array),
  onChangeData: PropTypes.func,
  selectRow: PropTypes.bool,
  selectCheck: PropTypes.bool,
};

export default TableContainer;

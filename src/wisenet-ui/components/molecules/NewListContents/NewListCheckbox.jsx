import React from 'react';
import PropTypes from 'prop-types';
// import {
//   ListTitleStyled,
//   ListTextStyled,
//   ListIconSpanStyled,
// } from '../ListStyled';

class NewListCheckbox extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      itemChecked: nextItemChecked,
    } = nextProps;

    const {
      itemChecked,
    } = this.props;

    if (JSON.stringify(nextItemChecked) === JSON.stringify(itemChecked)) {
      return false;
    }

    return true;
  }

  render() {
    const {
      // listItemId,
      onClickNode,
      itemChecked,
    } = this.props;

    return (
      <input
        type="checkbox"
        name="listCheckbox"
        onClick={onClickNode}
        checked={itemChecked}
      />
    );
  }
}

NewListCheckbox.defaultProps = {
};

NewListCheckbox.propTypes = {
  onClickNode: PropTypes.func.isRequired,
  // listItemId: PropTypes.string.isRequired,
  itemChecked: PropTypes.bool.isRequired,
};

export default NewListCheckbox;

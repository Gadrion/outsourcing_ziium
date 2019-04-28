import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { List as ListImmutable } from 'immutable';
import { NewList } from 'wisenet-ui/components/organisms';
import { LayoutListContainer } from 'containers/organisms';

class LayoutList extends PureComponent {
  render() {
    const {
      layoutList,
      onClickListItem,
      onDBClickListItem,
      updateInputValue,
      addingNewLayoutList,
    } = this.props;
    return (
      <NewList
        listData={layoutList} // 필수
        useExportOneClickListItem
        exportClickListItem={onClickListItem}
        exportDBClickedListItems={onDBClickListItem}
        onChangeInputValue={updateInputValue}
        changeSelectionToNewItem={addingNewLayoutList}
        showIcon
        // dragAndDrop
        // onToggle={}
      />
    );
  }
}

LayoutList.propTypes = {
  layoutList: PropTypes.instanceOf(ListImmutable).isRequired,
  onClickListItem: PropTypes.func.isRequired,
  onDBClickListItem: PropTypes.func.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  addingNewLayoutList: PropTypes.bool.isRequired,
};

export default withContainer(LayoutListContainer, LayoutList);

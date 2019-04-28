import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { List as ListImmutable } from 'immutable';
import { NewList } from 'wisenet-ui/components/organisms';
import { LiveCameraListContainer } from 'containers/organisms';

class LiveCameraList extends PureComponent {
  render() {
    const {
      data,
      onDBClickListItem,
      onDragListItem,
    } = this.props;
    return (
      <NewList
        listData={data} // 필수
        exportDBClickedListItems={onDBClickListItem}
        exportDragListItems={onDragListItem}
        multiSelect
        showCamChannelIndexIcon
        showIcon
        showHoverData
        dragAndDrop
      // showIndex
      // showCheckbox
      // setApply={setApply}
      // exportListData={willExportList}
      // exportListDataFunc={}
      // showDateSeration
      // pagenation={10}
      // onClickNextPage={}
      // onClickPrevPage={}
      // onClickViewMore={}
      // onClickViewAll={}
      // canDrag={false}
      // onToggle={}
      />
    );
  }
}

LiveCameraList.propTypes = {
  data: PropTypes.instanceOf(ListImmutable).isRequired,
  onDBClickListItem: PropTypes.func.isRequired,
  onDragListItem: PropTypes.func.isRequired,
};

export default withContainer(LiveCameraListContainer, LiveCameraList);

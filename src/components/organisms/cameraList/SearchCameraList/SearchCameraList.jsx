import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { NewList } from 'wisenet-ui/components/organisms';
import { List as ListImmutable } from 'immutable';
import { SearchCameraListContainer } from 'containers/organisms';

class SearchCameraList extends PureComponent {
  render() {
    const {
      data,
      onClickListItem,
    } = this.props;
    return (
      <NewList
        listData={data} // 필수
        showCamChannelIndexIcon
        showIcon
        useExportOneClickListItem
        exportClickListItem={onClickListItem}
      />
    );
  }
}

SearchCameraList.propTypes = {
  data: PropTypes.instanceOf(ListImmutable).isRequired,
  onClickListItem: PropTypes.func.isRequired,
};

export default withContainer(SearchCameraListContainer, SearchCameraList);

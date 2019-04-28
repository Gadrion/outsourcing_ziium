import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventSearchActions, SearchTimelineActions } from 'store/actionCreators';

class SearchOptionsContainer extends React.Component {
  state = {
    willExportTree: false,
  }

  eventFilters = [];
  // treeClick = e => {
  //   console.log('select Tree ', e);
  // }

  setApply = willExportTree => {
    this.setState({
      willExportTree,
    });
  }

  applyEventFilter = treeDatas => {
    const { searchDateObj } = this.props;
    this.eventFilters = [];
    // const eventFilterData =
    treeDatas.map(tItem => {
      const treeItem = tItem;
      if (treeItem.checked === 1 || treeItem.checked === 2) {
        if (treeItem.children) {
          this.eventFilters.push(treeItem.id);
          return {
            id: treeItem.id,
            children: this.returnCheckedTreeItem(treeItem.children),
          };
        }
        this.eventFilters.push(treeItem.id);
        return treeItem.id;
      }
      return null;
    });
    const eventfilterdata = this.eventFilters;
    EventSearchActions.setEventFilterData({ eventfilterdata });
    SearchTimelineActions.applyEventListFilter({
      startDate: new Date(searchDateObj.year, searchDateObj.month - 1, searchDateObj.day),
      type: 'eventTab',
    });
  }

  returnCheckedTreeItem = treeData => {
    const items = treeData.map(tItem => {
      const treeItem = tItem;
      if (treeItem.checked === 1 || treeItem.checked === 2) {
        if (treeItem.children) {
          this.eventFilters.push(treeItem.id);
          return {
            id: treeItem.id,
            children: this.returnCheckedTreeItem(treeItem.children),
          };
        }
        this.eventFilters.push(treeItem.id);
        return treeItem.id;
      }
      return null;
    });
    return items;
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

SearchOptionsContainer.propTypes = {
  render: PropTypes.func.isRequired,
  searchDateObj: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
  }).isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    searchDateObj: state.eventSearchModule.get('searchDateObj'),
  }),
)(SearchOptionsContainer);

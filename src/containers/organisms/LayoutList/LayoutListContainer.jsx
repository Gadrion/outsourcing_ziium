import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, fromJS } from 'immutable';

class LayoutListContainer extends React.Component {
  stae = {
    layoutList: List([]),
  }

  componentDidMount() {
    const {
      layoutList: layoutListTemp,
    } = this.props;
    const layoutList = layoutListTemp.toJS();

    const layoutListData = layoutList.map(item => {
      const remakedItem = {};

      remakedItem.id = item.id;
      remakedItem.text = item.text;
      remakedItem.iconLeft = item.icon;
      remakedItem.focused = item.focused;
      if (item.data) {
        remakedItem.data = item.data;
      }

      return remakedItem;
    });
    this.onUpdate(
      fromJS(layoutListData),
    );
  }

  componentDidUpdate(prevProps) {
    const {
      layoutList: curPropsListDataTemp,
    } = this.props;
    const {
      layoutList: prevPropsListDataTemp,
    } = prevProps;
    const prevPropsListData = prevPropsListDataTemp.toJS();
    const curPropsListData = curPropsListDataTemp.toJS();

    if (JSON.stringify(prevPropsListData) !== JSON.stringify(curPropsListData)) {
      const layoutListData = curPropsListData.map(item => {
        const remakedItem = {};

        remakedItem.id = item.id;
        remakedItem.text = item.text;
        remakedItem.iconLeft = item.icon;
        remakedItem.focused = item.focused;
        if (item.data) {
          remakedItem.data = item.data;
        }

        return remakedItem;
      });
      this.onUpdate(
        fromJS(layoutListData),
      );
    }
  }

  onUpdate = layoutList => (
    this.setState({
      layoutList,
    })
  )

  onClickListItem = selectedListItem => {
    const {
      updateSelectedLayoutListItem,
    } = this.props;
    updateSelectedLayoutListItem(selectedListItem);
  }

  onDBClickListItem = onTileCameraItems => {
    if (onTileCameraItems[0] === 0) {
      // console.log('default layout');
    }
    // CameraInfoActions.setCameraSelectList(onTileCameraItems);
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

LayoutListContainer.defaultProps = {
};

LayoutListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  layoutList: PropTypes.instanceOf(List).isRequired,
  updateSelectedLayoutListItem: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(LayoutListContainer);

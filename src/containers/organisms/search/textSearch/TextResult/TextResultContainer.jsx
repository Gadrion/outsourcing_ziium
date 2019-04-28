import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { SearchTimelineActions } from 'store/actionCreators';

class TextResultContainer extends React.Component {
  // componentDidUpdate() {
  //   const resultArea = document.getElementById('textResult');
  //   const parentArea = resultArea.parentNode;
  //   const childnode = resultArea.childNodes;
  //   const offsetVal = childnode[3].offsetTop; // 임시 하드코딩
  //   parentArea.scrollTo(0, offsetVal);
  //   return true;
  // }
  shouldComponentUpdate(nextProps) {
    const { selectEvent: nextSelectEvent } = nextProps;
    const { selectEvent: prevSelectEvent } = this.props;
    if (prevSelectEvent === nextSelectEvent) {
      return false;
    }
    return true;
  }

  onChannelButtonClick = event => {
    const { selectEvent } = this.props;
    const channel = Number(event.currentTarget.children[1].childNodes[0].data) - 1;

    SearchTimelineActions.setCurrentChannel(channel);
    SearchTimelineActions.getTimeline({
      startDate: new Date(selectEvent.toJS().PlayTime),
      type: 'textTab',
    });
    console.log(selectEvent.toJS());
    SearchTimelineActions.setSelectEvent({
      ...selectEvent.toJS(),
      endDate: selectEvent.toJS(),
      isReopen: true,
    });
  }

  render() {
    const { render, selectEvent: propsSelectEvent, posConfigList } = this.props;
    const selectEvent = propsSelectEvent.toJS();
    if (posConfigList) {
      this.deviceInfo = posConfigList.find(x => x.DeviceID === selectEvent.DeviceID);
    }

    return render({
      ...this,
      ...this.state,
      ...this.props,
      selectEvent,
    });
  }
}

TextResultContainer.propTypes = {
  render: PropTypes.func.isRequired,
  selectEvent: PropTypes.instanceOf(Map).isRequired,
  posConfigList: PropTypes.arrayOf(PropTypes.any),
};

TextResultContainer.defaultProps = {
  posConfigList: [],
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
    selectEvent: state.searchTimelineModule.get('selectEvent'),
    posConfigList: state.textSearchModule.get('posConfigList'),
  }),
)(TextResultContainer);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

class EventListContainer extends React.Component {
  state = {
    eventListData: [
      {
        Type: 'Text event',
        DeviceName: 'Pos 01',
        StartTime: '09:34:23',
        Data: 'asdfasfdasfdasfadfsasdf',
      },
      {
        Type: 'Text event',
        DeviceName: 'Pos 02',
        StartTime: '12:34:23',
        Data: 'QWERQWERWQRWQRE',
      },
    ],
  }

  shouldComponentUpdate(nextProps) {
    const { eventList: nextEventList } = nextProps;
    const { eventList } = this.props;

    if (JSON.stringify(nextEventList) === JSON.stringify(eventList)) {
      return false;
    }
    return true;
  }

  onUpdate = eventListData => (
    this.setState({
      eventListData,
    })
  )

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

EventListContainer.defaultProps = {
  eventList: List([]),
};

EventListContainer.propTypes = {
  render: PropTypes.func.isRequired,
  eventList: PropTypes.instanceOf(List),
};

export default connect(
  state => ({
    lang: state.langModule.get('lang'),
  }),
)(EventListContainer);

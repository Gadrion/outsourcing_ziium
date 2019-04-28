import React from 'react';
import PropTypes from 'prop-types';
import { SearchTimelineActions } from 'store/actionCreators';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

class TileInstantPlaybackControlContainer extends React.Component {
  state = {
    sliderMax: 0,
    sliderCurrentValue: 0,
    viewStartTime: '',
    viewEndTime: '',
    startTime: new Date(new Date().setSeconds(new Date().getSeconds() - 30)).toISOString(),
    endTime: new Date().toISOString(),
    isPlay: true,
    currentTime: new Date(new Date().setSeconds(new Date().getSeconds() - 30)).toISOString(),
  }

  count = 0;

  componentDidMount() {
    // after componentDidUpdate
    // start, end props로 받을 예정
    const { startTime, endTime } = this.state;
    const sliderMax = (new Date(endTime) - new Date(startTime)) / 1000;

    this.onUpdate({
      viewStartTime: new Date(startTime).toLocaleTimeString('en-GB', {
        minute: 'numeric',
        second: 'numeric',
      }),
      viewEndTime: new Date(endTime).toLocaleTimeString('en-GB', {
        minute: 'numeric',
        second: 'numeric',
      }),
      sliderMax,
      // sliderCurrentValue: sliderMax,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTime: prevCurrentTime } = prevState;
    const { currentTime, startTime, isPlay } = this.state;

    if (currentTime !== prevCurrentTime) {
      const sliderCurrentValue = (new Date(currentTime) - new Date(startTime)) / 1000;
      this.onUpdate({
        sliderCurrentValue,
        viewStartTime: new Date(currentTime).toLocaleTimeString('en-GB', {
          minute: 'numeric',
          second: 'numeric',
        }),
      });
    }

    // test
    if (isPlay && this.count < 30) {
      setTimeout(() => this.sameple(), 1000);
      this.count += 1;
    }
  }

  onMouseEvent = type => event => {
    switch (type) {
      case 'static': {
        event.stopPropagation();
        break;
      }
      case 'backMode': {
        const { returnTileMode } = this.props;
        returnTileMode();
        break;
      }
      case 'search': {
        // page move
        const { currentChannel, history } = this.props;
        const { endTime } = this.state;
        SearchTimelineActions.setCurrentChannel(currentChannel);
        SearchTimelineActions.getTimeline({
          startDate: new Date(endTime),
          type: 'eventTab',
        });
        history.push('/search');
        break;
      }
      case 'timePicker': {
        this.onUpdate({
          sliderCurrentValue: event,
        });
        // sick Time clac
        // const { startTime } = this.state;
        // const sickTime = new Date(new Date(startTime)
        // .setSeconds(new Date(startTime).getSeconds() + event)).toISOString();
        break;
      }
      case 'playControl': {
        const { isPlay } = this.state;
        this.onUpdate({
          isPlay: !isPlay,
        });
        break;
      }
      default:
        break;
    }
  }

  sameple = () => {
    const { currentTime } = this.state;

    this.onUpdate({
      currentTime: new Date(
        new Date(currentTime).setSeconds(new Date(currentTime).getSeconds() + 1),
      ).toISOString(),
    });
  }

  onUpdate = data => (
    this.setState({
      ...data,
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

TileInstantPlaybackControlContainer.propTypes = {
  render: PropTypes.func.isRequired,
  returnTileMode: PropTypes.func.isRequired,
  currentChannel: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TileInstantPlaybackControlContainer);

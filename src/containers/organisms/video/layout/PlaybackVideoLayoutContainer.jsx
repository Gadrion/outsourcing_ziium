import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeCameraUID } from 'wisenet-ui/util/function/make';
import { Map } from 'immutable';
// import { SearchMediaControlActions } from 'store/actionCreators';

class PlaybackVideoLayoutContainer extends React.Component {
  state = {
    rows: 1,
    cols: 1,
    type: 'static',
    currnetCamera: undefined,
    tileList: [],
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)
      && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentChannel: prevCurrentChannel } = prevProps;
    const { currentChannel } = this.props;
    const { currnetCamera: prevCurrentCamera } = prevState;
    const { currnetCamera } = this.state;

    if (prevCurrentChannel !== currentChannel) {
      this.onUpdate({
        tileList: [],
        currnetCamera: this.makeCamera(),
      });
    } else if (JSON.stringify(prevCurrentCamera) !== JSON.stringify(currnetCamera)) {
      if (currnetCamera) {
        this.onUpdate({
          tileList: [currnetCamera],
        });
      }
    }
  }

  onUpdate = data => (
    this.setState({
      ...data,
    })
  )

  makeCamera = () => {
    const { currentChannel, selectCamera: propsSelectCamera } = this.props;
    if (currentChannel !== -1 && propsSelectCamera) {
      const selectCamera = propsSelectCamera.toJS();
      selectCamera.uid = makeCameraUID(currentChannel);
      return selectCamera;
    }
    return undefined;
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

PlaybackVideoLayoutContainer.defaultProps = {
  selectCamera: undefined,
};

PlaybackVideoLayoutContainer.propTypes = {
  render: PropTypes.func.isRequired,
  currentChannel: PropTypes.number.isRequired,
  selectCamera: PropTypes.instanceOf(Map),
};

export default connect(state => {
  const currentChannel = state.searchTimelineModule.get('currentChannel');
  return {
    currentChannel,
    selectCamera: state.cameraInfoModule
      .get('cameraList')
      .find(camera => camera.get('channel') === currentChannel),
  };
})(PlaybackVideoLayoutContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';

class VideoSetupPageContainer extends React.Component {
  prevObjects = [];

  objects = [];

  state = {
    renderForce: false,
  }

  updateObject = () => {
    // console.log('update object! - length : ', obj.length);
  }

  onButtonClick = () => {
    const keyValue = (new Date()).getTime();
    this.prevObjects = this.objects;
    this.objects = [
      ...this.objects,
      {
        id: `rect-${this.objects.length}-${keyValue}`,
        key: `rect-${this.objects.length}-${keyValue}`,
        x: 30 * this.objects.length,
        y: 30 * this.objects.length,
        width: 30,
        height: 30,
        tagname: 'rect',
        selected: true,
      },
    ];
    console.log('!!!', this.objects === this.prevObjects);
    const { renderForce } = this.state;
    this.setState({
      renderForce: !renderForce,
    });
  }

  render = () => {
    const { render, cameraList } = this.props;
    const connectedCameraList = cameraList.toJS().filter(camera => camera.status === 'Success');
    // sketchinfo는 페이지에 따라 옵션을 달리해서 넣어줘야 함
    const sketchinfo = {
      workType: 'mdArea',
      width: '1024px',
      height: '1024px',
    };
    console.log('render!(VideoSetupPageContainer)', this.objects.length);
    return render({
      ...this,
      ...this.state,
      ...this.props,
      connectedCameraList,
      sketchinfo,
    });
  }
}

VideoSetupPageContainer.defaultProps = {
  cameraList: [
  ],
};

VideoSetupPageContainer.propTypes = {
  render: PropTypes.func.isRequired,
  cameraList: PropTypes.instanceOf(List),
};

export default connect(
  state => ({
    sessionKey: state.preLoadModule.get('sessionKey'),
    cameraList: state.cameraInfoModule.get('cameraList'),
  }),
)(VideoSetupPageContainer);

import React from 'react';
import { connect } from 'react-redux';
import { func, instanceOf, string } from 'prop-types';

import { StuffActions, MapActions } from 'store/actionCreators';

class SutffModalContainer extends React.Component {
  state = {};

  setRootElem = elem => {
    this.ref = elem;
  }

  _onClick = eventName => () => {
    const { id } = this.props;

    switch (eventName) {
      case 'save': {
        const {
          // eslint-disable-next-line react/prop-types
          position, address, label, placeId, memo, history, option, imageFiles,
        } = this.props;
        // add redux action code
        MapActions.updateMapData({
          position,
          address,
          label,
          placeId,
          memo,
          history,
          option,
          imageFiles,
          status: 'open',
        });
        StuffActions.open(false);
        break;
      }
      case 'delete': {
        if (id) {
          MapActions.deleteMapData(id);
        }
        StuffActions.open(false);
        break;
      }
      case 'close': {
        StuffActions.open(false);
        break;
      }
      case 'gotoTop': {
        if (this.ref) {
          this.ref.scrollTop = 0;
        }
        break;
      }
      case 'gotoEnd': {
        if (this.ref) {
          this.ref.scrollTop = this.ref.scrollHeight;
        }
        break;
      }
      default:
        console.warn(eventName, 'is undefined onClick Event');
        // eslint-disable-next-line no-alert
        alert('미구현'); // temp
        break;
    }
  }

  _onChange = eventName => (...params) => {
    const { imageFiles } = this.props;
    switch (eventName) {
      case 'file': {
        const [{ target }] = params;
        const limit = 10;
        if (imageFiles.length + target.files.length > limit) {
          // eslint-disable-next-line no-alert
          alert(`최대 ${limit}개만 추가 할 수 있습니다.`);
          return;
        }
        for (let i = 0; i < target.files.length; i += 1) {
          const file = target.files[i];
          imageFiles.push({
            url: URL.createObjectURL(file),
            status: 'add',
            file,
          });
        }

        StuffActions.setForm({ imageFiles: [...imageFiles] });
        break;
      }

      default:
        console.warn(eventName, 'is undefined onClick Event');
        // eslint-disable-next-line no-alert
        alert('미구현'); // temp
        break;
    }
  }

  render() {
    const { render } = this.props;
    return render({ ...this, ...this.state, ...this.props });
  }
}

SutffModalContainer.defaultProps = {
  id: '',

  label: '',
  memo: '',
  option: {},
  imageFiles: [],
};

SutffModalContainer.propTypes = {
  render: func.isRequired,

  id: string,

  label: string,
  memo: string,
  option: instanceOf(Object),
  imageFiles: instanceOf(Object),
};

export default connect(({ stuffModule, mapModule }) => ({
  id: mapModule.get('showPlaceId'),
  isOpen: stuffModule.get('isOpen'),
  load: stuffModule.get('load'),

  label: stuffModule.get('name'),
  memo: stuffModule.get('memo'),
  option: stuffModule.get('option'),
  imageFiles: stuffModule.get('imageFiles'),
  position: stuffModule.get('position'),
  address: stuffModule.get('address'),
  placeId: stuffModule.get('placeId'),
  history: stuffModule.get('history'),
}),
() => ({}))(SutffModalContainer);

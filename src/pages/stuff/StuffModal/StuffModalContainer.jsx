import React from 'react';
import { connect } from 'react-redux';
import { func, number, instanceOf } from 'prop-types';

import { StuffActions } from 'store/actionCreators';

class SutffModalContainer extends React.Component {
  state = {
    isOpen: true,
  };

  setRootElem = elem => {
    this.ref = elem;
  }

  _onClick = eventName => () => {
    const { id } = this.props;
    const { isOpen } = this.state;

    switch (eventName) {
      case 'save': {
        // add redux action code
        StuffActions.updateForm();
        break;
      }
      case 'delete': {
        StuffActions.deleteForm(id);
        break;
      }
      case 'close': {
        this.setState({ isOpen: !isOpen });
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
    const { files } = this.props;
    switch (eventName) {
      case 'file': {
        const [{ target }] = params;
        for (let i = 0; i < target.files.length; i += 1) {
          const file = target.files[i];
          files.push(Object.assign(file, {
            preview: URL.createObjectURL(file),
          }));
        }

        const limit = 10;
        if (files.length > limit) {
          // eslint-disable-next-line no-alert
          alert(`최대 ${limit}개만 추가 할 수 있습니다.`);
          return;
        }

        StuffActions.setForm({ files: [...files] });
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
  id: null,
};

SutffModalContainer.propTypes = {
  render: func.isRequired,
  id: number,
  files: instanceOf(Object).isRequired,
};

export default connect(({ stuffModule }) => ({
  id: stuffModule.get('id'),
  files: stuffModule.get('files'),
}),
() => ({}))(SutffModalContainer);

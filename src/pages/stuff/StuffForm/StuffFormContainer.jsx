import React from 'react';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { StuffActions } from 'store/actionCreators';


class SutffFormContainer extends React.Component {
  state = {};

  setRootElem = elem => {
    this.ref = elem;
  }

  _onChange = eventName => (...params) => {
    switch (eventName) {
      case 'name':
      case 'memo': {
        const [{ target: { value } }] = params;
        StuffActions.setCurrentForm({ [eventName]: value });
        break;
      }
      case 'option': {
        const [{ target: { name, checked } }] = params;
        const { option } = this.props;
        if (checked) {
          option[name] = true;
        } else {
          delete option[name];
        }
        StuffActions.setCurrentForm({ option: { ...option } });
        break;
      }
      case 'images': {
        const [files] = params;
        StuffActions.setCurrentForm({ files });
        break;
      }
      default:
        console.warn(eventName, 'is undefined onChange Event');
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

SutffFormContainer.propTypes = {
  render: func.isRequired,
  option: instanceOf(Object).isRequired,
};

export default connect(({ stuffModule }) => ({
  name: stuffModule.get('name'),
  memo: stuffModule.get('memo'),
  option: stuffModule.get('option'),
  files: stuffModule.get('files'),
}),
() => ({}))(SutffFormContainer);

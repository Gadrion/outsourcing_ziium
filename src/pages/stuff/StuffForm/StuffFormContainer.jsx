import React from 'react';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { StuffActions } from 'store/actionCreators';

class SutffFormContainer extends React.Component {
  state = {};

  setRootElem = elem => {
    this.ref = elem;
  }

  _onClick = eventName => () => {
    const { history } = this.props;

    switch (eventName) {
      case 'location': {
        history.push('/work');
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
    switch (eventName) {
      case 'name':
      case 'memo': {
        const [{ target: { value } }] = params;
        StuffActions.setForm({ [eventName]: value });
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
        StuffActions.setForm({ option: { ...option } });
        break;
      }
      case 'images': {
        const limit = 10;
        const [files] = params;
        if (files.length > limit) {
          // eslint-disable-next-line no-alert
          alert(`최대 ${limit}개만 추가 할 수 있습니다.`);
          return;
        }

        StuffActions.setForm({ files });
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
  history: instanceOf(Object).isRequired,
};

export default connect(({ stuffModule }) => ({
  name: stuffModule.get('name'),
  memo: stuffModule.get('memo'),
  option: stuffModule.get('option'),
  files: stuffModule.get('files'),
}),
() => ({}))(withRouter(SutffFormContainer));

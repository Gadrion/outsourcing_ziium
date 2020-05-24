import React from 'react';
import { withRouter } from 'react-router-dom';
import { func, instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { StuffActions } from 'store/actionCreators';

class SutffFormContainer extends React.Component {
  state = {};

  options = [
    { key: 'room1', label: '1룸' },
    { key: 'room15', label: '1.5룸' },
    { key: 'room2', label: '2룸' },
    { key: 'room3', label: '3룸' },
    { key: 'room4', label: '4룸' },
    { key: 'duplex', label: '복층' },
    { key: 'terrace', label: '테라스' },
    { key: 'monthly', label: '월세' },
    { key: 'charter', label: '전세' },
    { key: 'imprisonment', label: '구옥' },
  ];

  constructor(props) {
    super(props);
    const { option } = props;

    const newOption = this.options.reduce((acc, { key }) => {
      if (acc[key] == null) {
        acc[key] = false;
      }
      return acc;
    }, { ...option });
    StuffActions.setForm({ option: newOption });

  }

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
        const { option } = this.props;
        const [{ target: { name, checked } }] = params;

        option[name] = checked;
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
}), () => ({}))(withRouter(SutffFormContainer));

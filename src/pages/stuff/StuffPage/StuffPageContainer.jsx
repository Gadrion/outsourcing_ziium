import React from 'react';
import { connect } from 'react-redux';
import { func, number, instanceOf } from 'prop-types';

import { StuffActions } from 'store/actionCreators';

class SutffPageContainer extends React.Component {
  state = {
  };

  setRootElem = elem => {
    this.ref = elem;
  }

  _onClick = eventName => () => {
    const { id, history } = this.props;
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
        history.push('/work');
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

  render() {
    const { render } = this.props;
    return render({ ...this, ...this.state, ...this.props });
  }
}

SutffPageContainer.defaultProps = {
  id: null,
};

SutffPageContainer.propTypes = {
  render: func.isRequired,
  id: number,
  history: instanceOf(Object).isRequired,
};

export default connect(({ stuffModule }) => ({
  id: stuffModule.get('id'),
}),
() => ({}))(SutffPageContainer);

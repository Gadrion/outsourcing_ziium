import React from 'react';
import { func } from 'prop-types';

class SutffPageContainer extends React.Component {
  state = {
  };

  setRootElem = elem => {
    this.ref = elem;
  }

  _onClick = eventName => () => {
    switch (eventName) {
      case 'save': {
        // add redux action code
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
        alert('미구현'); // temp
        break;
    }
  }

  render() {
    const { render } = this.props;
    return render({ ...this, ...this.state, ...this.props });
  }
}

SutffPageContainer.propTypes = {
  render: func.isRequired,
};

export default SutffPageContainer;

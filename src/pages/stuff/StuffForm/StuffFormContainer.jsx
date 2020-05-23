import React from 'react';
import { func } from 'prop-types';

class SutffFormContainer extends React.Component {
  state = {
    files: [],
    name: '',
    memo: '',
    option: {},
  };

  setRootElem = elem => {
    this.ref = elem;
  }

  _onChange = eventName => (...params) => {
    switch (eventName) {
      case 'name':
      case 'memo': {
        const [{ target: { value } }] = params;
        this.setState({ [eventName]: value });
        break;
      }
      case 'option': {
        const [{ target: { name, checked } }] = params;
        const { option } = this.state;
        if (checked) {
          option[name] = true;
        } else {
          delete option[name];
        }
        this.setState({ option: { ...option } });
        break;
      }
      case 'images': {
        const [files] = params;
        this.setState({ files });
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
};

export default SutffFormContainer;

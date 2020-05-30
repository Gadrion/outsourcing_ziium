import React from 'react';
import { func } from 'prop-types';

class ItemSearchFormContainer extends React.Component {
  options = [
    { key: 'room1', label: '1룸' },
    { key: 'room15', label: '1.5룸' },
    { key: 'room2', label: '2룸' },
    { key: 'room3', label: '3룸' },
    { key: 'room4', label: '4룸' },
    { key: 'all', label: '?' },
    { key: 'duplex', label: '복층' },
    { key: 'terrace', label: '테라스' },
    { key: 'monthly', label: '월세' },
    { key: 'charter', label: '전세' },
    { key: 'imprisonment', label: '구옥' },
  ];

  state = {
    option: this.options.reduce((acc, { key }) => {
      acc[key] = false;
      return acc;
    }, {}),
    resultOnly: false,
    otherwise: false,
    resultOnly1: '',
    resultOnly2: '',
    otherwise1: '',
    otherwise2: '',
  };

  _onClick = eventName => e => {
    let { option } = this.state;
    switch (eventName) {
      case 'check': {
        const { target: { name, checked } } = e;
        if (name === 'all') {
          option = this.options.reduce((acc, { key }) => {
            acc[key] = checked;
            return acc;
          }, {});
        }
        console.log(option);
        this.setState({ option: { ...option, [name]: checked } });
        break;
      }
      case 'resultOnly':
      case 'otherwise': {
        const { target: { name, checked } } = e;
        this.setState({ [name]: checked });
        break;
      }

      default:
        break;
    }
  }

  _onChange = eventName => e => {
    switch (eventName) {
      case 'resultOnly1':
      case 'resultOnly2':
      case 'otherwise1':
      case 'otherwise2': {
        const { target: { value } } = e;
        this.setState({ [eventName]: value });
        break;
      }

      default:
        break;
    }
  }

  render() {
    const { render } = this.props;
    return render({ ...this, ...this.state, ...this.props });
  }
}

ItemSearchFormContainer.propTypes = {
  render: func.isRequired,
};

export default ItemSearchFormContainer;

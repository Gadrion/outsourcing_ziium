import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { Button } from 'wisenet-ui/components/atoms';
import styles from './Popup.scss';

const cx = classnames.bind(styles);

class Popup extends React.PureComponent {
  render() {
    const { text, closePopup } = this.props;
    return (
      <div className={cx('popup')}>
        <div className={cx('popup_inner')}>
          <h1>{text}</h1>
          <Button point onClick={closePopup}>close</Button>
        </div>
      </div>
    );
  }
}

Popup.defaultProps = {
  text: 'no assign',
  closePopup: () => { },
};

Popup.propTypes = {
  text: PropTypes.string,
  closePopup: PropTypes.func,
};

export default Popup;

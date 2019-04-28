import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './LivePlaybackTemplate.scss';

const cx = classnames.bind(styles);

const LivePlaybackTemplate = ({
  sidebar,
  content,
}) => (
  <div className={cx('live-playback-template')}>
    <div className={cx('sidebar')}>
      {sidebar}
    </div>
    <div className={cx('content')}>
      {content}
    </div>
  </div>
);

LivePlaybackTemplate.defaultProps = {
  sidebar: null,
  content: null,
};

LivePlaybackTemplate.propTypes = {
  sidebar: PropTypes.node,
  content: PropTypes.node,
};

export default LivePlaybackTemplate;

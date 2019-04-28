import React from 'react';
// import classNames from 'classnames/bind';
import { withContainer } from 'wisenet-ui/util/hoc';
import { VideoProfilePageContainer } from 'containers/pages';
import { PTZMouseEvent } from 'components/organisms';
import movie from 'util/static/video/movie.mp4';
// import styles from './VideoProfilePage.scss';

// const cx = classNames.bind(styles);
const style = {
  width: '640px',
  height: '480px',
  position: 'absolute',
  top: 0,
  left: 0,
};

const VideoProfilePage = () => (
  <React.Fragment>
    <PTZMouseEvent channel={0}>
      <video muted controls autoPlay loop style={style}>
        <source src={movie} type="video/mp4" />
        {'tt'}
      </video>
    </PTZMouseEvent>
    <PTZMouseEvent channel={1}>
      <video muted controls autoPlay loop style={style}>
        <source src={movie} type="video/mp4" />
        {'tt'}
      </video>
    </PTZMouseEvent>
  </React.Fragment>
);

export default withContainer(VideoProfilePageContainer, VideoProfilePage);

import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TileBarPageContainer } from 'containers/pages';
import classnames from 'classnames/bind';

import { TileCommonBar, TileBar } from 'wisenet-ui/components/organisms';
import movie from 'util/static/video/movie.mp4';

import styles from './TileBarPage.scss';


const cx = classnames.bind(styles);


class TileBarPage extends React.PureComponent {
  componentDidMount() {
    console.log('!!!');
  }

  render() {
    return (
      <div className={cx('content-container')}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <div className={cx('video-container')}>
            <video muted controls autoPlay loop className={cx('video-content')}>
              <source src={movie} type="video/mp4" />
              {'tt'}
            </video>
            <TileBar />
          </div>
          <div className={cx('video-container')}>
            <video muted controls autoPlay loop className={cx('video-content')}>
              <source src={movie} type="video/mp4" />
              {'tt'}
            </video>
            <TileBar />
          </div>
          <div className={cx('video-container')}>
            <video muted controls autoPlay loop className={cx('video-content')}>
              <source src={movie} type="video/mp4" />
              {'tt'}
            </video>
            <TileBar />
          </div>
        </div>
        <TileCommonBar />
      </div>
    );
  }
}

export default withContainer(TileBarPageContainer, TileBarPage);

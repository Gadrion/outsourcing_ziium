import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { VideoSetupPageContainer } from 'containers/pages';
import { Sketchbook } from 'wisenet-ui/components/organisms';
import { UmpPlayer } from 'wisenet-ui/components/molecules';
import { Button } from 'wisenet-ui/components/atoms';
import classnames from 'classnames/bind';
import styles from './VideoSetupPage.scss';


const cx = classnames.bind(styles);

const VideoSetupPage = ({
  sessionKey,
  connectedCameraList,
  sketchinfo,
  objects,
  onButtonClick,
  updateObject,
}) => (
  <React.Fragment>
    <div>VideoSetupPage</div>
    <Sketchbook sketchinfo={sketchinfo} shape="rect" className={cx('sketchbook')} objects={objects} updateObject={updateObject}>
      {
        connectedCameraList.length !== 0
          ? (
            <UmpPlayer
              sessionKey={sessionKey}
              channel={connectedCameraList[0].channel + 1}
              className={cx('umpPlayer')}
            />
          )
          : <p> No connected camera!! </p>
      }
    </Sketchbook>
    <Button point onClick={onButtonClick} />
  </React.Fragment>
);

VideoSetupPage.defaultProps = {
  sketchinfo: {
    workType: 'mdArea',
    width: '640px',
    height: '360px',
  },
  objects: {
  },
  updateObject: null,
  onButtonClick: null,
};

VideoSetupPage.propTypes = {
  sessionKey: PropTypes.string.isRequired,
  connectedCameraList: PropTypes.arrayOf(PropTypes.object).isRequired,
  sketchinfo: PropTypes.shape({
    workType: PropTypes.string,
  }),
  objects: PropTypes.arrayOf(PropTypes.object),
  updateObject: PropTypes.func,
  onButtonClick: PropTypes.func,
};

export default withContainer(VideoSetupPageContainer, VideoSetupPage);

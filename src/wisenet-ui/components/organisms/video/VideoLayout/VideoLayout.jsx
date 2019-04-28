import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VideoDynamicLayout, VideoStaticLayout } from 'wisenet-ui/components/organisms';

class VideoLayout extends Component {
  constructor(props) {
    super(props);
    this.factorys = {
      dynamic: data => <VideoDynamicLayout {...data} />,
      static: data => <VideoStaticLayout {...data} />,
    };
  }

  render() {
    const { type } = this.props;

    const factory = this.factorys[type];
    const LayoutComponent = factory ? factory(this.props) : null;
    return (
      <React.Fragment>
        {LayoutComponent}
      </React.Fragment>
    );
  }
}

VideoLayout.defaultProps = {
  type: 'dynamic',
};

VideoLayout.propTypes = {
  type: PropTypes.oneOf(['dynamic', 'static']),
};

export default VideoLayout;

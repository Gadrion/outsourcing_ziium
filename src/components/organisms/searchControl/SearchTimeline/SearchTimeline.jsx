import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Timeline } from 'wisenet-ui/components/organisms';
import {
  SearchTimelineOptionLeft,
  SearchTimelineOptionMiddle,
  SearchTimelineOptionRight,
} from 'components/molecules';
import { SearchTimelineContainer } from 'containers/organisms';
import { TimelineAlmende } from 'wisenet-ui/components/organisms';
import { withContainer } from 'wisenet-ui/util/hoc';
import {
  SearchOptionStyled,
  IconStyled,
} from './SearchTimelineStyled';

class SearchTimeline extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <div
        className={className}
      >
        <SearchOptionStyled>
          <SearchTimelineOptionLeft
            {...this.props}
            IconStyled={IconStyled}
          />
          <SearchTimelineOptionMiddle
            {...this.props}
            IconStyled={IconStyled}
          />
          <SearchTimelineOptionRight
            {...this.props}
            IconStyled={IconStyled}
          />
        </SearchOptionStyled>
        <TimelineAlmende {...this.props} />
      </div>
    );
  }
}

SearchTimeline.defaultProps = {
  className: null,
};

SearchTimeline.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default withContainer(SearchTimelineContainer, SearchTimeline);

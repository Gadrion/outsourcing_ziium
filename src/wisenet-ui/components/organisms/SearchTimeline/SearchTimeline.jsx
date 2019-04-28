import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withContainer } from 'wisenet-ui/util/hoc';
// import { SearchTimelineContainer } from 'wisenet-ui/containers/organisms';
import { TimelineLabelAndLine } from 'wisenet-ui/components/atoms';
import { ViewportStyled, WrapperStyled } from './SearchTimelineStyled';

const LabelsAndLines = ({ labelsAndLines }) => (
  <React.Fragment>
    {labelsAndLines.map(item => <TimelineLabelAndLine key={item.label} {...item} />)}
  </React.Fragment>
);

LabelsAndLines.propTypes = {
  labelsAndLines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class SearchTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.viewport = null;
  }

  componentDidMount() {
    const { setTimelineRef } = this.props;
    setTimelineRef(this.viewport);
  }

  render() {
    const { labelsAndLines } = this.props;
    return (
      <ViewportStyled ref={ref => { this.viewport = ref; }}>
        <WrapperStyled>
          <LabelsAndLines labelsAndLines={labelsAndLines} />
        </WrapperStyled>
      </ViewportStyled>
    );
  }
}

SearchTimeline.propTypes = {
  labelsAndLines: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTimelineRef: PropTypes.func.isRequired,
};

// export default withContainer(SearchTimelineContainer, SearchTimeline);
export default SearchTimeline;

import React from 'react';
// import PropTypes from 'prop-types';
import { SearchTimeline } from 'wisenet-ui/components/organisms';

class SearchTimelineContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /*
        labelAndLine: [{ label: '00:00', left: 0 }, ...]
      */
      labelsAndLines: [],
    };

    this.viewport = null;
    this.containerSize = 0;
    this.labelsAndLines = {
      num: 0,
      size: 0,
      start: 0,
      end: 0,
    };

    this.options = {
      maxZoomMS: 86400000, // 1000 * 60 * 60 * 24 (24h)
      minZoomMS: 600000, // 1000 * 60 * 10 (10m)
      actualScrollableSize: 0,
    };
  }

  // componentDidMount() {
  // }

  getVisibleLabelsAndLines() {
    // const { date } = this.props;
    const labelsAndLines = [];
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // const month = `0${date.getMonth() + 1}`.slice(-2);
    // const day = `0${date.getDate()}`.slice(-2);
    const viewportWidth = this.viewport.offsetWidth;
    this.labelsAndLines = {
      ...this.labelsAndLines,
      size: 60,
      num: Math.trunc(viewportWidth / this.labelsAndLines.size),
    };
    this.containerSize = 24 * this.labelsAndLines.size;

    for (let i = 0; i <= 24; i += 1) {
      labelsAndLines.push({
        label: i < 10 ? `0${i}:00` : `${i}:00`,
        left: viewportWidth / 24 * i,
      });
    }

    this.setState({ labelsAndLines });
  }

  setOptions = () => {
    this.options.actualScrollableSize = this.viewport.offsetWidth;
    // console.log(this.options);
  }

  setTimelineRef = viewport => {
    this.viewport = viewport;
    this.setOptions();
    this.getVisibleLabelsAndLines();
  }

  render() {
    const { setTimelineRef } = this;
    const { labelsAndLines } = this.state;

    return (
      <SearchTimeline
        labelsAndLines={labelsAndLines}
        setTimelineRef={setTimelineRef}
      />
    );
  }
}

SearchTimelineContainer.defaultProps = {
  // datas: [],
  // maxZoomMS: 86400000, // 1000 * 60 * 60 * 24 (24h)
  // minZoomMS: 600000, // 1000 * 60 * 10 (10m)
  // currentDateTime: null,
  // changeCurrentDate: () => {},
  // startDragPicker: () => {},
  // stopDragPicker: () => {},
};

SearchTimelineContainer.propTypes = {
  // startDate: PropTypes.instanceOf(Date).isRequired,
  // endDate: PropTypes.instanceOf(Date).isRequired,
  // date: PropTypes.instanceOf(Date).isRequired,
  // datas: PropTypes.arrayOf(PropTypes.object),
  // maxZoomMS: PropTypes.number,
  // minZoomMS: PropTypes.number,
  // currentDateTime: PropTypes.instanceOf(Date),
  // changeCurrentDate: PropTypes.func,
  // startDragPicker: PropTypes.func,
  // stopDragPicker: PropTypes.func,
};

export default SearchTimelineContainer;

import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { Button } from 'wisenet-ui/components/atoms';
import { TimelineAlmende } from 'wisenet-ui/components/organisms';
import { TimelineExamplePageContainer } from 'containers/pages';
import { TimelineWrapperStyled } from './TimelineExamplePageStyled';

class TimelineExamplePage extends React.Component {
  componentDidMount() {
  }

  render() {
    const {
      datas,
      currentTime,
      selectDate,
      timeChanged,
      handleClick,
      handleTimeRangeExport,
      useSelectTimeRange,
    } = this.props;
    const useMouseoverPopup = true;

    return (
      <TimelineWrapperStyled>
        <Button onClick={handleClick} disabled={useSelectTimeRange}>구간선택</Button>
        <TimelineAlmende
          datas={datas}
          currentTime={currentTime}
          selectDate={selectDate}
          timeChanged={timeChanged}
          handleTimeRangeExport={handleTimeRangeExport}
          useMouseoverPopup={useMouseoverPopup}
          useSelectTimeRange={useSelectTimeRange}
        />
      </TimelineWrapperStyled>
    );
  }
}

TimelineExamplePage.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object),
  selectDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
  currentTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
  timeChanged: PropTypes.func,
  handleClick: PropTypes.func,
  handleTimeRangeExport: PropTypes.func,
  useSelectTimeRange: PropTypes.bool,
};

TimelineExamplePage.defaultProps = {
  datas: [],
  selectDate: 0,
  currentTime: 0,
  timeChanged: () => {},
  handleClick: () => {},
  handleTimeRangeExport: () => {},
  useSelectTimeRange: false,
};

export default withContainer(TimelineExamplePageContainer, TimelineExamplePage);

import 'wisenet-ui/styles/vendors/timeline-almende.css';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { SelectTimeRange } from 'wisenet-ui/components/organisms';
import { TimelineAlmendeContainer } from 'wisenet-ui/containers/organisms';
import {
  TimelineWrapper,
  TimelineWrapperStyled,
  TimelineMouseOverPopupStyled,
  SliderWrapperStyled,
  SliderParentStyled,
  SliderStyled,
} from './TimelineAlmendeStyled';

class TimelineAlmende extends Component {
  constructor(props) {
    super(props);

    this.popup = null;
    this.container = null;
    this.sliderWrapper = null;
  }

  componentDidMount() {
    if (this.popup && this.container && this.sliderWrapper) {
      const { setRef } = this.props;
      setRef('popup', this.popup);
      setRef('container', this.container);
      setRef('sliderWrapper', this.sliderWrapper);
    }

    // if (this.sliderWrapper) {
    //   console.log(this.sliderWrapper);
    // }
  }

  render() {
    const {
      zoomDT,
      handleMouseMove,
      handleClick,
      handleExport,
      useMouseoverPopup,
      useSelectTimeRange,
      handleScroll,
      scrollLeft,
      scrollWidth,
    } = this.props;
    const scrollHandleWidth = this.container !== null
      ? (this.container.clientWidth / 100 * scrollWidth) : 0;

    return (
      // <TimelineWrapper className={`${zoomDT < 24 && 'active'}`} onScroll={handleScroll}>
      //   <TimelineWrapperStyled onMouseMove={handleMouseMove} useSelectTimeRange zoomDT={zoomDT}>
      //     {
      //       useSelectTimeRange && (
      //         <SelectTimeRange
      //           handleExport={handleExport}
      //         />
      //       )
      //     }
      // <TimelineWrapper className={`${zoomDT < 24 && 'active'}`} onScroll={handleScroll}>
      <TimelineWrapper>
        <SliderWrapperStyled>
          <SliderParentStyled
            className={classNames({ show: zoomDT < 24 })}
            width={scrollWidth}
          >
            <SliderStyled
              ref={ref => {
                this.sliderWrapper = ref;
              }}
              min={0}
              max={100}
              value={scrollLeft}
              onChange={handleScroll}
              // scrollbarWidth={20}
              // scrollbarLeft={25}
              handleStyle={{
                marginTop: 0,
                marginLeft: `-${scrollHandleWidth / 2}px`,
                // marginLeft: 0,
                borderRadius: 0,
                width: `${scrollHandleWidth}px`,
                height: '10px',
              }}
            />
          </SliderParentStyled>
        </SliderWrapperStyled>
        <TimelineWrapperStyled onMouseMove={handleMouseMove} useSelectTimeRange zoomDT={zoomDT}>
          {
            useSelectTimeRange && (
              <SelectTimeRange
                handleExport={handleExport}
              />
            )
          }
          {
            useMouseoverPopup && (
            <TimelineMouseOverPopupStyled
              ref={ref => { this.popup = ref; }}
              className="timeline-mouseover-popup"
            >
              <div className="event-name">Motion detection</div>
              <div className="time">03:00:00</div>
            </TimelineMouseOverPopupStyled>
            )
          }
          <div
            id="timeline-container"
            ref={ref => { this.container = ref; }}
            onClick={handleClick}
          />
        </TimelineWrapperStyled>
      </TimelineWrapper>
    );
  }
}

TimelineAlmende.propTypes = {
  setRef: PropTypes.func,
  zoomDT: PropTypes.string.isRequired,
  handleMouseMove: PropTypes.func,
  handleClick: PropTypes.func,
  handleExport: PropTypes.func,
  handleScroll: PropTypes.func.isRequired,
  useMouseoverPopup: PropTypes.bool,
  useSelectTimeRange: PropTypes.bool,
  scrollLeft: PropTypes.number.isRequired,
  scrollWidth: PropTypes.number.isRequired,
};

TimelineAlmende.defaultProps = {
  setRef: () => {},
  handleMouseMove: () => {},
  handleClick: () => {},
  handleExport: () => {},
  useMouseoverPopup: false,
  useSelectTimeRange: false,
};

export default withContainer(TimelineAlmendeContainer, TimelineAlmende);

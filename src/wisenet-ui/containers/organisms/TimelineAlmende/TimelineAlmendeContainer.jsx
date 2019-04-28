import React from 'react';
import PropTypes from 'prop-types';
import each from 'lodash/each';
import assign from 'lodash/assign';
import Timeline from 'wisenet-ui/util/vendors/timeline-almende';

const noop = () => {};
const events = [
  'add',
  'change',
  'edit',
  'delete',
  'ready',
  // 'currentTimeTick',
  // 'click',
  // 'contextmenu',
  // 'doubleClick',
  // 'groupDragged',
  'changed',
  'rangechange',
  'rangechanged',
  'select',
  'timechange',
  'timechanged',
  // 'mouseOver',
  // 'mouseMove',
  // 'itemover',
  // 'itemout',
];

const eventPropTypes = {};
const eventDefaultProps = {};

each(events, event => {
  // eslint-disable-next-line no-unused-expressions
  ((eventPropTypes[event] = PropTypes.func),
  (eventDefaultProps[`${event}Handler`] = noop));
});
const localDate = new Date();
const start = new Date(localDate.getFullYear(),
  localDate.getMonth(), localDate.getDate());
const end = new Date(localDate.getFullYear(),
  localDate.getMonth(), localDate.getDate(), 23, 59, 59);
const options = {
  start,
  end,
  min: start,
  max: end,
  type: 'range',
  stackEvents: false,
  editable: false,
  animate: false,
  animateZoom: false,
  // eventMargin: 1, // minimal margin between events
  // eventMarginAxis: 1, // minimal margin between events and the axis
  showMajorLabels: false,
  showCustomTime: true,
  showCurrentTime: false,
  cluster: true,
  clusterMaxItems: 30, // The maximum quantity of items that can be shown outside a cluster.
  // axisOnTop: true,
  snapEvents: true,
  // dragAreaWidth: 20,
  selectable: true,
  // showNavigation: true,
  groupsWidth: 0,
  zoomMax: 1000 * 60 * 60 * 24,
  zoomMin: 1000 * 60 * 10, // minimum zoom interval for the visible range
  // groupMinHeight: '50px',
  height: '40px',
};

class TimelineAlmendeContainer extends React.Component {
  state = {
    offset: {},
    scrollWidth: 0,
    scrollLeft: 0,
  }

  diffPercent = 100

  componentDidMount() {
    window.addEventListener('resize', this.checkWindowResize);
    this.init();
    // console.log(this.refs);
  }

  // shouldComponentUpdate(nextProps) {
  // // return true;
  // const {
  //   currentTime,
  //   // groups,
  //   // options,
  //   // selection,
  //   // customTimes,
  // } = this.props;

  // const currentTimeChange = currentTime !== nextProps.currentTime;
  // // const groupsChange = groups !== nextProps.groups;
  // // const optionsChange = options !== nextProps.options;
  // // const customTimesChange = customTimes !== nextProps.customTimes;
  // // const selectionChange = selection !== nextProps.selection;

  // return (
  //   currentTimeChange
  //   // || groupsChange
  //   // || optionsChange
  //   // || customTimesChange
  //   // || selectionChange
  // );
  // }

  componentDidUpdate(prevProps) {
    // const { currentTime } = this.props;
    // if (prevProps.currentTime !== currentTime) {
    //   this.$el.setCurrentTime(currentTime);
    // }

    // if (this.$el) {
    //   this.init();
    // }

    const {
      timeLine: prevTimeLine,
      datas: prevDatas, // TimelineExamplePage의 data
      zoomVal: prevZoomVal,
      currentTime: prevCurrentTime,
    } = prevProps;

    const {
      timeLine,
      searchDateObj,
      overlappedIDList,
      datas, // TimelineExamplePage의 data
      zoomVal,
      currentTime,
    } = this.props;

    if (prevDatas !== datas) { // TimelineExamplePage의 data
      this.init();
      return;
    }

    if (prevCurrentTime !== currentTime) {
      const changedCurrentTime = new Date(currentTime);
      // console.log(`CurrentTimeChanged::::::${changedCurrentTime}`);
      this.$el.setCustomTime(changedCurrentTime);
    }

    if (JSON.stringify(prevTimeLine) !== JSON.stringify(timeLine)) {
      const { year, month, day } = searchDateObj;
      const date = new Date(year, month - 1, day);
      const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
      const changedOption = {
        min: startDate,
        max: endDate,
        ...this.options,
      };
      if (timeLine && timeLine.length !== 0) {
        const items = timeLine.Results.map((result, index) => ({
          startTime: new Date(result.StartTime),
          endTime: new Date(result.EndTime),
          channel: Number(timeLine.Channel + 1),
          overlappedId: overlappedIDList,
          resultId: result.Result,
          id: index,
          group: result.Type,
          start: new Date(result.StartTime),
          end: new Date(result.EndTime), // end is optional
          editable: false,
          className: result.Type,
        }));

        this.$el.setOptions(changedOption);
        this.$el.draw(items);
        this.$el.setVisibleChartRange(startDate, endDate);
        Timeline.events.addListener(this.$el, 'rangechanged', this.zoomChanged);
        // this.animateTo(date, this.$el);
      }
    }

    if (zoomVal !== 0 && prevZoomVal !== zoomVal) {
      this.zoom(zoomVal);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWindowResize);
  }

  setRef = (name, elem) => {
    this[name] = elem;

    if (this.container) {
      this.$el = new Timeline.Timeline(this.container, options);
    }
  }

  handleMouseMove = e => {
    // const { clientX, currentTarget } = e;
    // const { offsetLeft } = currentTarget;
    const x = e.clientX - e.currentTarget.offsetParent.offsetLeft;
    const time = this.$el.screenToTime(x);
    const formattedTime = `${new Date(time).getHours()}:${new Date(time).getMinutes()}:${new Date(time).getSeconds()}`;

    this.popup.style.left = `${x}px`;
    this.popup.querySelector('.time').innerHTML = formattedTime;

    // this.setState({
    //   time: formattedTime,
    // });
  }

  getData = data => {
    if (typeof (data.row) !== 'undefined') {
      return this.$el.getItem(data.row);
    }
    const clusterItems = this.$el.getCluster(data.cluster).items;
    const clusterStart = this.$el.getCluster(data.cluster).start;
    clusterItems.sort((a, b) => {
      const hasProperty = Object.prototype.hasOwnProperty.call(a, 'end');
      if (hasProperty) {
        return a.end - b.end;
      }
      return null;
    });
    const item = {
      start: clusterStart,
      end: clusterItems[clusterItems.length - 1].end,
      ...clusterItems[0],
    };
    return item;
  }

  handleClick = e => {
    const { customTimeChangeEvent } = this.props;
    const x = e.clientX - e.currentTarget.offsetParent.offsetParent.offsetLeft;
    const time = this.$el.screenToTime(x);

    const selectedDataIndex = this.$el.getSelection();
    const selectedData = selectedDataIndex.length !== 0
      ? this.getData(selectedDataIndex[0]) : [];

    this.$el.setCustomTime(time);

    customTimeChangeEvent({ time, selectedData });
  }

  // customTimeChanged = () => {
  //   const { customTimeChangeEvent } = this.props;
  //   const currentCustomTime = this.$el.getCustomTime();

  //   customTimeChangeEvent(currentCustomTime);
  // }

  zoomChanged = () => {
    const { zoomChangeEvent } = this.props;
    const currentOptions = this.$el.getOptions();
    const range = this.$el.getVisibleChartRange();
    const correntOptionRange = currentOptions.end - currentOptions.start;
    const scrollWidth = (range.end - range.start) / correntOptionRange * 100;

    const diff = (range.end - range.start) / (1000 * 60 * 60);
    const rangeHalfDiff = new Date(range.start.valueOf() + (range.end - range.start) / 2);
    const optionHalfDiff = new Date(currentOptions.start.valueOf() + correntOptionRange / 2);
    const rangeHalfDiffPercent = (rangeHalfDiff - optionHalfDiff) / correntOptionRange * 100;
    const scrollDiff = (range.start - currentOptions.start) / correntOptionRange * 100;

    this.diffPercent = (diff / 24 * 100).toFixed(0);
    // const scrollDiffPercent = (scrollDiff / 24 * 100).toFixed(0);
    const scrollDiffPercent = 50 + rangeHalfDiffPercent;
    this.checkWindowResize();
    // zoomMin 0.2, zoomMax 24.0
    zoomChangeEvent({ timelineRange: diff.toFixed(1) });

    this.setState({
      scrollDiff,
      scrollWidth,
      scrollLeft: scrollDiffPercent,
    });
  }

  checkWindowResize = () => {
    this.$el.redraw();
  }

  handleScroll = value => {
    const { scrollLeft } = this.state;
    const range = this.$el.getVisibleChartRange();
    const diff = (range.end - range.start) / (1000 * 60 * 60);

    const moveFactor = ((24 - diff) / diff / 100) * (value - scrollLeft);
    // console.log('moveFactor::', moveFactor, '   scrollWidth::', scrollWidth);
    this.$el.move(moveFactor);
    this.$el.redraw();

    this.setState({ scrollLeft: value });
  }

  handleExport = value => {
    const { handleTimeRangeExport } = this.props;
    const startTime = this.$el.screenToTime(value[0]);
    const endTime = this.$el.screenToTime(value[1]);

    handleTimeRangeExport({ startTime, endTime });
  }

  moveToCurrentTime = () => {
    this.$el.setVisibleChartRangeNow();
  }

  init() {
    const { datas, selectDate } = this.props;
    const selectDateStart = new Date(selectDate.getFullYear(),
      selectDate.getMonth(), selectDate.getDate());
    const selectDateEnd = new Date(selectDate.getFullYear(),
      selectDate.getMonth(), selectDate.getDate(), 23, 59, 59);
    this.$el.setVisibleChartRange(selectDateStart, selectDateEnd);
    Timeline.events.addListener(this.$el, 'rangechanged', this.zoomChanged);
    this.$el.draw(datas);

    // const date = new Date();
    // this.animateTo(date, this.$el);
    // const {
    //   items,
    //   groups,
    //   options,
    //   selection,
    //   selectionOptions = {},
    //   customTimes,
    //   animate = true,
    //   currentTime,
    // } = this.props;

    // let timelineOptions = options;

    // if (animate) {
    //   // If animate option is set, we should animate the timeline to any new
    //   // start/end values instead of jumping straight to them
    //   timelineOptions = omit(options, 'start', 'end');

    //   this.$el.setWindow(options.start, options.end, {
    //     animation: animate,
    //   });
    // }

    // this.$el.setOptions(timelineOptions);

    // if (groups.length > 0) {
    //   const groupsDataset = new vis.DataSet();
    //   groupsDataset.add(groups);
    //   this.$el.setGroups(groupsDataset);
    // }

    // this.$el.setItems(items);
    // this.$el.setSelection(selection, selectionOptions);

    // if (currentTime) {
    //   this.$el.setCurrentTime(currentTime);
    // }

    // // diff the custom times to decipher new, removing, updating
    // const customTimeKeysPrev = keys(this.state.customTimes);
    // const customTimeKeysNew = keys(customTimes);
    // const customTimeKeysToAdd = difference(
    //   customTimeKeysNew,
    //   customTimeKeysPrev,
    // );
    // const customTimeKeysToRemove = difference(
    //   customTimeKeysPrev,
    //   customTimeKeysNew,
    // );
    // const customTimeKeysToUpdate = intersection(
    //   customTimeKeysPrev,
    //   customTimeKeysNew,
    // );

    // // NOTE this has to be in arrow function so context of `this` is based on
    // // this.$el and not `each`
    // each(customTimeKeysToRemove, id => this.$el.removeCustomTime(id));
    // each(customTimeKeysToAdd, id => {
    //   const datetime = customTimes[id];
    //   this.$el.addCustomTime(datetime, id);
    // });
    // each(customTimeKeysToUpdate, id => {
    //   const datetime = customTimes[id];
    //   this.$el.setCustomTime(datetime, id);
    // });

    // // store new customTimes in state for future diff
    // this.setState({ customTimes });
  }

  // create a simple animation
  animateTo(date, timeline) {
    // get the new final date
    const animateFinal = date.valueOf();
    // timeline.setCustomTime(date);

    // cancel any running animation
    this.animateCancel();

    // animate towards the final date
    const animate = () => {
      const range = timeline.getVisibleChartRange();
      const current = (range.start.getTime() + range.end.getTime()) / 2;
      const width = (range.end.getTime() - range.start.getTime());
      const minDiff = Math.max(width / 1000, 1);
      const diff = (animateFinal - current);
      if (Math.abs(diff) > minDiff) {
        // move towards the final date
        // var start = new Date(range.start.getTime() + diff / 4);
        // var end = new Date(range.end.getTime() + diff / 4);
        // timeline.setVisibleChartRange(start, end);

        // // start next timer
        // animateTimeout = setTimeout(animate, 50);
      }
    };
    animate();
  }

  animateCancel() {
    let { animateTimeout } = this.props;
    if (animateTimeout) {
      clearTimeout(animateTimeout);
      animateTimeout = undefined;
    }
  }

  zoom(zoomVal) {
    this.$el.zoom(zoomVal);
    this.$el.trigger('rangechanged');
  }

  render() {
    const { render } = this.props;
    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

// TimelineAlmende.propTypes = assign(
TimelineAlmendeContainer.propTypes = {
  render: PropTypes.func.isRequired,
  datas: PropTypes.arrayOf(PropTypes.object),
  // items: PropTypes.array,
  // groups: PropTypes.array,
  // options: PropTypes.object,
  // selection: PropTypes.array,
  // customTimes: PropTypes.shape({
  //   datetime: PropTypes.instanceOf(Date),
  //   id: PropTypes.string,
  // }),
  // animate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // currentTime: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.instanceOf(Date),
  //   PropTypes.number,
  // ]).isRequired,
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
  customTimeChangeEvent: PropTypes.func,
  zoomChangeEvent: PropTypes.func,
  zoomVal: PropTypes.number,
  animateTimeout: PropTypes.func,
  handleTimeRangeExport: PropTypes.func,
  timeLine: PropTypes.oneOfType([PropTypes.any]),
  searchDateObj: PropTypes.oneOfType([PropTypes.any]),
  overlappedIDList: PropTypes.oneOfType([PropTypes.any]),
};
// eventPropTypes,
// );

TimelineAlmendeContainer.defaultProps = assign(
  {
    // items: [],
    datas: [],
    selectDate: new Date(),
    currentTime: new Date(),
    // selection: [],
    // customTimes: {},
    customTimeChangeEvent: () => {},
    zoomChangeEvent: () => {},
    animateTimeout: () => {},
    handleTimeRangeExport: () => {},
    timeLine: {},
    zoomVal: 0,
    searchDateObj: {},
    overlappedIDList: {},
  },
  eventDefaultProps,
);

export default TimelineAlmendeContainer;

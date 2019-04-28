import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { IconButton } from 'wisenet-ui/components/atoms';

import Timeline from 'react-visjs-timeline';

class TimelinePage extends React.PureComponent {
    
    localDate = new Date();

    pannelClick = true;
    pannelMove = false;
    timeline = null;
    timepannel = null;

    prevTime = 0;
    nextTime = 0;
    repeatRange = false;
    
    currentWindowStart = null;
    currentWindowEnd = null;
  
    
  
    time = new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate());

    options = {
      start: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate()),
      end: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate(), 23, 59, 59),
    };

    items = [
      // {
      //   start: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate()),
      //   content: 'First',
      // }
    ];
    
  
    state = {
      stopCallback: false,
      ignorePanEvent: false,
      startTimestamp: 0,
      endTimestamp: 0,
      currentTime: 0,

      customTimes: {
        one: this.time,
      },

      options: {
      start: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate()),
      end: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate(), 23, 59, 59),                // upper limit of visible range
      min: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate()),                // lower limit of visible range
      max: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate(), 23, 59, 59),                // upper limit of visible range
      zoomMin: 1000 * 60 * 60,             // one day in milliseconds
      zoomMax: 1000 * 60 * 60 * 24,     // about three months in milliseconds
      margin: 0,
      height: '155px',
      stack: false,        
      showCurrentTime: false,
      editable: {
        add: false,         // add new items by double tapping
        updateTime: true,  // drag items horizontally
        updateGroup: false, // drag items from one group to another
        remove: false,       // delete an item by tapping the delete button top right
        overrideItems: false  // allow these options to override item.editable
      },
      //editable: true,
      //autoResize: false,
      // orientation: {
      //   axis: 'top',
      // },

      tooltip: {
        followMouse: true,
        overflowMethod: 'cap',
      },

      onMove: this.onMove,
  
      onMoving: this.onMoving,
  
      onUpdate: this.onUpdate,

      format: {
          majorLabels: {
            second: 'HH:mm',
            minute: '',
            hour: '',
            weekday: '',
            day: '',
            month: '',
            year: '',
          },
          minorLabels: {
            second: 's',
            minute: 'HH:mm',
            hour: 'HH:mm',
            weekday: 'HH:mm',
            day: 'HH:mm',
            month: 'HH:mm',
            year: '',
          },
        },
      },

      items: [
        // {
        //   start: new Date(this.localDate.getFullYear(), this.localDate.getMonth(), this.localDate.getDate()),
        //   content: 'First',
        // }
      ],
    }

    

    componentDidMount () {
      console.log('componentDidMount');

      let timeline = this.getTimeline();
      timeline.itemSet.options.timelinePage = this;
      // timeline.on('mouseDown', this.mouseDownHandler);
      // timeline.on('mouseUp', this.mouseUpHandler);
    }

    componentWillUnmount() {
      console.log('componentWillUnmount');
    }
    
    onMove(item, callback) {
      //console.log('onMove Item', item);

      if(item.id == 'repeat') {
        let timelinePage = this.timelinePage;
        let { one } = timelinePage.state.customTimes;
        let tooltip = timelinePage.timeline.$el.dom.root.getElementsByClassName("vis-tooltip")[0];

        if(one < item.start) {
          tooltip.style.visibility = 'hidden';
          timelinePage.repeatRange = false;

          timelinePage.setState(({ items }) => ({
            items: items.filter(nextItems => nextItems.id !== item.id)
          }));
          return;
        }

        if(one > item.end) {
          tooltip.style.visibility = 'hidden';
          timelinePage.repeatRange = false;

          timelinePage.setState(({ items }) => ({
            items: items.filter(nextItems => nextItems.id !== item.id)
          }));
          return;
        }

        timelinePage.setState(({ items }) => ({
          items: items.map(
            nextItems => (nextItems.id === item.id ? { 
              ...item, 
              title: `${item.start.toTimeString().substring(0,8)}<br>${item.end.toTimeString().substring(0,8)}` 
            } : nextItems)
          )
        }));
        
      }
    }

    onMoving(item, callback) {
      //console.log('onMoving Item', item);
      if(item.id == 'repeat') {
        callback(item); // send back adjusted item
      }
    };

    onUpdate (item, callback) {
      console.log('onUpdate Item', item);
    };

    convertToData(time) {
      return new Date(time.getFullYear(), time.getMonth(), time.getDate());
    }
    convertToDataTime(time) {
      return new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes(),time.getSeconds());
    }
    convertToTime(time) {
      return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();;
    }

    getTimeline = function() {
      return this.timeline.$el;
    }

    getTimelineWindow = function() {
      return this.getTimeline().getWindow();
    }

    addRepeatRange = function (prevTime, nextTime) {
      let timeline = this.getTimeline();
      timeline.addCustomTime(prevTime, 'prevTime');
      timeline.addCustomTime(nextTime, 'nextTime');

      this.repeatRange = true;
    }

    removeRepeatRange = function () {
      let timeline = this.getTimeline();
      timeline.removeCustomTime('prevTime');
      timeline.removeCustomTime('nextTime');

      this.repeatRange = false;
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //event
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    clickHandler = props => {
      // handle click event
      console.log('clickHandler', props);
  
      let time = props.time;
      let date = this.convertToDataTime(time);
      let currentTime = this.convertToTime(date);

      let timeline = this.getTimeline();
      timeline.setCustomTime(date, 'one');
    }
  
    doubleClickHandler = props => {
      // handle doubleClick event
      console.log('doubleClickHandler', props);

      if(props.time != undefined) {
        let time = props.time;
        let date = this.convertToDataTime(time);
        let currentTime = this.convertToTime(date);
        
        let getWindow = this.getTimelineWindow();
        let {start, end} = getWindow;

        this.setState({
          customTimes: {
              one: time,
          },
          options: {
            start: start,
            end: end,
          },
          currentTime: currentTime,
        });
      }
    }
  
    rangechangeHandler = props => {
      // handle rangeChangeHandler change
      
      if (props.byUser === false) {
        return;
      }

      //console.log('rangechangeHandler', props);
    }

    rangechangedHandler = props => {
      // handle rangechangedHandler change
      
      if (props.byUser === false) {
        return;
      }

      let start = props.start;
      let end = props.end;

      this.setState({
        options: {
          start : start,
          end: end,
        }
      });

      //console.log('rangechangedHandler', props);
    }

    timechangeHandler = props => {
      // handle timechange change
      //console.log('timechangeHandler', props);

      let time = props.time;
      let start = this.options.start;
      let end = this.options.end;

      let date = this.convertToDataTime(time);

      let currentTime = this.convertToTime(date);

      if(props.id == 'one') {
        if(this.convertToData(time) < this.convertToData(start)) {
          time = start;
          currentTime = this.convertToTime(start);
        }

        if(this.convertToData(time) > this.convertToData(start)) {
          time = end;
          currentTime = this.convertToTime(end);
        }

        this.setState({
          customTimes: {
            one: time,
          },
          currentTime: currentTime,
        })
      }
    }
  
    timechangedHandler = props => {
      // handle timechanged change
      //console.log('timechangedHandler', props);

      let time = props.time;
      let date = this.convertToDataTime(time);
      let timeline = this.getTimeline();
      let oneTime = timeline.getCustomTime('one');
      let verticalPannel = timeline.dom.backgroundVertical;
      let niddle = verticalPannel.childNodes[2];
      let pannelLeft = niddle.offsetLeft;

      if(props.id == 'one') {
        if(pannelLeft < 0) {
          pannelLeft = 0;
          timeline.moveTo(date, { animation: false });
        }
        else if(niddle.offsetLeft > verticalPannel.offsetWidth)
        {
          timeline.moveTo(date, { animation: false });
        }

        let getWindow = this.getTimelineWindow();
        let {start, end} = getWindow;

        this.setState({
          options: {
            start: start,
            end: end,
          },
        });

        if(this.repeatRange) {
          let { start, end } = this.state.items[this.state.items.length-1];
          let tooltip = timeline.dom.root.getElementsByClassName("vis-tooltip")[0];

          if(time < start) {
            tooltip.style.visibility = 'hidden';
            this.repeatRange = false;
  
            this.setState(({ items }) => ({
              items: items.filter(nextItems => nextItems.id !== 'repeat')
            }));
          }
  
          if(time > end) {
            tooltip.style.visibility = 'hidden';
            this.repeatRange = false;

            this.setState(({ items }) => ({
              items: items.filter(nextItems => nextItems.id !== 'repeat')
            }));
          }
        }

        // if(this.repeatRange) {
        //   if(oneTime < this.prevTime ) {
        //     this.removeRepeatRange();
        //   }

        //   if(oneTime > this.nextTime ) {
        //     this.removeRepeatRange();
        //   }
        // }
      }else if(props.id == 'prevTime') {
        if(oneTime < props.time ) {
          this.prevTime = 0;
          this.nextTime = 0;
          
          this.removeRepeatRange();
          console.log('timechangedHandler prevTime', oneTime);
        } else {
          this.prevTime = timeline.getCustomTime(props.id);
        }
      }else if(props.id == 'nextTime') {
        if(oneTime > props.time ) {
          this.prevTime = 0;
          this.nextTime = 0;

          this.removeRepeatRange();
          console.log('timechangedHandler nextTime', oneTime);
        } else {
          this.nextTime = timeline.getCustomTime(props.id);
        }
      }
    }

    selectHandler = props => {
      // handle select change
      console.log('selectHandler', props);
    }

    mouseOverHandler = props => {
      // handle mouseOver change
      console.log('mouseOverHandler', props);
    }

    mouseMoveHandler = props => {
      // handle mouseMove change
      console.log('mouseMoveHandler', props);
    }

    itemoverHandler = props => {
      // handle itemover change
      console.log('itemoverHandler', props);
    }

    itemoutHandler = props => {
      // handle itemout change
      console.log('itemoutHandler', props);
    }

    //'mouseOver', 'mouseMove', 'itemover', 'itemout'

    mouseDownHandler = props => {
      // handle mouseDown change
      //console.log('mouseDownHandler', props);
    }

    mouseUpHandler = props => {
      // handle mouseUp change
      //console.log('mouseUpHandler', props);

      if(props.what == 'item') {
        // let timeline = this.getTimeline();
        // let id = props.item;
        // let { start, end } = timeline.itemsData._data[id];


        // let { items } = this.state;
        // let nextItem = items.slice();
        // let index = items.length-1;
        // let item = items[index];

        // if(item.content == 'repeat') {
        //   nextItem[index] = {
        //     ...item,
        //     start: start,
        //     end: end,
        //   };

        //   this.setState({
        //     items: nextItem,
        //   });
        // }

        console.log('mouseUpHandler', props);
      }
    }
    
  

    onclick = e => {
      //console.log('onclick : ', e);

      let timeline = this.getTimeline();      
      let currentTime = this.state.customTimes.one;
      let one = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());

      let hour = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let seconds = currentTime.getSeconds();

      let prevHour = hour == 0 ? 0 : hour-1;
      let prevMinutes = hour == 0 ? 0 : minutes;
      let prevSeconds = hour == 0 ? 0 : seconds;

      let nextHour = hour == 23 ? 0 : hour+1;
      let nextMinutes = hour == 23 ? 59 : minutes;
      let nextSeconds = hour == 23 ? 59 : seconds;

      let prevTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), prevHour, prevMinutes, prevSeconds);
      let nextTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), nextHour, nextMinutes, nextSeconds);
      
      this.prevTime = prevTime;
      this.nextTime = nextTime;

      let repeatItem = 
      {
        id: 'repeat',
        start: prevTime,
        end: nextTime,
        content: '<br><br><br><br>',
        title: `${prevTime.toTimeString().substring(0,8)}<br>${nextTime.toTimeString().substring(0,8)}`,
      };

      let { items } = this.state;
      let index = items.length-1;
      let item = items[index];


      if(!this.repeatRange) {
        this.repeatRange = true;
        this.setState({
          items : this.state.items.concat(repeatItem),
        });        
      } else {
        this.repeatRange = false;
        this.setState(({ items }) => ({
          items: items.filter(nextItems => nextItems.id !== item.id)
        }));
      }


      // if(!this.repeatRange) {
      //   this.addRepeatRange(prevTime, nextTime);
      // } else {
      //   this.removeRepeatRange();
      // }
    }

    onclick1 = e => {
      console.log('onclick1 : ', e);
      if(this.repeatRange) {
        this.removeRepeatRange();
      }
    }
  
    render() {
  
      return (
        <div style={{padding: '70px'}}>
          <IconButton className={`${'tui tui-ch-playback-play'}`} style={{ height: '40px', width: '40px', backgroundColor: '#000000'}} onClick={this.onclick} />
          <IconButton className={`${'tui tui-ch-playback-play'}`} style={{ height: '40px', width: '40px', backgroundColor: '#000000'}} onClick={this.onclick1} />
          <Timeline
            ref={ref => {
              this.timeline = ref;
            }}
            options={this.state.options}
            items={this.state.items}
            customTimes={this.state.customTimes}
            doubleClickHandler={this.doubleClickHandler}
            rangechangeHandler={this.rangechangeHandler}
            rangechangedHandler={this.rangechangedHandler}
            timechangeHandler={this.timechangeHandler}
            timechangedHandler={this.timechangedHandler}
            
            // selectHandler={this.selectHandler}
            // mouseOverHandler={this.mouseOverHandler}
            // mouseMoveHandler={this.mouseMoveHandler}
            // itemoverHandler={this.itemoverHandler}
            // itemoutHandler={this.itemoutHandler}
            
          />
          이벤트 : {this.state.currentTime}
        </div>
      );
    }
  }

storiesOf('test_timeline', module)
  .add('test', () => <TimelinePage />);
  // .add('with text', () => <div>qweqwe</div>);
import React, { Component } from 'react';
import { Calendar } from 'fullcalendar';
import { Button } from 'wisenet-ui/components/atoms';
import classnames from 'classnames/bind';
import styles from './Scheduler.scss';

const cx = classnames.bind(styles);

class Scheduler extends Component {
  state = {
    eventCount: 0,
  }

  constructor(props) {
    super(props);
    this.scheduler = null;
    this.schedulerEl = {};
  }

  componentDidMount() {
    this.scheduler = new Calendar(this.schedulerEl, {
      defaultView: 'agendaWeek', // weekly scheduler
      // header
      columnHeaderFormat: {
        weekday: 'short', // 요일 표시(축약 표시, 날짜 제외)
      },
      header: {
        left: '',
        center: '',
        right: '',
      },
      contentHeight: 620, // table height
      // left time table
      slotDuration: '00:30', // 30분 단위
      slotLabelFormat: {
        hour: '2-digit', // display 6 to 06
        minute: '2-digit',
        hour12: false, // display 24 hour
      },
      allDaySlot: false, // all-day 삭제
      scrollTime: '00:00', // 초기 scroll time 설정
      // select
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      selectConstraint: { // for selectable time limits(setting only one day)
        startTime: '00:00',
        endTime: '24:00',
      },
      select: e => this.addEvent(e),
      // event
      editable: true, // event time editable
      eventOverlap: false, // event 중복 false
      eventTimeFormat: {
        hour: '2-digit', // display 6 to 06
        minute: '2-digit',
        omitZeroMinute: false, // display 0
        hour12: false, // display 24 hour
      },
      eventConstraint: { // for time limits event dragging and resizing
        startTime: '00:00',
        endTime: '24:00',
      },
      eventClick: e => this.deleteEvent(e.event),
      eventRender: e => {
        this.scheduler.batchRendering(() => {
          if (e.el.querySelector('.fc-time span').innerText === '00:00') {
            e.el.querySelector('.fc-time span').innerText = 'All day';
          }
          e.el.style.backgroundColor = '#000';
          e.el.style.border = 'none';
          e.el.style.borderRadius = 'unset';
          e.el.className = `${e.el.className} ${cx('disable-short-mode')}`;
        });
      },
      // eventResize: e => {
      //   e.event.remove();
      //   this.addEvent(e.event);
      // },
      // eventDrop: e => {
      //   e.event.remove();
      //   this.addEvent(e.event);
      // },
    });
    this.scheduler.render();
  }

  changeDuration = option => {
    this.scheduler.setOption('slotDuration', option);
    if (option === '01:00') {
      this.scheduler.setOption('contentHeight', 470);
    }
  }

  eventMerge = newEvent => {
    const eventList = this.scheduler.getEvents();
    const tmpEventList = [];
    let startTime = newEvent.start;
    let endTime = newEvent.end;
    if (eventList.length !== 0) {
      eventList.map(event => {
        if (endTime.getTime() === event.start.getTime()
          || startTime.getTime() === event.end.getTime()) {
          tmpEventList.push(event);
          event.remove();
        }
        return event;
      });
    }
    if (tmpEventList.length !== 0) {
      tmpEventList.map(event => {
        if (event.start.getTime() < startTime.getTime()) {
          startTime = event.start;
        }
        if (event.end.getTime() > endTime.getTime()) {
          endTime = event.end;
        }
        return event;
      });
    }
    return {
      startTime,
      endTime,
    };
  }

  checkAvailable = newEvent => {
    let result = true;
    const eventList = this.scheduler.getEvents();
    if (eventList.length !== 0) {
      const unit = this.scheduler.getOption('slotDuration');
      eventList.map(event => {
        if (newEvent.start.getDay() === event.start.getDay()) {
          if (newEvent.start.getTime() > event.start.getTime()) {
            if (
              (
                newEvent.start.getHours() === event.end.getHours()
                && newEvent.start.getMinutes() !== event.end.getMinutes()
                && (unit === '00:01' || (unit === '00:30' && newEvent.start.getHours() === event.end.getHours() && event.end.getMinutes() !== 0))
              )
            ) {
              console.log('!!!', newEvent.start, event.end);
              result = false;
            }
          } else if (newEvent.start.getTime() < event.start.getTime()) {
            if (
              (
                newEvent.end.getHours() === event.start.getHours()
                && newEvent.end.getMinutes() !== event.start.getMinutes()
                && (unit === '00:01' || (unit === '00:30' && newEvent.end.getHours() === event.start.getHours() && newEvent.end.getMinutes() !== 0))
              )
            ) {
              console.log('!!!', newEvent.end, event.start);
              result = false;
            }
          }
        }
        return event;
      });
    }
    return result;
  }

  addEvent = event => {
    this.scheduler.batchRendering(() => {
      const { eventCount } = this.state;
      this.state.eventCount += 1;
      if (this.checkAvailable(event)) {
        const newEvent = this.eventMerge(event);
        this.scheduler.addEvent({
          id: eventCount,
          start: newEvent.startTime,
          end: newEvent.endTime,
        });
      }
      this.scheduler.unselect();
    });
  }

  deleteEventAll = () => {
    this.scheduler.batchRendering(() => {
      const eventList = this.scheduler.getEvents();
      eventList.map(event => event.remove());
    });
  }

  deleteEvent = event => {
    event.remove();
  }

  render() {
    return (
      <div className={cx('weekly-scheduler')}>
        <div className={cx('toolbar')}>
          <Button className={cx('toolbar-button')} onClick={() => this.changeDuration('00:01')}>1 min</Button>
          <Button className={cx('toolbar-button')} onClick={() => this.changeDuration('00:30')}>30 min</Button>
          <Button className={cx('toolbar-button')} onClick={() => this.changeDuration('01:00')}>1 hour</Button>
          <Button className={cx('toolbar-button')} onClick={this.deleteEventAll}>reset</Button>
        </div>
        <div id="scheduler" ref={ref => { this.schedulerEl = ref; }} />
      </div>
    );
  }
}


Scheduler.propTypes = {

};

export default Scheduler;

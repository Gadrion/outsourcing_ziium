import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TimelineExamplePageContainer extends React.Component {
  localDate = new Date();

  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(this.localDate.getFullYear(),
        this.localDate.getMonth(), this.localDate.getDate()),
      selectDate: new Date(this.localDate.getFullYear(),
        this.localDate.getMonth(), this.localDate.getDate()),
      datas: [],
      useSelectTimeRange: false,
    };
  }

  componentDidMount() {
    const datas = this._createData();

    this.setState({ datas });

    // setInterval(() => {
    //   const currentTime = new Date().setHours(1);
    //   this.setState({ currentTime });
    // }, 1000);
  }

  // componentDidUpdate() {

  // }

  _createData = () => {
    const datas = [];
    let order = 1;
    for (let j = 0; j < 4; j += 1) {
      const start = new Date(this.localDate.getFullYear(),
        this.localDate.getMonth(), this.localDate.getDate());
      for (let i = 0; i < 1000 / 4; i += 1) {
        const startDate = new Date(start).setMilliseconds(1000 * this._getRandomInt(0, 3600 * 23));
        const end = new Date(startDate).setMilliseconds(1000 * this._getRandomInt(0, 60 * 30));
        const content = `${order}`;

        datas.push({
          start: startDate,
          end,
          content,
          // type: 'custom',
          className: 'Normal',
          group: 'Normal',
        });
        order += 1;
      }
    }

    for (let h = 0; h < 24; h += 1) {
      for (let m = 0; m < 60; m += 2) {
        datas.push({
          start: new Date(this.localDate.getFullYear(),
            this.localDate.getMonth(), this.localDate.getDate(), h, m, 25),
          end: new Date(this.localDate.getFullYear(),
            this.localDate.getMonth(), this.localDate.getDate(), h, m + 1, 30),
          content: `MD ${h}:${m}`,
          // type: 'custom',
          className: 'MotionDetection',
          group: 'MotionDetection',
        });
      }
    }

    for (let e = 0; e < 24; e += 2) {
      for (let y = 0; y < 60; y += 5) {
        datas.push({
          start: new Date(this.localDate.getFullYear(),
            this.localDate.getMonth(), this.localDate.getDate(), e, y, 10),
          end: new Date(this.localDate.getFullYear(),
            this.localDate.getMonth(), this.localDate.getDate(), e, y + 1, 30),
          content: `ISV ${e}:${y}`,
          // type: 'custom',
          className: 'ISV',
          group: 'ISV',
        });
      }
    }

    return datas;
  }

  _getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  timeChanged = e => {
    const newCurrentTime = e;
    console.log(`CurrentCustomTimeChanged::::::${newCurrentTime}`);
  }

  handleClick = () => {
    this.setState({
      useSelectTimeRange: true,
    });
  }

  handleTimeRangeExport = ({ startTime, endTime }) => {
    console.log(`${startTime} ~ ${endTime}`);

    this.setState({
      useSelectTimeRange: false,
    });
  }

  render() {
    const {
      render,
    } = this.props;

    return render(
      {
        ...this,
        ...this.props,
        ...this.state,
      },
    );
  }
}

TimelineExamplePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TimelineExamplePageContainer;
// export default connect(
//   state => ({
//     currentLanguage: state.langModule.get('currentLanguage'),
//     lang: state.langModule.get('lang'),
//   }),
// )(TimelineExamplePageContainer);

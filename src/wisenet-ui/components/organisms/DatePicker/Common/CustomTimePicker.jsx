import React from 'react';
import PropTypes from 'prop-types';
import { withContainer } from 'wisenet-ui/util/hoc';
import { TimePickerContainer } from 'containers/organisms';
import {
  Container,
  Stepper,
  StepperDownButton,
  Divider,
  StepperInput,
  StepperUpButton,
} from './TimePickerStyled';

class CustomTimePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentHour: 0,
      currentMinute: 0,
      currentSecond: 0,
    };
    this.onTyped = this.onTyped.bind(this);
    this.onClickUpHour = this.onClickUpHour.bind(this);
    this.onClickUpMinute = this.onClickUpMinute.bind(this);
    this.onClickUpSecond = this.onClickUpSecond.bind(this);
    this.onClickDownHour = this.onClickDownHour.bind(this);
    this.onClickDownMinute = this.onClickDownMinute.bind(this);
    this.onClickDownSecond = this.onClickDownSecond.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus = (e, target) => {
    document.getElementById('hStepUp1').style.visibility = 'hidden';
    document.getElementById('hStepDown1').style.visibility = 'hidden';
    document.getElementById('hStepUp2').style.visibility = 'hidden';
    document.getElementById('hStepDown2').style.visibility = 'hidden';
    document.getElementById('mStepUp1').style.visibility = 'hidden';
    document.getElementById('mStepDown1').style.visibility = 'hidden';
    document.getElementById('mStepUp2').style.visibility = 'hidden';
    document.getElementById('mStepDown2').style.visibility = 'hidden';
    document.getElementById('sStepUp1').style.visibility = 'hidden';
    document.getElementById('sStepDown1').style.visibility = 'hidden';
    document.getElementById('sStepUp2').style.visibility = 'hidden';
    document.getElementById('sStepDown2').style.visibility = 'hidden';

    const targetUp = target.split('_').join('Up');
    const targetDown = target.split('_').join('Down');
    document.getElementById(targetUp).style.visibility = 'visible';
    document.getElementById(targetDown).style.visibility = 'visible';
  }

  onTyped = (e, target) => {
    if (e.target.value === '') return;
    const { value } = e.target;
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchHour = `${currentHour}`;
    let searchMinute = `${currentMinute}`;
    let searchSecond = `${currentSecond}`;

    searchHour = searchHour.length === 1 ? `0${searchHour}` : searchHour;
    searchMinute = searchMinute.length === 1 ? `0${searchMinute}` : searchMinute;
    searchSecond = searchSecond.length === 1 ? `0${searchSecond}` : searchSecond;

    const [hour1, hour2] = searchHour;
    const [minute1, minute2] = searchMinute;
    const [second1, second2] = searchSecond;

    if (target === 'hStep_1') {
      if (Number(value) > 2) {
        e.target.value = hour1;
      } else {
        const hourText = `${value}${hour2}`;
        if (Number(hourText) >= 24) {
          e.target.value = hour1;
        } else {
          onTimeChange({
            hour: Number(hourText),
            minute: currentMinute,
            second: currentSecond,
          });
          this.setState({
            currentHour: Number(hourText),
          });
        }
      }
    } else if (target === 'hStep_2') {
      const hourText = `${hour1}${value}`;
      if (Number(hourText) >= 24) {
        e.target.value = hour2;
      } else {
        onTimeChange({
          hour: Number(hourText),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(hourText),
        });
      }
    } else if (target === 'mStep_1') {
      if (Number(value) > 5) {
        e.target.value = minute1;
      } else {
        const minuteText = `${value}${minute2}`;
        if (Number(minuteText) > 59) {
          e.target.value = minute2;
        } else {
          onTimeChange({
            hour: currentHour,
            minute: Number(minuteText),
            second: currentSecond,
          });
          this.setState({
            currentMinute: Number(minuteText),
          });
        }
      }
    } else if (target === 'mStep_2') {
      const minuteText = `${minute1}${value}`;
      if (Number(minuteText) > 59) {
        e.target.value = minute2;
      } else {
        onTimeChange({
          hour: currentHour,
          minute: Number(minuteText),
          second: currentSecond,
        });
        this.setState({
          currentMinute: Number(minuteText),
        });
      }
    } else if (target === 'sStep_1') {
      if (Number(value) > 5) {
        e.target.value = second1;
      } else {
        const secondText = `${value}${second2}`;
        if (Number(secondText) > 59) {
          e.target.value = second1;
        } else {
          onTimeChange({
            hour: currentHour,
            minute: currentMinute,
            second: Number(secondText),
          });
          this.setState({
            currentSecond: Number(secondText),
          });
        }
      }
    } else if (target === 'sStep_2') {
      const secondText = `${second1}${value}`;
      if (Number(secondText) > 59) {
        e.target.value = second2;
      } else {
        onTimeChange({
          hour: currentHour,
          minute: currentMinute,
          second: Number(secondText),
        });
        this.setState({
          currentSecond: Number(secondText),
        });
      }
    }
  }

  onBlur = (e, target) => {
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchHour = `${currentHour}`;
    let searchMinute = `${currentMinute}`;
    let searchSecond = `${currentSecond}`;

    searchHour = searchHour.length === 1 ? `0${searchHour}` : searchHour;
    searchMinute = searchMinute.length === 1 ? `0${searchMinute}` : searchMinute;
    searchSecond = searchSecond.length === 1 ? `0${searchSecond}` : searchSecond;

    const [hour1, hour2] = searchHour;
    const [minute1, minute2] = searchMinute;
    const [second1, second2] = searchSecond;

    if (e.target.value === '') {
      if (target === 'hStep_1') {
        e.target.value = hour1;
      } else if (target === 'hStep_2') {
        e.target.value = hour2;
      } else if (target === 'mStep_1') {
        e.target.value = minute1;
      } else if (target === 'mStep_2') {
        e.target.value = minute2;
      } else if (target === 'sStep_1') {
        e.target.value = second1;
      } else if (target === 'sStep_2') {
        e.target.value = second2;
      }
    }
  }

  onClickUpHour = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchHour = `${currentHour}`;
    searchHour = searchHour.length === 1 ? `0${searchHour}` : searchHour;
    const [hour1, hour2] = searchHour;
    let newHour = '';

    if (flag === 'hour1') {
      newHour = `${Number(hour1) + 1}${hour2}`;
      if (Number(newHour) >= 24) {
        newHour = `0${hour2}`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      } else {
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      }
      document.getElementById('hInput1').focus();
    } else {
      newHour = `${hour1}${Number(hour2) + 1}`;
      if (Number(newHour) >= 24) {
        newHour = `${hour1}0`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      } else {
        newHour = `${hour1}${Number(hour2) + 1}`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      }
      document.getElementById('hInput2').focus();
    }
  }

  onClickDownHour = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchHour = `${currentHour}`;
    searchHour = searchHour.length === 1 ? `0${searchHour}` : searchHour;
    const [hour1, hour2] = searchHour;
    let newHour = '';

    if (flag === 'hour1') {
      if (Number(hour1) - 1 < 0) {
        newHour = `2${hour2}`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      } else {
        newHour = `${Number(hour1) - 1}${hour2}`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      }
      document.getElementById('hInput1').focus();
    } else if (Number(hour2) - 1 < 0) {
      if (Number(hour1) === 2) {
        newHour = `${hour1}3`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      } else {
        newHour = `${hour1}9`;
        onTimeChange({
          hour: Number(newHour),
          minute: currentMinute,
          second: currentSecond,
        });
        this.setState({
          currentHour: Number(newHour),
        });
      }
      document.getElementById('hInput2').focus();
    } else {
      newHour = `${hour1}${Number(hour2 - 1)}`;
      onTimeChange({
        hour: Number(newHour),
        minute: currentMinute,
        second: currentSecond,
      });
      this.setState({
        currentHour: Number(newHour),
      });
      document.getElementById('hInput2').focus();
    }
  }

  onClickUpMinute = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchMinute = `${currentMinute}`;
    searchMinute = searchMinute.length === 1 ? `0${searchMinute}` : searchMinute;
    const [minute1, minute2] = searchMinute;
    let newMinute = '';

    if (flag === 'minute1') {
      if (Number(minute1) + 1 > 5) {
        newMinute = `0${minute2}`;
        onTimeChange({
          hour: currentHour,
          minute: Number(newMinute),
          second: currentSecond,
        });
        this.setState({
          currentMinute: Number(newMinute),
        });
      } else {
        newMinute = `${Number(minute1) + 1}${minute2}`;
        onTimeChange({
          hour: currentHour,
          minute: Number(newMinute),
          second: currentSecond,
        });
        this.setState({
          currentMinute: Number(newMinute),
        });
      }
      document.getElementById('mInput1').focus();
    } else if (Number(minute2) + 1 > 9) {
      newMinute = `${minute1}0`;
      onTimeChange({
        hour: currentHour,
        minute: Number(newMinute),
        second: currentSecond,
      });
      this.setState({
        currentMinute: Number(newMinute),
      });
      document.getElementById('mInput2').focus();
    } else {
      newMinute = `${minute1}${Number(minute2) + 1}`;
      onTimeChange({
        hour: currentHour,
        minute: Number(newMinute),
        second: currentSecond,
      });
      this.setState({
        currentMinute: Number(newMinute),
      });
      document.getElementById('mInput2').focus();
    }
  }

  onClickDownMinute = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchMinute = `${currentMinute}`;
    searchMinute = searchMinute.length === 1 ? `0${searchMinute}` : searchMinute;
    const [minute1, minute2] = searchMinute;
    let newMinute = '';

    if (flag === 'minute1') {
      if (Number(minute1) - 1 < 0) {
        newMinute = `5${minute2}`;
        onTimeChange({
          hour: currentHour,
          minute: Number(newMinute),
          second: currentSecond,
        });
        this.setState({
          currentMinute: Number(newMinute),
        });
      } else {
        newMinute = `${Number(minute1) - 1}${minute2}`;
        onTimeChange({
          hour: currentHour,
          minute: Number(newMinute),
          second: currentSecond,
        });
        this.setState({
          currentMinute: Number(newMinute),
        });
      }
      document.getElementById('mInput1').focus();
    } else if (Number(minute2) - 1 < 0) {
      newMinute = `${minute1}9`;
      onTimeChange({
        hour: currentHour,
        minute: Number(newMinute),
        second: currentSecond,
      });
      this.setState({
        currentMinute: Number(newMinute),
      });
      document.getElementById('mInput2').focus();
    } else {
      newMinute = `${minute1}${Number(minute2) - 1}`;
      onTimeChange({
        hour: currentHour,
        minute: Number(newMinute),
        second: currentSecond,
      });
      this.setState({
        currentMinute: Number(newMinute),
      });
      document.getElementById('mInput2').focus();
    }
  }

  onClickUpSecond = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchSecond = `${currentSecond}`;
    searchSecond = searchSecond.length === 1 ? `0${searchSecond}` : searchSecond;
    const [second1, second2] = searchSecond;
    let newSecond = '';

    if (flag === 'second1') {
      if (Number(second1) + 1 > 5) {
        newSecond = `0${second2}`;
        onTimeChange({
          hour: currentHour,
          minute: currentMinute,
          second: Number(newSecond),
        });
        this.setState({
          currentSecond: Number(newSecond),
        });
      } else {
        newSecond = `${Number(second1) + 1}${second2}`;
        onTimeChange({
          hour: currentHour,
          minute: currentMinute,
          second: Number(newSecond),
        });
        this.setState({
          currentSecond: Number(newSecond),
        });
      }
      document.getElementById('sInput1').focus();
    } else if (Number(second2) + 1 > 9) {
      newSecond = `${second1}0`;
      onTimeChange({
        hour: currentHour,
        minute: currentMinute,
        second: Number(newSecond),
      });
      this.setState({
        currentSecond: Number(newSecond),
      });
      document.getElementById('sInput2').focus();
    } else {
      newSecond = `${second1}${Number(second2) + 1}`;
      onTimeChange({
        hour: currentHour,
        minute: currentMinute,
        second: Number(newSecond),
      });
      this.setState({
        currentSecond: Number(newSecond),
      });
      document.getElementById('sInput2').focus();
    }
  }

  onClickDownSecond = flag => {
    const { onTimeChange } = this.props;
    const { currentHour, currentMinute, currentSecond } = this.state;
    let searchSecond = `${currentSecond}`;
    searchSecond = searchSecond.length === 1 ? `0${searchSecond}` : searchSecond;
    const [second1, second2] = searchSecond;
    let newSecond = '';

    if (flag === 'second1') {
      if (Number(second1) - 1 < 0) {
        newSecond = `5${second2}`;
        onTimeChange({
          hour: currentHour,
          minute: currentMinute,
          second: Number(newSecond),
        });
        this.setState({
          currentSecond: Number(newSecond),
        });
      } else {
        newSecond = `${Number(second1) - 1}${second2}`;
        onTimeChange({
          hour: currentHour,
          minute: currentMinute,
          second: Number(newSecond),
        });
        this.setState({
          currentSecond: Number(newSecond),
        });
      }
      document.getElementById('sInput1').focus();
    } else if (Number(second2) - 1 < 0) {
      newSecond = `${second1}9`;
      onTimeChange({
        hour: currentHour,
        minute: currentMinute,
        second: Number(newSecond),
      });
      this.setState({
        currentSecond: Number(newSecond),
      });
      document.getElementById('sInput2').focus();
    } else {
      newSecond = `${second1}${Number(second2) - 1}`;
      onTimeChange({
        hour: currentHour,
        minute: currentMinute,
        second: Number(newSecond),
      });
      this.setState({
        currentSecond: Number(newSecond),
      });
      document.getElementById('sInput2').focus();
    }
  }

  render() {
    const {
      currentHour,
      currentMinute,
      currentSecond,
    } = this.state;

    let searchHour = currentHour.toString();
    let searchMinute = currentMinute.toString();
    let searchSecond = currentSecond.toString();

    searchHour = searchHour.length === 1 ? `0${searchHour}` : searchHour;
    searchMinute = searchMinute.length === 1 ? `0${searchMinute}` : searchMinute;
    searchSecond = searchSecond.length === 1 ? `0${searchSecond}` : searchSecond;

    return (
      <Container>
        <Stepper>
          <StepperUpButton id="hStepUp1" onClick={() => this.onClickUpHour('hour1')}>{'>'}</StepperUpButton>
          <StepperInput
            id="hInput1"
            onFocus={e => this.onFocus(e, 'hStep_1')}
            onBlur={e => this.onBlur(e, 'hStep_1')}
            onChange={e => this.onTyped(e, 'hStep_1')}
            type="text"
            value={searchHour[0]}
            maxLength="1"
          />
          <StepperDownButton id="hStepDown1" onClick={() => this.onClickDownHour('hour1')}>{'>'}</StepperDownButton>
        </Stepper>
        <Stepper>
          <StepperUpButton id="hStepUp2" onClick={() => this.onClickUpHour('hour2')}>{'>'}</StepperUpButton>
          <StepperInput
            id="hInput2"
            onFocus={e => this.onFocus(e, 'hStep_2')}
            onBlur={e => this.onBlur(e, 'hStep_2')}
            onChange={e => this.onTyped(e, 'hStep_2')}
            type="text"
            value={searchHour[1]}
            maxLength="1"
          />
          <StepperDownButton id="hStepDown2" onClick={() => this.onClickDownHour('hour2')}>{'>'}</StepperDownButton>
        </Stepper>
        <Divider>:</Divider>
        <Stepper>
          <StepperUpButton id="mStepUp1" onClick={() => this.onClickUpMinute('minute1')}>{'>'}</StepperUpButton>
          <StepperInput
            id="mInput1"
            onFocus={e => this.onFocus(e, 'mStep_1')}
            onBlur={e => this.onBlur(e, 'mStep_1')}
            onChange={e => this.onTyped(e, 'mStep_1')}
            type="text"
            value={searchMinute[0]}
            maxLength="1"
          />
          <StepperDownButton id="mStepDown1" onClick={() => this.onClickDownMinute('minute1')}>{'>'}</StepperDownButton>
        </Stepper>
        <Stepper>
          <StepperUpButton id="mStepUp2" onClick={() => this.onClickUpMinute('minute2')}>{'>'}</StepperUpButton>
          <StepperInput
            id="mInput2"
            onFocus={e => this.onFocus(e, 'mStep_2')}
            onBlur={e => this.onBlur(e, 'mStep_2')}
            onChange={e => this.onTyped(e, 'mStep_2')}
            type="text"
            value={searchMinute[1]}
            maxLength="1"
          />
          <StepperDownButton id="mStepDown2" onClick={() => this.onClickDownMinute('minute2')}>{'>'}</StepperDownButton>
        </Stepper>
        <Divider>:</Divider>
        <Stepper>
          <StepperUpButton id="sStepUp1" onClick={() => this.onClickUpSecond('second1')}>{'>'}</StepperUpButton>
          <StepperInput
            id="sInput1"
            onFocus={e => this.onFocus(e, 'sStep_1')}
            onBlur={e => this.onBlur(e, 'sStep_1')}
            onChange={e => this.onTyped(e, 'sStep_1')}
            type="text"
            value={searchSecond[0]}
            maxLength="1"
          />
          <StepperDownButton id="sStepDown1" onClick={() => this.onClickDownSecond('second1')}>{'>'}</StepperDownButton>
        </Stepper>
        <Stepper>
          <StepperUpButton id="sStepUp2" onClick={() => this.onClickUpSecond('second2')}>{'>'}</StepperUpButton>
          <StepperInput
            id="sInput2"
            onFocus={e => this.onFocus(e, 'sStep_2')}
            onBlur={e => this.onBlur(e, 'sStep_2')}
            onChange={e => this.onTyped(e, 'sStep_2')}
            type="text"
            value={searchSecond[1]}
            maxLength="1"
          />
          <StepperDownButton id="sStepDown2" onClick={() => this.onClickDownSecond('second2')}>{'>'}</StepperDownButton>
        </Stepper>
      </Container>
    );
  }
}

CustomTimePicker.propTypes = {
  onTimeChange: PropTypes.func,
};

CustomTimePicker.defaultProps = {
  onTimeChange: () => {},
};

export default withContainer(TimePickerContainer, CustomTimePicker);

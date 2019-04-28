import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'wisenet-ui/components/atoms';
import { LoginForm } from 'wisenet-ui/components/organisms';

// class TestComponent1 extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('!!! test component 1 constructor');
//   }

//   componentDidMount() {
//     console.log('!!! test component 1 componentDidMount');
//   }

//   shouldComponentUpdate() {
//     console.log('!!! test component 1 shouldComponentUpdate');
//     return true;
//   }

//   componentDidUpdate() {
//     console.log('!!! test component 1 componentDidUpdate');
//   }

//   componentWillUnmount() {
//     console.log('!!! test component 1 componentWillUnmount');
//   }

//   getDerivedStateFromProps() {
//     console.log('!!! test component 1 getDerivedStateFromProps');
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log('!!! test component 1 getSnapshotBeforeUpdate');
//   }

//   render() {
//     console.log('!!! test component 1 render');
//     const { onClick,  buttonClickNum} = this.props;
//     return (
//       <Button onClick={onClick}>
//         {buttonClickNum}
//       </Button>
//     );
//   }
// }

// class TestComponent2 extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('!!! test component 2 constructor');
//   }

//   componentDidMount() {
//     console.log('!!! test component 2 componentDidMount');
//   }

//   shouldComponentUpdate() {
//     console.log('!!! test component 2 shouldComponentUpdate');
//     return true;
//   }

//   componentDidUpdate() {
//     console.log('!!! test component 2 componentDidUpdate');
//   }

//   componentWillUnmount() {
//     console.log('!!! test component 2 componentWillUnmount');
//   }

//   getDerivedStateFromProps() {
//     console.log('!!! test component 2 getDerivedStateFromProps');
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log('!!! test component 2 getSnapshotBeforeUpdate');
//   }
//   render() {
//     console.log('!!! test component 2 render');
//     const { onClick,  buttonClickNum} = this.props;
//     return (
//       <Button onClick={onClick}>
//         {buttonClickNum}
//       </Button>
//     );
//   }
// }

// class TestComponent3 extends React.Component {
//   state = {
//     buttonClickNum: 0,
//   }

//   constructor(props) {
//     super(props);
//     console.log('!!! test component 3 constructor');
//   }

//   componentDidMount() {
//     console.log('!!! test component 3 componentDidMount');
//   }

//   shouldComponentUpdate() {
//     console.log('!!! test component 3 shouldComponentUpdate');
//     return true;
//   }

//   componentDidUpdate() {
//     console.log('!!! test component 3 componentDidUpdate');
//   }

//   componentWillUnmount() {
//     console.log('!!! test component 3 componentWillUnmount');
//   }

//   getDerivedStateFromProps() {
//     console.log('!!! test component 3 getDerivedStateFromProps');
//   }

//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log('!!! test component 3 getSnapshotBeforeUpdate');
//   }

//   handleButtonClick = () => {
//     const { buttonClickNum } = this.state;
//     this.setState({
//       buttonClickNum: buttonClickNum + 1,
//     });
//   }

//   render() {
//     console.log('!!! test component 3 render');
//     const { buttonClickNum } = this.state;
//     return (
//       <Button onClick={this.handleButtonClick}>
//         {buttonClickNum}
//       </Button>
//     );
//   }
// }

class TabExamplePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClickNum: 0,
      // buttonClickNum1: 0,
      // buttonClickNum2: 0,
      submitResult: null,
    };
  }

  handleSubmit = () => {
    this.setState({
      submitResult: 'Try login...',
    });
  };

  handleButtonClick = () => {
    const { buttonClickNum } = this.state;
    this.setState({
      buttonClickNum: buttonClickNum + 1,
    });
  };

  // handleButtonClick1 = () => {
  //   const { buttonClickNum1 } = this.state;
  //   this.setState({
  //     buttonClickNum1: buttonClickNum1 + 1,
  //   });
  // };

  // handleButtonClick2 = () => {
  //   const { buttonClickNum2 } = this.state;
  //   this.setState({
  //     buttonClickNum2: buttonClickNum2 + 1,
  //   });
  // };

  makeTabData1 = () => {
    const { buttonClickNum, submitResult } = this.state;
    return [
      {
        key: 'tab_login',
        header: 'Login',
        component: (
          <React.Fragment>
            <LoginForm onSubmit={this.handleSubmit} />
            {submitResult && submitResult}
          </React.Fragment>
        ),
      },
      {
        key: 'tab_select',
        header: 'Select',
        component: (
          <React.Fragment>
            <select>
              <option value="hide">-- default-ui --</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </select>
          </React.Fragment>
        ),
      },
      {
        key: 'tab_button',
        header: 'Button',
        component: (
          <Button onClick={this.handleButtonClick}>
            {buttonClickNum}
          </Button>
        ),
      },
    ];
    // const { buttonClickNum1, buttonClickNum2  ,submitResult } = this.state;
    // return [
    //   {
    //     key: 'tab_login',
    //     header: 'Login',
    //     component: (
    //       <TestComponent1 buttonClickNum={buttonClickNum1} onClick={this.handleButtonClick1} />
    //     ),
    //   },
    //   {
    //     key: 'tab_select',
    //     header: 'Select',
    //     component: (
    //       <TestComponent2 buttonClickNum={buttonClickNum2} onClick={this.handleButtonClick2} />
    //     ),
    //   },
    //   {
    //     key: 'tab_button',
    //     header: 'Button',
    //     component: (
    //       <TestComponent3 />
    //     ),
    //   },
    // ];
  }

  makeTabData2 = () => {
    const iconStyle = { fontSize: '30px', marginBottom: '5px' };
    return [
      {
        key: 'tab_list',
        header: <i className="tui tui-basicsetup" style={iconStyle} />,
        component: 'List tab',
      },
      {
        key: 'tab_event',
        header: <i className="tui tui-menu-event" style={iconStyle} />,
        component: 'Event tab',
      },
      {
        key: 'tab_ptz',
        header: <i className="tui tui-wn5-toolbar-ptz" style={iconStyle} />,
        component: 'PTZ tab',
      },
    ];
  }

  makeTabData3 = () => {
    const iconStyle = { fontSize: '30px', marginBottom: '5px' };
    return [
      {
        key: 'tab_multi_0',
        header: <i className="tui tui-basicsetup" style={iconStyle} />,
        component: 'List tab',
      },
      {
        key: 'tab_multi_1',
        header: <i className="tui tui-menu-event" style={iconStyle} />,
        component: 'Event tab',
      },
      {
        key: 'tab_multi_2',
        header: <i className="tui tui-wn5-toolbar-ptz" style={iconStyle} />,
        component: 'PTZ tab',
      },
      {
        key: 'tab_multi_3',
        header: <i className="tui tui-edit" style={iconStyle} />,
        component: 'Edit tab',
      },
      {
        key: 'tab_multi_4',
        header: <i className="tui tui-go_home" style={iconStyle} />,
        component: 'Home tab',
      },
      {
        key: 'tab_multi_5',
        header: <i className="tui tui-delete" style={iconStyle} />,
        component: 'Delete tab',
      },
      {
        key: 'tab_multi_6',
        header: <i className="tui tui-ch-live-layout" style={iconStyle} />,
        component: 'Live tab',
      },
      {
        key: 'tab_multi_7',
        header: <i className="tui tui-wn5-help" style={iconStyle} />,
        component: 'Help tab',
      },
      {
        key: 'tab_multi_8',
        header: <i className="tui tui-speaker" style={iconStyle} />,
        component: 'Speaker Tab',
      },
    ];
  }

  makeTabData4 = () => (
    [
      {
        key: 'tab_list61',
        header: 'SSDR',
        component: 'SSDR Tab',
      },
      {
        key: 'tab_list62',
        header: 'White balance',
        component: 'White balance Tab',
      },
      {
        key: 'tab_list63',
        header: 'Backlight',
        component: 'Backlight Tab',
      },
      {
        key: 'tab_list64',
        header: 'Exposure',
        component: 'Exposure Tab',
      },
      {
        key: 'tab_list65',
        header: 'Day/Night',
        component: 'Day/Night Tab',
      },
      {
        key: 'tab_list66',
        header: 'Special',
        component: 'Special Tab',
      },
      {
        key: 'tab_list67',
        header: 'OSD',
        component: 'OSD Tab',
      },
      {
        key: 'tab_list68',
        header: 'Heater',
        component: 'Heater Tab',
      },
    ]
  )

  render() {
    const { render } = this.props;
    const tabData1 = this.makeTabData1();
    const tabData2 = this.makeTabData2();
    const tabData3 = this.makeTabData3();
    const tabData4 = this.makeTabData4();
    return render({
      tabData1,
      tabData2,
      tabData3,
      tabData4,
    });
  }
}

TabExamplePageContainer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default TabExamplePageContainer;

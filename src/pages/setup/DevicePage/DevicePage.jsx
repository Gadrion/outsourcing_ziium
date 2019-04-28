import React from 'react';
import { withContainer } from 'wisenet-ui/util/hoc';
import { DevicePageContainer } from 'containers/pages';

import { List } from 'wisenet-ui/components/molecules';

const childrenSample = (
  <div>
    <p>test</p>
  </div>
);

const sample = [{
  name: 'camera1',
  icon: 'tui tui-ch-live-chlist',
  id: '1',
  enable: '',
  deviceType: '',
  deviceName: '',
  additional: childrenSample,
}, {
  name: 'camera2',
  icon: 'tui tui-disconnect',
  id: '2',
  enable: '',
  deviceType: '',
  deviceName: '',
}, {
  name: 'camera3',
  icon: '',
  id: '3',
  enable: '',
  deviceType: '',
  deviceName: '',
}];

class DevicePage extends React.PureComponent {
  componentDidMount() {
    console.log('!!!');
  }

  handleClickEvent = e => {
    console.log('handleClickEvent', e);
  }

  render() {
    const dataList = sample.map(item => (
      <div>
        <i className={`${item.icon}`} />
        {item.name}
      </div>
    ));


    return (
      <List data={dataList} handleClick={this.handleClickEvent} />
    );
  }
}


export default withContainer(DevicePageContainer, DevicePage);

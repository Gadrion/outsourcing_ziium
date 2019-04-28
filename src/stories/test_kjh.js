import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ListItems } from  'components/molecules';

class ListTest extends React.Component {

  render() {    
  const inputs = 
    {
      selectBox: 'checkbox',
      data: [{
        name:'camera1',
        icon: '',
        enable: '',
        deviceType:'',
        deviceName:'',        
      },{
        name:'camera2',
        icon: '',
        enable: '',
        deviceType:'',
        deviceName:'',        
      },{
        name:'camera3',
        icon: '',
        enable: '',
        deviceType:'',
        deviceName:'',        
      }],
    }
  

    return (
      <div>
        <ListItems
        {...inputs}
      />
      </div>
    );
  }
}


storiesOf('KJH', module).add('Test', () =>
 <ListTest />);
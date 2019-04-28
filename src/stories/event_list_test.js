import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import { EventTabWrapper } from 'components/organisms';
import { Tree } from 'wisenet-ui/components/organisms';


const treeData = [
  {
    name: 'All',
    id: 0,
    toggled: true,
    checked: false,
    children: [
      {
        name: 'Motion detection',
        id: 1,
        children: [],
        checked: false,
      },
      {
        name: 'IVA',
        id: 2,
        toggled: true,
        checked: false,
        children: [
          {
            name: 'Passing',
            children: [],
            id: 6,
            checked: false,
          },
          {
            name: 'Loitering',
            children: [],
            id: 7,
            checked: false,
          },
          {
            name: 'Entering',
            children: [],
            id: 8,
            checked: false,
          },
          {
            name: 'Exiting',
            children: [],
            id: 9,
            checked: false,
          },
          {
            name: 'Apperaing',
            children: [],
            id: 10,
            checked: false,
          },
          {
            name: 'Disappearing',
            children: [],
            id: 11,
            checked: false,
          },
        ],
      },
      {
        name: 'Auto Tracking',
        children: [],
        id: 3,
        checked: false,
      },
      {
        name: 'Defoucs Detection',
        children: [],
        id: 4,
        checked: false,
      },
      {
        name: 'Fog Detection',
        children: [],
        id: 5,
        checked: false,
      },
    ],
  },
];

const icons = {};

// let EventList = class extends Component {
//   render() {
//     return (     
//       <EventTabWrapper />
//     );
//   }  
// }

// const handleTreeClick = (event, node) => {
//   if (node) {
//     this.handleSelect(node);
//   } else {
//     // this.props.SiteActions.changeControlType({
//     //   controlType: SiteControlType.none,
//     //   selectType: SiteSelectType.none
//     // });
//   }
// }

// storiesOf('Event List Test', module)
//   .add('export', () => (<EventList />));

storiesOf('Tree Test', module)
.add('tree', () => (<Tree
  treeData={treeData}
  icons={icons}
  needCheckbox
  extendTree
  // handleNodeClick={handleTreeClick}
/>));

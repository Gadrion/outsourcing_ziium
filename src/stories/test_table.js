import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Table } from 'wisenet-ui/components/organisms';

import classnames from 'classnames/bind';
import styles from './test_table.scss';

const cx = classnames.bind(styles);

const icons = {};

const columns = [
  {
    title: 'Event Type',
    render: (value, row, index) => row.eventType,
    className: cx('table-column'),
    headerClassName: cx('table-header')
  },
  {
    title: 'Affected Devices',
    render: (value, row, index) => row.affectedDevices,
    headerClassName: cx('table-header')
  },
  {
    title: 'Detections',
    render: (value, row, index) => row.detections,
    headerClassName: cx('table-header')
  },
];

const data = [
  {
    id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634,
  },
  {
    id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634,
  },
  {
    id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598,
  },
  {
    id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598,
  },
  {
    id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497,
  },
  {
    id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0,
  },
];

let TableTest = class extends Component {
  render() {
    const rowClass = (index) => {
      return cx('table-row')
    }

    return (
      <div>
        <div>
          <h5>TableTest</h5>
            <Table
              bordered={true}
              hoverable={false}
              justified={true}
              rowKey={record => record.id}
              columns={columns}
              data={data}
              />
        </div>
      </div>
    );
  }  
}


storiesOf('Table Test', module)
  .add('export', () => (<TableTest />));

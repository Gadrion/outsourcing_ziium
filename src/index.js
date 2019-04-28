import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import './util/static/font-icon/icons.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import '../node_modules/fullcalendar/dist/fullcalendar.min.css';
import './util/static/font/font.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Root from './Root';

const initAxios = () => {
  const baseURL = process.env.NODE_ENV !== 'production' ? 'http://192.168.123.232' : '';
  axios.defaults.baseURL = baseURL;
};

initAxios();

ReactDOM.render(<Root />, document.getElementById('root'));

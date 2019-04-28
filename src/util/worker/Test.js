// import XMLParser from 'util/lib/XMLParser';
import { DigestHttp, SessionStorageData } from 'util/worker/lib';

import axios from 'axios';
import setupMenu from 'util/static/constants/setupMenu.js';

self.onmessage = ({ data: action }) => {
  // const XMLParser = require('util/lib/XMLParser');
  console.log('action', action);
  console.log('DigestHttp', DigestHttp);
  console.log('SessionStorageDataasdasdasdsad', SessionStorageData);

  DigestHttp.init({...action.meta});

  DigestHttp.get({
    url: '/stw-cgi/media.cgi?msubmenu=cameraregister&action=view'
  }).then(response => console.log('response', response))
  .catch(error => console.log('error', error));

  self.postMessage({
    type: action.type,
    payload: action.payload,
  });
};
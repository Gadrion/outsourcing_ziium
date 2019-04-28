import {
  call,
  spawn,
} from 'redux-saga/effects';

export const delay = ms => new Promise(res => setTimeout(res, ms));

// imports all file except index.js
const req = require.context('.', true, /^(?!.\/saga)/);

const sagas = [];

req.keys().forEach(key => {
  if (req(key).default) {
    if (!sagas.find(saga => saga === req(key).default)) {
      sagas.push(req(key).default);
    }
  }
});

const makeRestartable = saga => (
  function* makeRestartableFunc() {
    yield spawn(function* spawnFunc() {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Workaround to avoid infinite error loops
      }
    });
  }
);

const rootSagas = [...sagas].map(makeRestartable);

export default function* root() {
  yield rootSagas.map(saga => call(saga));
}

import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/saga';
import reducers from './modules';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configure = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    composeEnhancer(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configure;

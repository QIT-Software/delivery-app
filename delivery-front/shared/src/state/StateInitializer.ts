import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore,
  Reducer,
  Store,
} from 'redux';
import createSagaMiddleware, {Saga} from 'redux-saga';
import {State} from 'state/entities/State';

export const sharedStore: {store: Store<State> | undefined} = {store: undefined};

const createStore = <T extends State>(reducer: Reducer<T>, saga: Saga) => {
  if (sharedStore.store) throw Error('Already initialized');

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = reduxCreateStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(saga);

  sharedStore.store = store;

  return store;
};

export default {
  createStore,
};

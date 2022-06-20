import {State} from 'state/shared/entities/State';
import StateInitializer from 'state/shared/StateInitializer';
import {rootReducer, rootSaga} from './ducks';
import {Store} from 'redux';

export const clientStore: {store: Store<State> | undefined} = {store: undefined};

export default {
  initStore: () => {
    const store = StateInitializer.createStore(rootReducer, rootSaga);
    clientStore.store = store;
    return store;
  },
};

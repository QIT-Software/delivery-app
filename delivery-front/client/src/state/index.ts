import {clientStore} from './StateInitializer';
import {Store} from 'redux';

export const getStore = () => {
  const storeInstance = clientStore.store;

  if (!storeInstance) {
    throw new Error('You should call initStore from StateInitializer firstly');
  }

  const store: Store = storeInstance;

  return store;
};

export const getDispatch = () => {
  const {dispatch} = getStore();

  return dispatch;
};

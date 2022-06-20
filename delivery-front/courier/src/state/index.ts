import {courierStore} from './StateInitializer';
import {Store} from 'redux';

export const getStore = () => {
  const storeInstance = courierStore.store;

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

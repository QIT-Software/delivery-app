import {handleActions, ReducerNextThrow} from 'redux-actions';
import {
  empty,
  failed,
  LoadableContainer,
  loading,
  success,
} from 'state/entities/LoadableContainer';
import types from './types';
import Order from 'entities/Order';

type ReducerState = LoadableContainer<{cartOrders: Order[]}>;

const ordersDataIsFetched: ReducerNextThrow<ReducerState, Order[]> = {
  next: (_, {payload}) => success({cartOrders: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_ORDERS_BY_CART_ID]: (state) => loading(state),
    [types.FETCH_ORDERS_BY_CART_ID_COMPLETED]: ordersDataIsFetched,
  },
  empty(),
);

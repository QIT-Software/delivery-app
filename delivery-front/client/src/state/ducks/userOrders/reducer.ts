import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  failed,
  LoadableContainer,
  loading,
  success,
  empty,
} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';

type ReducerState = LoadableContainer<{userOrders: Order[]}>;

const userOrdersFetched: ReducerNextThrow<ReducerState, Order[]> = {
  next: (_, {payload}) => success({userOrders: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_USER_ORDERS]: (state) => loading(state),
    [types.FETCH_USER_ORDERS_COMPLETE]: userOrdersFetched,
  },
  empty(),
);

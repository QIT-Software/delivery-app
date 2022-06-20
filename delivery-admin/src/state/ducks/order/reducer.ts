import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import OrdersContainer from 'state/entities/OrdersContainer';
import Order from 'entities/Order';

type ReducerState = LoadableContainer<OrdersContainer>;

const fetchOrderCompleted: ReducerNextThrow<ReducerState, Order[]> = {
  next: (_, {payload}) => success({orders: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_ORDERS]: (state) => ({...state, isBusy: true}),
    [types.FETCH_ORDERS_COMPLETED]: fetchOrderCompleted,
  },
  empty(),
);

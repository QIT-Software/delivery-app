import {handleActions, ReducerNextThrow} from 'redux-actions';
import {
  empty,
  failed,
  loading,
  success,
  LoadableContainer,
} from 'state/entities/LoadableContainer';
import types from './types';
import Order from 'entities/Order';

type ReducerState = LoadableContainer<{ordersList: Order[]}>;

const ordersFetched: ReducerNextThrow<ReducerState, {ordersList: Order[]}> = {
  next: (_, {payload}) => success({ordersList: payload.ordersList}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_ORDERS]: (state) => loading(state),
    [types.FETCH_ORDERS_COMPLETED]: ordersFetched,
  },
  empty(),
);

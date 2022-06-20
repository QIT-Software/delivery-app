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

type ReducerState = LoadableContainer<{courierOrdersList: Order[]}>;

const ordersFetched: ReducerNextThrow<ReducerState, {courierOrdersList: Order[]}> = {
  next: (_, {payload}) => success({courierOrdersList: payload.courierOrdersList}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_COURIER_ORDERS]: (state) => loading(state),
    [types.FETCH_COURIER_ORDERS_COMPLETED]: ordersFetched,
  },
  empty(),
);

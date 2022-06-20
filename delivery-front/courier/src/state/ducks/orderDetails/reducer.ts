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

type ReducerState = LoadableContainer<{orderDetails: Order}>;

const orderDetailsFetched: ReducerNextThrow<ReducerState, Order> = {
  next: (_, {payload}) => success({orderDetails: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_ORDER_DETAILS]: (state) => loading(state),
    [types.FETCH_ORDER_DETAILS_COMPLETE]: orderDetailsFetched,
  },
  empty(),
);

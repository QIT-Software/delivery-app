import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import types from './types';
import OrderProgressContainer from 'state/entities/OrderProgress';

type ReducerState = OrderProgressContainer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderProgressFetched: ReducerNextThrow<ReducerState, any> = {
  next: (state, {payload}) => ({...state, order: success(payload)}),
  throw: (state, {payload}) => ({...state, order: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_ORDER]: (state) => ({...state, order: loading(state.order)}),
    [types.ORDER_FETCHED]: orderProgressFetched,
    [types.FETCH_COURIER_LOCATION_COMPLETE]: (state, {payload}) => ({
      ...state,
      courierLocation: payload,
    }),
  },
  {
    order: empty(),
    requestingPayment: false,
    requestingWashingPayment: false,
    courierLocation: undefined,
  },
);

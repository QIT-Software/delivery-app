import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import OrderProgressContainer from 'state/entities/OrderProgress';

type ReducerState = OrderProgressContainer;

const orderProgressFetched: ReducerNextThrow<ReducerState, never> = {
  next: (state, {payload}) => ({...state, order: success(payload)}),
  throw: (state, {payload}) => ({...state, order: failed(payload)}),
};

export default handleActions<ReducerState, never>(
  {
    [types.FETCH_ORDER]: (state) => ({...state, order: loading(state.order)}),
    [types.ORDER_FETCHED]: orderProgressFetched,
    [types.PAY_FOR_WASHING]: (state) => ({...state, requestingWashingPayment: true}),
    [types.PAY_FOR_ORDER]: (state) => ({...state, requestingPayment: true}),
    [types.PAY_FOR_WASHING_COMPLETED]: (state) => ({
      ...state,
      requestingWashingPayment: false,
    }),
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

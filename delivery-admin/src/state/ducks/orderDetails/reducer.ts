import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {OrderDetailsContainer} from 'state/entities/OrderDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/orderDetails/actions';

type ReducerState = OrderDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    order: success(payload.order),
  }),
  throw: (state, {payload}) => ({...state, order: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
  },
  {order: empty()},
);

import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Order from 'entities/Order';
import * as H from 'history';

export type FetchDetailsCompleted = {
  order: Order;
};

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  leaveCourier: createAction<ID>(types.LEAVE_COURIER),
  closeOrder: createAction<{orderId: ID; history: H.History}>(types.CLOSE_ORDER),
};

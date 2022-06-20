import {createAction} from 'redux-actions';
import types from './types';
import Order from 'entities/Order';

export default {
  fetchOrders: createAction(types.FETCH_ORDERS),
  fetchOrdersCompleted: createAction<Order[]>(types.FETCH_ORDERS_COMPLETED),
};

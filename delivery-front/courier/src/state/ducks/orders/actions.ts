import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type OrderDetails = {orderId: string} & NavigationPayload;
export type OrderByCart = {id: string} & NavigationPayload;

export default {
  fetchOrders: createAction<NavigationPayload>(types.FETCH_ORDERS),
  fetchOrdersCompleted: createAction(types.FETCH_ORDERS_COMPLETED),
  orderDetails: createAction<OrderDetails>(types.ORDER_DETAILS),
  ordersByCartId: createAction<OrderByCart>(types.ORDERS_BY_CART_ID),
};

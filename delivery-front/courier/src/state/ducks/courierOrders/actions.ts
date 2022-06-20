import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type OrderDetails = {orderId: string} & NavigationPayload;

export default {
  fetchCourierOrders: createAction<NavigationPayload>(types.FETCH_COURIER_ORDERS),
  fetchCourierOrdersCompleted: createAction(types.FETCH_COURIER_ORDERS_COMPLETED),
};

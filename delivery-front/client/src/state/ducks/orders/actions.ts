import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type OrderByCart = {id: string} & NavigationPayload;

export default {
  fetchOrdersByCartId: createAction<OrderByCart>(types.FETCH_ORDERS_BY_CART_ID),
  fetchOrdersByCartIdCompleted: createAction(types.FETCH_ORDERS_BY_CART_ID_COMPLETED),
};

import {createAction} from 'redux-actions';
import types from './types';
import Cart from 'entities/Cart';
import {NewCart} from 'state/entities/NewCart';
import {NavigationPayload} from 'state/ducks/router/actions';

export type SubmitCartInfoProps = NewCart & NavigationPayload;
export type CartWithOrders = Cart & NavigationPayload;
export type CartById = {id: string} & NavigationPayload;

export default {
  submitCartInfo: createAction<SubmitCartInfoProps>(types.SUBMIT_CART_INFO),
  createCart: createAction<NavigationPayload>(types.CREATE_CART),
  createCartCompleted: createAction<CartWithOrders>(types.CREATE_CART_COMPLETED),
  cart: createAction<CartById>(types.CART),
};

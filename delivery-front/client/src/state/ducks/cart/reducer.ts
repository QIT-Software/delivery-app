import {Action, handleActions} from 'redux-actions';
import types from './types';
import {NewCartContainer} from 'state/entities/NewCart';
import {empty, loading, success} from 'state/shared/entities/LoadableContainer';
import Cart from 'entities/Cart';

type ReducerState = NewCartContainer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.SUBMIT_CART_INFO]: (state, {payload}) => ({...state, newCart: payload}),
    [types.CREATE_CART]: (state) => ({...state, cart: loading(state.cart)}),
    [types.CREATE_CART_COMPLETED]: (state, {payload}: Action<Cart>) => ({
      ...state,
      cart: success(payload),
    }),
  },
  {
    newCart: undefined,
    cart: empty(),
    address: undefined,
    distance: undefined,
  },
);

import {all, takeEvery, put, select, delay} from 'redux-saga/effects';
import types from './types';
import actions, {CartById, CartWithOrders, SubmitCartInfoProps} from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import State from 'state/client/entities/State';
import CreateCartRequest from 'api/entities/CreateCartRequest';
import Cart from 'entities/Cart';
import {alertActions} from 'state/ducks/alert';
import {actions as routerActions} from 'state/client/ducks/router';
import {NavigationPayload} from 'state/ducks/router/actions';
// import {ordersActions} from 'state/client/ducks/orders';

function* submitCartInfo({payload}: Action<SubmitCartInfoProps>) {
  yield put(
    alertActions.showMessage({
      message: 'You really want create this order',
      positiveAction: actions.createCart({history: payload.history}),
      title: 'Warning',
    }),
  );
}

function createCartRequest(state: State): CreateCartRequest {
  const {newCart} = state.newCart;
  if (!newCart) throw new Error('Cart is not set');
  return {
    clientAddress: newCart.clientAddress,
    selectedSetsInfo: newCart.selectedSetsInfo,
  };
}

function* createCart({payload}: Action<NavigationPayload>) {
  try {
    const state: State = yield select((state) => state);
    const cart: Cart = yield SpoonAndForkApi.createCart(createCartRequest(state));
    // yield AnalyticsTracker.trackCartCreatedAction({state: 'New'}, cart);
    yield put(
      actions.createCartCompleted({
        id: cart.id,
        userId: cart.userId,
        history: payload.history,
        status: cart.status,
      }),
    );
    yield delay(3000);
    yield put(routerActions.navigateToOrderSuccess(payload));
  } catch (e) {
    yield put(actions.createCartCompleted(e));
  }
}

function* createCompleted({payload, error}: Action<CartWithOrders>) {
  if (error) {
    yield put(errorActions.handleError(payload));
  }
  // yield put(
  //   ordersActions.fetchOrdersByCartId({id: payload.id, history: payload.history}),
  // );
  // yield put(routerActions.navigateToCartPayment());
}

function* cart({payload}: Action<CartById>) {
  yield put(routerActions.navigateToOrderProgress(payload));
}

export default function* () {
  yield all([
    takeEvery(types.SUBMIT_CART_INFO, submitCartInfo),
    takeEvery(types.CREATE_CART, createCart),
    takeEvery(types.CREATE_CART_COMPLETED, createCompleted),
    takeEvery(types.CART, cart),
  ]);
}

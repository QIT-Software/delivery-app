import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import actions, {OrderByCart} from './actions';
import {SpoonAndForkApi} from 'api/index';
import Order from 'entities/Order';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';

function* fetchOrdersByCartId({payload}: Action<OrderByCart>) {
  try {
    const ordersList: Order[] = yield SpoonAndForkApi.getOrdersByCartId(payload.id);
    yield put(actions.fetchOrdersByCartIdCompleted(ordersList));
  } catch (e) {
    yield put(actions.fetchOrdersByCartIdCompleted(e));
  }
}

function* fetchOrdersByCartIdCompleted({payload, error}: Action<Order[]>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}
//
// function* ordersByCartId({payload}: Action<OrderByCart[]>) {
//   try {
//     const orders = yield SpoonAndForkApi.getOrdersByCartId(payload.id);
//     yield put(actions.ordersByCartIdComplete(orders));
//   } catch (e) {
//     yield put(actions.ordersByCartIdComplete(e));
//   }
// }
//
// function* ordersByCartIdComplete({payload, error}: Action<OrderByCart[]>) {
//   if (error) {
//     yield put(alertActions.showError(payload));
//   }
// }

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_ORDERS_BY_CART_ID, fetchOrdersByCartId),
    takeEvery(types.FETCH_ORDERS_BY_CART_ID_COMPLETED, fetchOrdersByCartIdCompleted),
  ]);
}

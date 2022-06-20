import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import actions, {OrderDetails} from './actions';
import {SpoonAndForkApi} from 'api/index';
import Order from 'entities/Order';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';
import {actions as routerActions} from 'state/restaurant/ducks/router';
import {NavigationPayload} from 'state/restaurant/ducks/router/actions';

function* fetchOrders({payload}: Action<NavigationPayload>) {
  try {
    const ordersList: Order[] = yield SpoonAndForkApi.getOrdersByRestaurantId();
    yield put(actions.fetchOrdersCompleted({ordersList, payload}));
  } catch (e) {
    yield put(actions.fetchOrdersCompleted(e));
  }
}

function* fetchOrdersCompleted({payload, error}: Action<Order[]>) {
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

function* orderDetails({payload}: Action<OrderDetails>) {
  yield put(routerActions.navigateToOrderDetails(payload));
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_ORDERS, fetchOrders),
    takeEvery(types.FETCH_ORDERS_COMPLETED, fetchOrdersCompleted),
    takeEvery(types.ORDER_DETAILS, orderDetails),
  ]);
}

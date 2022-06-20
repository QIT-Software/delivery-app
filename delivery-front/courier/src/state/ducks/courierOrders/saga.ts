import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {SpoonAndForkApi} from 'api/index';
import Order from 'entities/Order';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';
import {NavigationPayload} from '../router/actions';

function* fetchCourierOrders({payload}: Action<NavigationPayload>) {
  try {
    const courierOrdersList: Order[] = yield SpoonAndForkApi.getOrdersByCourierId();
    yield put(actions.fetchCourierOrdersCompleted({courierOrdersList, payload}));
  } catch (e) {
    yield put(actions.fetchCourierOrdersCompleted(e));
  }
}

function* fetchCourierOrdersCompleted({payload, error}: Action<Order[]>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_COURIER_ORDERS, fetchCourierOrders),
    takeEvery(types.FETCH_COURIER_ORDERS_COMPLETED, fetchCourierOrdersCompleted),
  ]);
}

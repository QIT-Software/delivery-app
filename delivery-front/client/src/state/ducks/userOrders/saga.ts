import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import Order from 'entities/Order';

function* fetchUserOrders() {
  try {
    const userOrders = yield SpoonAndForkApi.getOrdersByUserId();
    yield put(actions.fetchUserOrdersComplete(userOrders));
  } catch (e) {
    yield put(actions.fetchUserOrdersComplete(e));
  }
}

function* fetchUserOrdersComplete({payload, error}: Action<Order>) {
  if (error) {
    yield put(yield put(errorActions.handleError(payload)));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_USER_ORDERS, fetchUserOrders),
    takeEvery(types.FETCH_USER_ORDERS_COMPLETE, fetchUserOrdersComplete),
  ]);
}

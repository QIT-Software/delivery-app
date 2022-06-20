import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions, {FetchOrderDetails} from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import Order from 'entities/Order';
import {alertActions} from 'state/ducks/alert';
import {ID} from 'entities/Common';

function* fetchOrderDetails({payload}: Action<FetchOrderDetails>) {
  try {
    const order = yield SpoonAndForkApi.getOrderById(payload.id);
    yield put(actions.fetchOrderDetailsComplete(order));
  } catch (e) {
    yield put(actions.fetchOrderDetailsComplete(e));
  }
}

function* fetchOrderDetailsComplete({payload, error}: Action<Order>) {
  if (error) {
    yield put(yield put(errorActions.handleError(payload)));
  }
}

function* accept({payload}: Action<string>) {
  yield put(
    alertActions.showMessage({
      message: 'Accept order',
      positiveAction: actions.submitAccept(payload),
      title: 'Accept?',
    }),
  );
}

function* submitAccept({payload}: Action<ID>) {
  try {
    yield SpoonAndForkApi.acceptOrder(payload);
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_ORDER_DETAILS, fetchOrderDetails),
    takeEvery(types.FETCH_ORDER_DETAILS_COMPLETE, fetchOrderDetailsComplete),
    takeEvery(types.ACCEPT, accept),
    takeEvery(types.SUBMIT_ACCEPT, submitAccept),
  ]);
}

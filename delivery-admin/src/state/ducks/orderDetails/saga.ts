import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Order from 'entities/Order';
import {ID} from 'entities/Common';
import {sharedRouterActions} from 'state/ducks/router';
import * as H from 'history';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const order: Order = yield SpoonAndForkApi.getOrderById(payload);

    yield put(actions.fetchDetailsCompleted({order}));
  } catch (e) {
    yield put(actions.fetchDetailsCompleted(e));
  }
}

function* fetchDetailsCompleted({payload, error}: Action<FetchDetailsCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

function* leaveCourier({payload}: Action<ID>) {
  try {
    yield SpoonAndForkApi.removeTheCurrentCourier(payload);
    yield put(actions.fetchDetails(payload));
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
  }
}

function* closeOrder({payload}: Action<{orderId: ID; history: H.History}>) {
  try {
    yield SpoonAndForkApi.deleteOrder(payload.orderId);
    yield put(sharedRouterActions.goBack(payload));
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.LEAVE_COURIER, leaveCourier),
    takeEvery(types.CLOSE_ORDER, closeOrder),
  ]);
}

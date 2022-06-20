import types from './types';
import {all, put, takeEvery} from '@redux-saga/core/effects';
import {SpoonAndForkApi} from 'api/index';
import {Action} from 'redux-actions';
import {ID} from 'entities/Common';
import actions, {OpenNavigator} from './actions';
import Order from 'entities/Order';
import {alertActions} from 'state/ducks/alert';
import {ExternalService, LocationService} from 'services';

function* fetchOrderProgress({payload}: Action<ID>) {
  try {
    const order: Order = yield SpoonAndForkApi.getOrderById(payload);
    yield put(actions.orderProgressFetched(order));
  } catch (e) {
    yield put(actions.orderProgressFetched(e));
  }
}

function* openNavigator({payload}: Action<OpenNavigator>) {
  yield ExternalService.openNavigator(payload.latLng);
}

function* requestCurrentPosition() {
  yield LocationService.requestCurrentPosition();
}

function* fetchCourierLocation({payload}: Action<string>) {
  try {
    const latLng = yield SpoonAndForkApi.getUserLocation(payload);
    yield put(actions.fetchCourierLocationComplete(latLng));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_ORDER, fetchOrderProgress),
    takeEvery(types.OPEN_NAVIGATOR, openNavigator),
    takeEvery(types.FETCH_ORDER, fetchOrderProgress),
    takeEvery(types.REQUEST_CURRENT_POSITION, requestCurrentPosition),
    takeEvery(types.FETCH_COURIER_LOCATION, fetchCourierLocation),
  ]);
}

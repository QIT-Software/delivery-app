import {all, takeEvery} from 'redux-saga/effects';
import {NavigateToOrderDetails, NavigateToScanner, NavigationPayload} from './actions';
import {Action} from 'redux-actions';
import types from './types';

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToCurrentOrders({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/currentOrders');
}

function navigateToOrderDetails({payload}: Action<NavigateToOrderDetails>) {
  payload.history.push(`/main/order/${payload.orderId}`);
}

function navigateToScanner({payload}: Action<NavigateToScanner>) {
  payload.history.push(`/main/order/${payload.orderId}/courierScanner`);
}

function navigateToProfile({payload}: Action<NavigateToOrderDetails>) {
  payload.history.push(`/profile`);
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_ORDER_DETAILS, navigateToOrderDetails),
    takeEvery(types.NAVIGATE_TO_SCANNER, navigateToScanner),
    takeEvery(types.NAVIGATE_TO_CURRENT_ORDERS, navigateToCurrentOrders),
    takeEvery(types.NAVIGATE_TO_PROFILE, navigateToProfile),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
  ]);
}

import {all, takeEvery} from 'redux-saga/effects';
import {NavigateToOrderDetails, NavigationPayload} from './actions';
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

function navigateToOrderProgress({payload}: Action<NavigationPayload>) {
  payload.history.push('/orderProgress');
}

function navigateToProfile({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/profile');
}

function navigateToEditUser({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/editUserProfile');
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_ORDER_DETAILS, navigateToOrderDetails),
    takeEvery(types.NAVIGATE_TO_CURRENT_ORDERS, navigateToCurrentOrders),
    takeEvery(types.NAVIGATE_TO_ORDER_PROGRESS, navigateToOrderProgress),
    takeEvery(types.NAVIGATE_TO_PROFILE, navigateToProfile),
    takeEvery(types.NAVIGATE_TO_EDIT_USER, navigateToEditUser),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
  ]);
}

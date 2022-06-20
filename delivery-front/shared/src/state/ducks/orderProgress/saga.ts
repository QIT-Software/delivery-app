import types from './types';
// eslint-disable-next-line import/no-extraneous-dependencies
import {all, put, select, takeEvery} from '@redux-saga/core/effects';
import {SpoonAndForkApi} from 'api/index';
import {Action} from 'redux-actions';
import {ID} from 'entities/Common';
import Order from 'entities/Order';
// import UiUtils from 'screens/utils/UiUtils';
import {alertActions} from 'state/ducks/alert';
import {actions as routerActions} from 'state/ducks/router';
import {actions as clientRouterActions} from 'state/client/ducks/router';
import actions, {ClientOrder, ScannedBags} from './actions';
import State from 'state/client/entities/State';
import OrderProgressContainer from 'state/entities/OrderProgress';

type ReducerState = OrderProgressContainer;

function* fetchOrderProgress({payload}: Action<ID>) {
  try {
    const order: Order = yield SpoonAndForkApi.getOrderById(payload);
    yield put(actions.orderProgressFetched(order));
  } catch (e) {
    // console.log(JSON.stringify(e));
    yield put(actions.orderProgressFetched(e));
  }
}

function* updateOrderProgress() {
  const {order}: ReducerState = yield select((state: State) => state.orderProgress);
  if (!order.isSuccess) return;

  yield put(actions.fetchOrderProgress(order.id));
}

function* order({payload}: Action<ClientOrder>) {
  yield put(clientRouterActions.navigateToOrderProgress(payload));
}
//
// function* confirmDeleteOrder({payload}: Action<ID>) {
//   UiUtils.setStatusBar('light-content', true, '#032CA6');
//
//   yield put(
//     alertActions.showMessage({
//       message: 'Are you sure you want to delete order?',
//       title: 'Delete order',
//       positiveAction: actions.deleteOrder(payload),
//     }),
//   );
// }

// function* deleteOrder({payload}: Action<ID>) {
//   try {
//     yield SpoonAndForkApi.deleteOrder(payload);
//
//     yield put(actions.deleteOrderCompleted(payload));
//   } catch (e) {
//     yield put(actions.deleteOrderCompleted(e));
//   }
// }

function* deleteOrderCompleted({payload, error}: Action<ID>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }

  yield put(routerActions.navigateToMain());
}

// function* payForOrder() {
//   try {
//     const state: OrderProgressContainer = yield select(
//       (state: State) => state.orderProgress,
//     );
//     const {order} = state;
//     if (!order.isSuccess) return;
//
//     const response: RequestedPayment = yield SpoonAndForkApi.payForOrder(order.id);
//     yield put(actions.payForOrderCompleted(response));
//   } catch (e) {
//     yield put(actions.payForOrderCompleted(e));
//   }
// }
//
// function* payForOrderCompleted({payload, error}: Action<RequestedPayment>) {
//   if (error) {
//     yield put(alertActions.showError(payload));
//     return;
//   }
//
//   try {
//     if (payload.redirectUrl) {
//       yield ExternalService.openAuth(
//         payload.redirectUrl,
//         true,
//         `klean-app://payments/success/order/completed?orderId=${payload.orderId}`, // todo: refactor
//       );
//     }
//     yield put(actions.fetchOrderProgress(payload.orderId));
//   } catch (e) {
//     yield put(alertActions.showError(e));
//   }
// }
//
// function* scanBags({payload}: Action<ScanBags>) {
//   yield put(
//     routerActions.navigateToScanner({
//       submitAction: ({bags}) =>
//         actions.confirmBags({bags, orderId: payload.orderId, action: payload.action}),
//       mode: ScannerMode.checkable,
//       orderId: payload.orderId,
//     }),
//   );
// }

// function* confirmPayment({payload}: Action<ID>) {
//   yield put(orderProgressRouterActions.navigateToConfirmPayment(payload));
// }

function* confirmBags({payload}: Action<ScannedBags>) {
  yield put(
    alertActions.showMessage({
      title: 'Finish order',
      message: 'Confirm order completed?',
      positiveAction: actions.acceptScan({
        bags: payload.bags,
        orderId: payload.orderId,
        action: payload.action,
      }),
    }),
  );
}
//
// function* acceptScan({payload}: Action<ScannedBags>) {
//   yield SpoonAndForkApi.markOrder(
//     payload.orderId,
//     payload.bags.map((item) => item.id),
//     payload.action,
//   );
//   // yield put(clientRouterActions.navigateToOrderCompleted(payload.orderId));
// }

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
    takeEvery(types.ORDER, order),
    takeEvery(types.UPDATE_ORDER_PROGRESS, updateOrderProgress),
    // takeEvery(types.CONFIRM_DELETE_ORDER, confirmDeleteOrder),
    // takeEvery(types.DELETE_ORDER, deleteOrder),
    takeEvery(types.DELETE_ORDER_COMPLETED, deleteOrderCompleted),
    // takeEvery(types.SCAN_BAGS, scanBags),
    takeEvery(types.CONFIRM_BAGS, confirmBags),
    // takeEvery(types.ACCEPT_SCAN, acceptScan),

    // takeEvery(types.PAY_FOR_ORDER, payForOrder),
    // takeEvery(types.PAY_FOR_ORDER_COMPLETED, payForOrderCompleted),
    // takeEvery(types.CONFIRM_PAYMENT, confirmPayment),
    takeEvery(types.FETCH_COURIER_LOCATION, fetchCourierLocation),
  ]);
}

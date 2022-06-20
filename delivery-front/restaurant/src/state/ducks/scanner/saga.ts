import types from './types';
import {all, put, select, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import State from 'state/restaurant/entities/State';
import actions, {InitScanner} from './actions';
import {actions as alertActions} from 'state/ducks/alert';
import {Bag} from 'entities/Bag';
import {SpoonAndForkApi} from 'api';
import Scanner from 'state/restaurant/entities/Scanner';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {errorActions} from 'state/ducks/error';
import {ScannedBags} from 'state/courier/ducks/orderProgress/actions';

type ReducerState = LoadableContainer<Scanner>;

function* initScanner({payload: {mode, orderId}}: Action<InitScanner>) {
  try {
    let bags: Bag[];
    if (orderId) {
      bags = yield SpoonAndForkApi.getBagsByOrderId(orderId);
    } else {
      bags = [];
    }

    yield put(actions.initScannerCompleted({mode, bags}));
  } catch (e) {
    yield put(errorActions.handleError(e));
  }
}

function* codeReceived({payload}: Action<string>) {
  const state: ReducerState = yield select((state: State) => state.scanner);
  if (!state.isSuccess || state.processing) return;

  yield put(actions.processCode(payload));
}

function* processCode({payload}: Action<string>) {
  try {
    const bag: Bag = yield SpoonAndForkApi.findBagByCode(payload);
    yield put(actions.processCodeCompleted(bag));
  } catch (e) {
    yield put(actions.processCodeCompleted(e));
  }
}

function* processCodeCompleted({payload, error}: Action<Bag>) {
  if (error) {
    yield put(
      alertActions.showError({error: payload, positiveAction: actions.resetProcessing()}),
    );
    return;
  }

  yield put(actions.resetProcessing());
}

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

function* confirmBags({payload}: Action<ScannedBags>) {
  yield put(
    alertActions.showMessage({
      title: 'Start delivery',
      message: 'Are you ready to go?',
      positiveAction: actions.acceptScan({
        bag: payload.bag,
        orderId: payload.orderId,
      }),
    }),
  );
}

function* acceptScan({payload}: Action<ScannedBags>) {
  try {
    yield SpoonAndForkApi.markOrder(payload.orderId, payload.bag);
    yield put(actions.acceptScanCompleted(payload));
  } catch (e) {
    yield put(actions.acceptScanCompleted(payload));
  }
}

function* acceptScanCompleted({payload, error}: Action<ScannedBags>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }

  // yield put(actions.fetchOrderProgress(payload.orderId));
}

export default function* () {
  yield all([
    //
    takeEvery(types.INIT_SCANNER, initScanner),
    takeEvery(types.CODE_RECEIVED, codeReceived),
    takeEvery(types.PROCESS_CODE, processCode),
    takeEvery(types.PROCESS_CODE_COMPLETED, processCodeCompleted),
    // takeEvery(types.SCAN_BAGS, scanBags),
    takeEvery(types.CONFIRM_BAGS, confirmBags),
    takeEvery(types.ACCEPT_SCAN, acceptScan),
    takeEvery(types.ACCEPT_SCAN_COMPLETED, acceptScanCompleted),
  ]);
}

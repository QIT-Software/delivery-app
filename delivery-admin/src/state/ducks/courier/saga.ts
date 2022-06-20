import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Courier from 'entities/Courier';

function* fetchCouriers() {
  try {
    const couriers: Courier[] = yield SpoonAndForkApi.getCouriers();

    yield put(actions.fetchCouriersCompleted(couriers));
  } catch (e) {
    yield put(actions.fetchCouriersCompleted(e));
  }
}

function* fetchCouriersCompleted({payload, error}: Action<Courier[]>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_COURIERS, fetchCouriers),
    takeEvery(types.FETCH_COURIERS_COMPLETED, fetchCouriersCompleted),
  ]);
}

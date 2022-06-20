import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Status from 'entities/Status';

function* fetchStatuses() {
  try {
    const statuses: Status[] = yield SpoonAndForkApi.getStatuses();

    yield put(actions.fetchStatusesCompleted(statuses));
  } catch (e) {
    yield put(actions.fetchStatusesCompleted(e));
  }
}

function* fetchStatusesCompleted({payload, error}: Action<Status[]>) {
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
    takeEvery(types.FETCH_STATUSES, fetchStatuses),
    takeEvery(types.FETCH_STATUSES_COMPLETED, fetchStatusesCompleted),
  ]);
}

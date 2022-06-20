import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Client from 'entities/Client';

function* fetchClients() {
  try {
    const clients: Client[] = yield SpoonAndForkApi.getClients();

    yield put(actions.fetchClientsCompleted(clients));
  } catch (e) {
    yield put(actions.fetchClientsCompleted(e));
  }
}

function* fetchClientsCompleted({payload, error}: Action<Client[]>) {
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
    takeEvery(types.FETCH_CLIENTS, fetchClients),
    takeEvery(types.FETCH_CLIENTS_COMPLETED, fetchClientsCompleted),
  ]);
}

import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import {alertActions} from '../alert';
import {Action} from 'redux-actions';
import {ShowMessagePayload} from 'state/ducks/alert/actions';

function* handleError({payload}: Action<ShowMessagePayload>) {
  yield put(alertActions.showMessage(payload));
}

export default function* () {
  yield all([
    //
    takeEvery(types.HANDLE_ERROR, handleError),
  ]);
}

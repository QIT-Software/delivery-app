import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions, {FetchSet} from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import Set from 'entities/Set';

function* fetchSet({payload}: Action<FetchSet>) {
  try {
    const set = yield SpoonAndForkApi.getSetById(payload.id);
    yield put(actions.fetchSetComplete(set));
  } catch (e) {
    yield put(actions.fetchSetComplete(e));
  }
}

function* fetchSetComplete({payload, error}: Action<Set>) {
  if (error) {
    yield put(yield put(errorActions.handleError(payload)));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_SET, fetchSet),
    takeEvery(types.FETCH_SET_COMPLETE, fetchSetComplete),
  ]);
}

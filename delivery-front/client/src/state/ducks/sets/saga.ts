import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions, {FetchSets} from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import Set from 'entities/Set';

function* fetchSets({payload}: Action<FetchSets>) {
  try {
    const sets = yield SpoonAndForkApi.getSetsByCuisineId(payload.id);
    yield put(actions.fetchSetsComplete(sets));
  } catch (e) {
    yield put(actions.fetchSetsComplete(e));
  }
}

function* fetchSetsComplete({payload, error}: Action<Set>) {
  if (error) {
    yield put(yield put(errorActions.handleError(payload)));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_SETS, fetchSets),
    takeEvery(types.FETCH_SETS_COMPLETE, fetchSetsComplete),
  ]);
}

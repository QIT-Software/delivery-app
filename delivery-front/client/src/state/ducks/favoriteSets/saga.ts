import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {errorActions} from 'state/ducks/error';
import Set from 'entities/Set';

function* fetchFavoriteSets() {
  try {
    const favoriteSets = yield SpoonAndForkApi.getSets();
    yield put(actions.fetchFavoriteSetsComplete(favoriteSets));
  } catch (e) {
    yield put(actions.fetchFavoriteSetsComplete(e));
  }
}

function* fetchFavoriteSetsComplete({payload, error}: Action<Set>) {
  if (error) {
    yield put(yield put(errorActions.handleError(payload)));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_FAVORITE_SETS, fetchFavoriteSets),
    takeEvery(types.FETCH_FAVORITE_SETS_COMPLETE, fetchFavoriteSetsComplete),
  ]);
}

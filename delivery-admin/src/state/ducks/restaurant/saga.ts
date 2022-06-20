import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Restaurant from 'entities/Restaurant';

function* fetchRestaurants() {
  try {
    const restaurants: Restaurant[] = yield SpoonAndForkApi.getRestaurants();

    yield put(actions.fetchRestaurantsCompleted(restaurants));
  } catch (e) {
    yield put(actions.fetchRestaurantsCompleted(e));
  }
}

function* fetchRestaurantsCompleted({payload, error}: Action<Restaurant[]>) {
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
    takeEvery(types.FETCH_RESTAURANTS, fetchRestaurants),
    takeEvery(types.FETCH_RESTAURANTS_COMPLETED, fetchRestaurantsCompleted),
  ]);
}

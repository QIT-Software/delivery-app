import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {SpoonAndForkApi} from 'api/index';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';
import {NavigationPayload} from '../router/actions';
import Restaurant from 'entities/Restaurant';

function* fetchCurrentRestaurant({payload}: Action<NavigationPayload>) {
  try {
    const currentRestaurant = yield SpoonAndForkApi.getRestaurant();
    yield put(actions.fetchCurrentRestaurantCompleted({currentRestaurant, payload}));
  } catch (e) {
    yield put(actions.fetchCurrentRestaurantCompleted(e));
  }
}

function* fetchCurrentRestaurantCompleted({payload, error}: Action<Restaurant>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_CURRENT_RESTAURANT, fetchCurrentRestaurant),
    takeEvery(types.FETCH_CURRENT_RESTAURANT_COMPLETED, fetchCurrentRestaurantCompleted),
  ]);
}

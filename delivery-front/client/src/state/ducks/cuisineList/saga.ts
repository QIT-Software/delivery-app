import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions, {CuisineSets} from './actions';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {NavigationPayload} from '../router/actions';
import {errorActions} from 'state/ducks/error';
import Cuisine from 'entities/Cuisine';
import {actions as routerActions} from 'state/client/ducks/router';

function* fetchCuisineList({payload}: Action<NavigationPayload>) {
  try {
    const cuisineList = yield SpoonAndForkApi.getCuisineList();
    yield put(actions.fetchCuisineListComplete({cuisineList, payload}));
  } catch (e) {
    yield put(actions.fetchCuisineListComplete(e));
  }
}

function* fetchCuisineListComplete({payload, error}: Action<Cuisine>) {
  if (error) {
    yield put(errorActions.handleError(payload));
  }
}

function* sets({payload}: Action<CuisineSets>) {
  yield put(routerActions.navigateToCuisineSets(payload));
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_CUISINE_LIST, fetchCuisineList),
    takeEvery(types.FETCH_CUISINE_LIST_COMPLETE, fetchCuisineListComplete),
    takeEvery(types.SETS, sets),
  ]);
}

import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Dish from 'entities/Dish';

function* fetchDishes() {
  try {
    const dishes: Dish[] = yield SpoonAndForkApi.getDishes();

    yield put(actions.fetchDishesCompleted(dishes));
  } catch (e) {
    yield put(actions.fetchDishesCompleted(e));
  }
}

function* fetchDishesCompleted({payload, error}: Action<Dish[]>) {
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
    takeEvery(types.FETCH_DISHES, fetchDishes),
    takeEvery(types.FETCH_DISHES_COMPLETED, fetchDishesCompleted),
  ]);
}

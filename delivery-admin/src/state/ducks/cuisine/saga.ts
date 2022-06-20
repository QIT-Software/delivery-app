import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Cuisine from 'entities/Cuisine';

function* fetchCuisines() {
  try {
    const cuisines: Cuisine[] = yield SpoonAndForkApi.getCuisines();

    yield put(actions.fetchCuisinesCompleted(cuisines));
  } catch (e) {
    yield put(actions.fetchCuisinesCompleted(e));
  }
}

function* fetchCuisinesCompleted({payload, error}: Action<Cuisine[]>) {
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
    takeEvery(types.FETCH_CUISINES, fetchCuisines),
    takeEvery(types.FETCH_CUISINES_COMPLETED, fetchCuisinesCompleted),
  ]);
}

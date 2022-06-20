import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {
  UpdateDishCompleted,
  FetchDetailsCompleted,
  CreateDish,
  CreateDishCompleted,
} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Dish from 'entities/Dish';
import {UpdateDish} from 'state/ducks/dishDetails/actions';
import {mapCreateDishRequestToGQL, mapUpdateDishRequestToGQL} from 'api/Mappers';
import dishesActions from 'state/ducks/dish/actions';
import {ID} from '../../../entities/Common';
import * as H from 'history';
import {sharedRouterActions} from '../router';

function* updateDish({payload: {request, history}}: Action<UpdateDish>) {
  try {
    if (request.uploadFile) {
      let uploadFileId: string;
      if (typeof request.uploadFile === 'string') {
        const urlParts = request.uploadFile.split('/');
        uploadFileId = urlParts[urlParts.length - 1];
      } else {
        uploadFileId = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      }

      const dish: Dish = yield SpoonAndForkApi.updateDishRequest(
        mapUpdateDishRequestToGQL(request, uploadFileId),
      );
      yield put(actions.updateDishRequestCompleted({dish, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Dish success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateDishRequestCompleted(e));
  }
}

function* updateDishCompleted({payload, error}: Action<UpdateDishCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(dishesActions.fetchDishes());
}

function* createDish({payload: {request, history}}: Action<CreateDish>) {
  try {
    if (request.uploadFile && typeof request.uploadFile !== 'string') {
      const uploadFileId: string = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      const dish: Dish = yield SpoonAndForkApi.createDishRequest(
        mapCreateDishRequestToGQL(request, uploadFileId),
      );
      yield put(actions.createDishRequestCompleted({dish, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Dish success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.createDishRequestCompleted(e));
  }
}

function* createDishCompleted({payload, error}: Action<CreateDishCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(dishesActions.fetchDishes());
}

function* fetchDetails({payload}: Action<string>) {
  try {
    const dish: Dish = yield SpoonAndForkApi.getDishById(payload);

    yield put(actions.fetchDetailsCompleted({dish}));
  } catch (e) {
    yield put(actions.fetchDetailsCompleted(e));
  }
}

function* fetchDetailsCompleted({payload, error}: Action<FetchDetailsCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

function* deleteDish({payload}: Action<{dishId: ID; history: H.History}>) {
  try {
    yield SpoonAndForkApi.deleteDish(payload.dishId);
    yield put(sharedRouterActions.goBack(payload));
    yield put(
      snackBarActions.showSnackbar({
        message: 'Dish success removed',
        type: 'warning',
      }),
    );

    yield put(dishesActions.fetchDishes());
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.UPDATE_DISH, updateDish),
    takeEvery(types.UPDATE_DISH_COMPLETED, updateDishCompleted),
    takeEvery(types.CREATE_DISH, createDish),
    takeEvery(types.CREATE_DISH_COMPLETED, createDishCompleted),
    takeEvery(types.DELETE_DISH, deleteDish),
  ]);
}

import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {
  CreateRestaurant,
  CreateRestaurantCompleted,
  FetchDetailsCompleted,
  UpdateRestaurant,
  UpdateRestaurantCompleted,
} from './actions';
import {actions as snackActions, snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Restaurant from 'entities/Restaurant';
import {ID} from 'entities/Common';
import {
  mapCreateRestaurantRequestToGQL,
  mapUpdateRestaurantRequestToGQL,
} from 'api/Mappers';
import * as H from 'history';
import {sharedRouterActions} from '../router';
import {restaurantActions} from '../restaurant';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const restaurant: Restaurant = yield SpoonAndForkApi.getRestaurantById(payload);

    yield put(actions.fetchDetailsCompleted({restaurant}));
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

function* updateRestaurantInformation({payload: {request}}: Action<UpdateRestaurant>) {
  try {
    if (request.uploadFile) {
      let uploadFileId: string;
      if (typeof request.uploadFile === 'string') {
        const urlParts = request.uploadFile.split('/');
        uploadFileId = urlParts[urlParts.length - 1];
      } else {
        uploadFileId = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      }

      yield SpoonAndForkApi.updateRestaurantRequest(
        mapUpdateRestaurantRequestToGQL(request, uploadFileId),
      );
      yield put(actions.updateRestaurantInformationRequestCompleted(request));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Restaurant success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateRestaurantInformationRequestCompleted(e));
  }
}

function* updateRestaurantInformationCompleted({
  payload,
  error,
}: Action<UpdateRestaurantCompleted>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
  }
}

function* createRestaurant({payload: {request, history}}: Action<CreateRestaurant>) {
  try {
    if (request.uploadFile && typeof request.uploadFile !== 'string') {
      const uploadFileId: string = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      const restaurant: Restaurant = yield SpoonAndForkApi.createRestaurantRequest(
        mapCreateRestaurantRequestToGQL(request, uploadFileId),
      );
      yield put(actions.createRestaurantRequestCompleted({restaurant, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Restaurant success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.createRestaurantRequestCompleted(e));
  }
}

function* createRestaurantCompleted({payload, error}: Action<CreateRestaurantCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

function* deleteRestaurant({payload}: Action<{restaurantId: ID; history: H.History}>) {
  try {
    yield SpoonAndForkApi.deleteRestaurant(payload.restaurantId);
    yield put(sharedRouterActions.goBack(payload));
    yield put(
      snackBarActions.showSnackbar({
        message: 'Restaurant success removed',
        type: 'warning',
      }),
    );

    yield put(restaurantActions.fetchRestaurants());
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
    takeEvery(types.UPDATE_RESTAURANT_INFORMATION, updateRestaurantInformation),
    takeEvery(
      types.UPDATE_RESTAURANT_INFORMATION_COMPLETED,
      updateRestaurantInformationCompleted,
    ),
    takeEvery(types.CREATE_RESTAURANT, createRestaurant),
    takeEvery(types.CREATE_RESTAURANT_COMPLETED, createRestaurantCompleted),
    takeEvery(types.DELETE_RESTAURANT, deleteRestaurant),
  ]);
}

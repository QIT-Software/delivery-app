import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {
  UpdateSetCompleted,
  FetchDetailsCompleted,
  CreateSet,
  CreateSetCompleted,
} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Set from 'entities/Set';
import {UpdateSet} from 'state/ducks/setDetails/actions';
import {mapCreateSetRequestToGQL, mapUpdateSetRequestToGQL} from 'api/Mappers';
import setsActions from 'state/ducks/set/actions';
import {ID} from '../../../entities/Common';
import * as H from 'history';
import {sharedRouterActions} from '../router';

function* updateSet({payload: {request, history}}: Action<UpdateSet>) {
  try {
    if (request.uploadFile) {
      let uploadFileId: string;
      if (typeof request.uploadFile === 'string') {
        const urlParts = request.uploadFile.split('/');
        uploadFileId = urlParts[urlParts.length - 1];
      } else {
        uploadFileId = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      }

      const set: Set = yield SpoonAndForkApi.updateSetRequest(
        mapUpdateSetRequestToGQL(request, uploadFileId),
      );
      yield put(actions.updateSetRequestCompleted({set, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Set success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateSetRequestCompleted(e));
  }
}

function* updateSetCompleted({payload, error}: Action<UpdateSetCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(setsActions.fetchSets());
}

function* createSet({payload: {request, history}}: Action<CreateSet>) {
  try {
    if (request.uploadFile && typeof request.uploadFile !== 'string') {
      const uploadFileId: string = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      const set: Set = yield SpoonAndForkApi.createSetRequest(
        mapCreateSetRequestToGQL(request, uploadFileId),
      );
      yield put(actions.createSetRequestCompleted({set, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Set success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.createSetRequestCompleted(e));
  }
}

function* createSetCompleted({payload, error}: Action<CreateSetCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(setsActions.fetchSets());
}

function* fetchDetails({payload}: Action<string>) {
  try {
    const set: Set = yield SpoonAndForkApi.getSetById(payload);

    yield put(actions.fetchDetailsCompleted({set}));
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

function* deleteSet({payload}: Action<{setId: ID; history: H.History}>) {
  try {
    yield SpoonAndForkApi.deleteSet(payload.setId);
    yield put(sharedRouterActions.goBack(payload));
    yield put(
      snackBarActions.showSnackbar({
        message: 'Set success removed',
        type: 'warning',
      }),
    );

    yield put(setsActions.fetchSets());
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
    takeEvery(types.UPDATE_SET, updateSet),
    takeEvery(types.UPDATE_SET_COMPLETED, updateSetCompleted),
    takeEvery(types.CREATE_SET, createSet),
    takeEvery(types.CREATE_SET_COMPLETED, createSetCompleted),
    takeEvery(types.DELETE_SET, deleteSet),
  ]);
}

import types from 'state/ducks/statusDetails/types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import actions, {
  UpdateStatusCompleted,
  FetchDetailsCompleted,
  CreateStatus,
  UpdateStatus,
  CreateStatusCompleted,
} from 'state/ducks/statusDetails/actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Status from 'entities/Status';
import {mapCreateStatusRequestToGQL, mapUpdateStatusRequestToGQL} from 'api/Mappers';
import statusesActions from 'state/ducks/status/actions';
import {ID} from '../../../entities/Common';
import * as H from 'history';
import {sharedRouterActions} from '../router';

function* updateStatus({payload: {request, history}}: Action<UpdateStatus>) {
  try {
    if (request.uploadFile) {
      let uploadFileId: string;
      if (typeof request.uploadFile === 'string') {
        const urlParts = request.uploadFile.split('/');
        uploadFileId = urlParts[urlParts.length - 1];
      } else {
        uploadFileId = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      }

      const status: Status = yield SpoonAndForkApi.updateStatusRequest(
        mapUpdateStatusRequestToGQL(request, uploadFileId),
      );
      yield put(actions.updateStatusRequestCompleted({status, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Status success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateStatusRequestCompleted(e));
  }
}

function* updateStatusCompleted({payload, error}: Action<UpdateStatusCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(statusesActions.fetchStatuses());
}

function* createStatus({payload: {request, history}}: Action<CreateStatus>) {
  if (request.uploadFile && typeof request.uploadFile !== 'string') {
    const uploadFileId: string = yield SpoonAndForkApi.uploadFile(request.uploadFile);
    const status: Status = yield SpoonAndForkApi.createStatusRequest(
      mapCreateStatusRequestToGQL(request, uploadFileId),
    );

    yield put(actions.createStatusRequestCompleted({status, history}));
    yield put(
      snackBarActions.showSnackbar({
        message: 'Status success saved',
        type: 'success',
      }),
    );
  }
}

function* createStatusCompleted({payload, error}: Action<CreateStatusCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(statusesActions.fetchStatuses());
}

function* fetchDetails({payload}: Action<string>) {
  try {
    const status: Status = yield SpoonAndForkApi.getStatusById(payload);

    yield put(actions.fetchDetailsCompleted({status}));
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

function* deleteStatus({payload}: Action<{statusId: ID; history: H.History}>) {
  try {
    yield SpoonAndForkApi.deleteStatus(payload.statusId);
    yield put(sharedRouterActions.goBack(payload));
    yield put(
      snackBarActions.showSnackbar({
        message: 'Status success removed',
        type: 'warning',
      }),
    );

    yield put(statusesActions.fetchStatuses());
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
    takeEvery(types.UPDATE_STATUS, updateStatus),
    takeEvery(types.UPDATE_STATUS_COMPLETED, updateStatusCompleted),
    takeEvery(types.CREATE_STATUS, createStatus),
    takeEvery(types.CREATE_STATUS_COMPLETED, createStatusCompleted),
    takeEvery(types.DELETE_STATUS, deleteStatus),
  ]);
}

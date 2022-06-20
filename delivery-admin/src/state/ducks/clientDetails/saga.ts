import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted, UpdateClientInformation} from './actions';
import {actions as snackActions, snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Client from 'entities/Client';
import {ID} from 'entities/Common';
import {mapUpdateClientInformationRequestToGQL} from 'api/Mappers';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const client: Client = yield SpoonAndForkApi.getClientById(payload);

    yield put(actions.fetchDetailsCompleted({client}));
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

function* updateClientInformation({payload: {request}}: Action<UpdateClientInformation>) {
  try {
    yield SpoonAndForkApi.updateClientInformationRequest(
      mapUpdateClientInformationRequestToGQL(request),
    );

    yield put(actions.updateClientInformationRequestCompleted(request));
  } catch (e) {
    yield put(actions.updateClientInformationRequestCompleted(e));
  }
}

function* updateClientInformationCompleted({payload, error}: Action<Client>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }

  yield put(actions.fetchDetails(payload.id));
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.UPDATE_CLIENT_INFORMATION, updateClientInformation),
    takeEvery(
      types.UPDATE_CLIENT_INFORMATION_COMPLETED,
      updateClientInformationCompleted,
    ),
  ]);
}

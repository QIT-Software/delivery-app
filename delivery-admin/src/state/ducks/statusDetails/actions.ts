import {createAction} from 'redux-actions';
import types from 'state/ducks/statusDetails/types';
import Status from 'entities/Status';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateStatusRequest from 'state/entities/UpdateStatusRequest';
import CreateStatusRequest from 'state/entities/CreateStatusRequest';
import {ID} from 'entities/Common';
import * as H from 'history';

export type FetchDetailsCompleted = {
  status: Status;
};

export type UpdateStatus = {
  request: UpdateStatusRequest;
} & NavigationPayload;
export type UpdateStatusCompleted = {
  status: Status;
} & NavigationPayload;
export type CreateStatus = {
  request: CreateStatusRequest;
} & NavigationPayload;
export type CreateStatusCompleted = {
  status: Status;
} & NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateStatusRequest: createAction<UpdateStatus>(types.UPDATE_STATUS),
  updateStatusRequestCompleted: createAction<UpdateStatusCompleted>(
    types.UPDATE_STATUS_COMPLETED,
  ),
  createStatusRequest: createAction<CreateStatus>(types.CREATE_STATUS),
  createStatusRequestCompleted: createAction<CreateStatusCompleted>(
    types.CREATE_STATUS_COMPLETED,
  ),
  deleteStatus: createAction<{statusId: ID; history: H.History}>(types.DELETE_STATUS),
};

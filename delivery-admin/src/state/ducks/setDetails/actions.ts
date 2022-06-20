import {createAction} from 'redux-actions';
import types from './types';
import Set from 'entities/Set';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateSetRequest from 'state/entities/UpdateSetRequest';
import CreateSetRequest from 'state/entities/CreateSetRequest';
import {ID} from 'entities/Common';
import * as H from 'history';

export type FetchDetailsCompleted = {
  set: Set;
};

export type UpdateSet = {
  request: UpdateSetRequest;
} & NavigationPayload;
export type UpdateSetCompleted = {
  set: Set;
} & NavigationPayload;
export type CreateSet = {
  request: CreateSetRequest;
} & NavigationPayload;
export type CreateSetCompleted = {
  set: Set;
} & NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateSetRequest: createAction<UpdateSet>(types.UPDATE_SET),
  updateSetRequestCompleted: createAction<UpdateSetCompleted>(types.UPDATE_SET_COMPLETED),
  createSetRequest: createAction<CreateSet>(types.CREATE_SET),
  createSetRequestCompleted: createAction<CreateSetCompleted>(types.CREATE_SET_COMPLETED),
  deleteSet: createAction<{setId: ID; history: H.History}>(types.DELETE_SET),
};

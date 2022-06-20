import {createAction} from 'redux-actions';
import types from './types';
import Cuisine from 'entities/Cuisine';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateCuisineRequest from 'state/entities/UpdateCuisineRequest';
import CreateCuisineRequest from 'state/entities/CreateCuisineRequest';
import {ID} from 'entities/Common';
import * as H from 'history';

export type FetchDetailsCompleted = {
  cuisine: Cuisine;
};

export type UpdateCuisine = {
  request: UpdateCuisineRequest;
} & NavigationPayload;
export type UpdateCuisineCompleted = {
  cuisine: Cuisine;
} & NavigationPayload;
export type CreateCuisine = {
  request: CreateCuisineRequest;
} & NavigationPayload;
export type CreateCuisineCompleted = {
  cuisine: Cuisine;
} & NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateCuisineRequest: createAction<UpdateCuisine>(types.UPDATE_CUISINE),
  updateCuisineRequestCompleted: createAction<UpdateCuisineCompleted>(
    types.UPDATE_CUISINE_COMPLETED,
  ),
  createCuisineRequest: createAction<CreateCuisine>(types.CREATE_CUISINE),
  createCuisineRequestCompleted: createAction<CreateCuisineCompleted>(
    types.CREATE_CUISINE_COMPLETED,
  ),
  deleteCuisine: createAction<{cuisineId: ID; history: H.History}>(types.DELETE_CUISINE),
};

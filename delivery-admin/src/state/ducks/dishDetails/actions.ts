import {createAction} from 'redux-actions';
import types from './types';
import Dish from 'entities/Dish';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateDishRequest from 'state/entities/UpdateDishRequest';
import CreateDishRequest from 'state/entities/CreateDishRequest';
import {ID} from 'entities/Common';
import * as H from 'history';

export type FetchDetailsCompleted = {
  dish: Dish;
};

export type UpdateDish = {
  request: UpdateDishRequest;
} & NavigationPayload;
export type UpdateDishCompleted = {
  dish: Dish;
} & NavigationPayload;
export type CreateDish = {
  request: CreateDishRequest;
} & NavigationPayload;
export type CreateDishCompleted = {
  dish: Dish;
} & NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateDishRequest: createAction<UpdateDish>(types.UPDATE_DISH),
  updateDishRequestCompleted: createAction<UpdateDishCompleted>(
    types.UPDATE_DISH_COMPLETED,
  ),
  createDishRequest: createAction<CreateDish>(types.CREATE_DISH),
  createDishRequestCompleted: createAction<CreateDishCompleted>(
    types.CREATE_DISH_COMPLETED,
  ),
  deleteDish: createAction<{dishId: ID; history: H.History}>(types.DELETE_DISH),
};

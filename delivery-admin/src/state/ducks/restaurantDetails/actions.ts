import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Restaurant from 'entities/Restaurant';
import UpdateRestaurantRequest from 'state/entities/UpdateRestaurantRequest';
import {NavigationPayload} from 'state/ducks/router/actions';
import CreateRestaurantRequest from 'state/entities/CreateRestaurantRequest';
import * as H from 'history';

export type FetchDetailsCompleted = {
  restaurant: Restaurant;
};

export type UpdateRestaurant = {
  request: UpdateRestaurantRequest;
} & NavigationPayload;
export type UpdateRestaurantCompleted = {
  restaurant: Restaurant;
} & NavigationPayload;

export type CreateRestaurant = {
  request: CreateRestaurantRequest;
} & NavigationPayload;
export type CreateRestaurantCompleted = {
  restaurant: Restaurant;
} & NavigationPayload;

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateRestaurantInformationRequest: createAction<UpdateRestaurant>(
    types.UPDATE_RESTAURANT_INFORMATION,
  ),
  updateRestaurantInformationRequestCompleted: createAction(
    types.UPDATE_RESTAURANT_INFORMATION_COMPLETED,
  ),
  createRestaurantRequest: createAction<CreateRestaurant>(types.CREATE_RESTAURANT),
  createRestaurantRequestCompleted: createAction(types.CREATE_RESTAURANT_COMPLETED),
  deleteRestaurant: createAction<{restaurantId: ID; history: H.History}>(
    types.DELETE_RESTAURANT,
  ),
};

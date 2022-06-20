import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export default {
  fetchCurrentRestaurant: createAction<NavigationPayload>(types.FETCH_CURRENT_RESTAURANT),
  fetchCurrentRestaurantCompleted: createAction(types.FETCH_CURRENT_RESTAURANT_COMPLETED),
};

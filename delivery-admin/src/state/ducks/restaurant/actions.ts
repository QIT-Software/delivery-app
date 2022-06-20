import {createAction} from 'redux-actions';
import types from './types';
import Restaurant from 'entities/Restaurant';

export default {
  fetchRestaurants: createAction(types.FETCH_RESTAURANTS),
  fetchRestaurantsCompleted: createAction<Restaurant[]>(
    types.FETCH_RESTAURANTS_COMPLETED,
  ),
};

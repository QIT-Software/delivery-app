import {createAction} from 'redux-actions';
import types from './types';
import Dish from 'entities/Dish';

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDishes: createAction(types.FETCH_DISHES),
  fetchDishesCompleted: createAction<Dish[]>(types.FETCH_DISHES_COMPLETED),
};

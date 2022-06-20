import {createAction} from 'redux-actions';
import types from './types';
import Cuisine from 'entities/Cuisine';

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchCuisines: createAction(types.FETCH_CUISINES),
  fetchCuisinesCompleted: createAction<Cuisine[]>(types.FETCH_CUISINES_COMPLETED),
};

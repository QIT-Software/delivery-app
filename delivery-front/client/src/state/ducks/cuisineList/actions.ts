import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type CuisineSets = {cuisineId: string} & NavigationPayload;

export default {
  fetchCuisineList: createAction<NavigationPayload>(types.FETCH_CUISINE_LIST),
  fetchCuisineListComplete: createAction(types.FETCH_CUISINE_LIST_COMPLETE),
  sets: createAction<CuisineSets>(types.SETS),
};

import {createAction} from 'redux-actions';
import types from './types';
import Set from 'entities/Set';
import {ID} from 'entities/Common';
import DistributeSetsByDays from '../../entities/DistributeSetsByDays';
import {NavigationPayload} from '../router/actions';

export type DistributeSetsByDaysProps = {
  request: DistributeSetsByDays[];
} & NavigationPayload;
export type DistributeSetsByDaysCompleted = NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchSets: createAction(types.FETCH_SETS),
  fetchSetsCompleted: createAction<Set[]>(types.FETCH_SETS_COMPLETED),
  fetchSetsByDishId: createAction<ID>(types.FETCH_SETS_BY_DISH_ID),
  fetchSetsByDishIdCompleted: createAction<Set[]>(types.FETCH_SETS_BY_DISH_ID_COMPLETED),
  fetchSetsByCuisineId: createAction<ID>(types.FETCH_SETS_BY_CUISINE_ID),
  fetchSetsByCuisineIdCompleted: createAction<Set[]>(
    types.FETCH_SETS_BY_CUISINE_ID_COMPLETED,
  ),
  distributeSetsByDays: createAction<DistributeSetsByDaysProps>(
    types.DISTRIBUTE_SETS_BY_DAYS,
  ),
  distributeSetsByDaysCompleted: createAction<DistributeSetsByDaysCompleted>(
    types.DISTRIBUTE_SETS_BY_DAYS_COMPLETED,
  ),
};

import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import SetsContainer from 'state/entities/SetsContainer';
import Set from 'entities/Set';

type ReducerState = LoadableContainer<SetsContainer>;

const fetchSetsCompleted: ReducerNextThrow<ReducerState, Set[]> = {
  next: (_, {payload}) => success({sets: payload}),
  throw: (_, {payload}) => failed(payload),
};

const fetchSetsByDishIdCompleted: ReducerNextThrow<ReducerState, Set[]> = {
  next: (_, {payload}) => success({sets: payload}),
  throw: (_, {payload}) => failed(payload),
};

const fetchSetsByCuisineIdCompleted: ReducerNextThrow<ReducerState, Set[]> = {
  next: (_, {payload}) => success({sets: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_SETS]: (state) => ({...state, isBusy: true}),
    [types.FETCH_SETS_COMPLETED]: fetchSetsCompleted,
    [types.FETCH_SETS_BY_DISH_ID]: (state) => ({...state, isBusy: true}),
    [types.FETCH_SETS_BY_DISH_ID_COMPLETED]: fetchSetsByDishIdCompleted,
    [types.FETCH_SETS_BY_CUISINE_ID]: (state) => ({...state, isBusy: true}),
    [types.FETCH_SETS_BY_CUISINE_ID_COMPLETED]: fetchSetsByCuisineIdCompleted,
    [types.CLEAR]: () => empty(),
  },
  empty(),
);

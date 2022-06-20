import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import RestaurantsContainer from 'state/entities/RestaurantsContainer';
import Restaurant from 'entities/Restaurant';

type ReducerState = LoadableContainer<RestaurantsContainer>;

const fetchRestaurantCompleted: ReducerNextThrow<ReducerState, Restaurant[]> = {
  next: (_, {payload}) => success({restaurants: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_RESTAURANTS]: (state) => ({...state, isBusy: true}),
    [types.FETCH_RESTAURANTS_COMPLETED]: fetchRestaurantCompleted,
  },
  empty(),
);

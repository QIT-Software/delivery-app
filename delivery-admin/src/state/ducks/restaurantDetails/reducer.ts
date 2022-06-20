import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {RestaurantDetailsContainer} from 'state/entities/RestaurantDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/restaurantDetails/actions';

type ReducerState = RestaurantDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    restaurant: success(payload.restaurant),
  }),
  throw: (state, {payload}) => ({...state, restaurant: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state, isVerifying: true}),
  },
  {restaurant: empty()},
);

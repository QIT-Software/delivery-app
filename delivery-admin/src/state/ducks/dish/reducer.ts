import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import DishesContainer from 'state/entities/DishesContainer';
import Dish from 'entities/Dish';

type ReducerState = LoadableContainer<DishesContainer>;

const fetchDishesCompleted: ReducerNextThrow<ReducerState, Dish[]> = {
  next: (_, {payload}) => success({dishes: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DISHES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_DISHES_COMPLETED]: fetchDishesCompleted,
    [types.CLEAR]: () => empty(),
  },
  empty(),
);

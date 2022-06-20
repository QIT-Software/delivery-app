import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import CuisinesContainer from 'state/entities/CuisinesContainer';
import Cuisine from 'entities/Cuisine';

type ReducerState = LoadableContainer<CuisinesContainer>;

const fetchCuisinesCompleted: ReducerNextThrow<ReducerState, Cuisine[]> = {
  next: (_, {payload}) => success({cuisines: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_CUISINES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_CUISINES_COMPLETED]: fetchCuisinesCompleted,
    [types.CLEAR]: () => empty(),
  },
  empty(),
);

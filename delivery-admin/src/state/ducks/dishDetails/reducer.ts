import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {DishDetailsContainer} from 'state/entities/DishDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/dishDetails/actions';

type ReducerState = DishDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    dish: success(payload.dish),
  }),
  throw: (state, {payload}) => ({...state, dish: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state}),
  },
  {dish: empty()},
);

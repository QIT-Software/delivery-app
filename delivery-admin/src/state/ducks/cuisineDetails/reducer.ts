import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {CuisineDetailsContainer} from 'state/entities/CuisineDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/cuisineDetails/actions';

type ReducerState = CuisineDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    cuisine: success(payload.cuisine),
  }),
  throw: (state, {payload}) => ({...state, cuisine: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state}),
  },
  {cuisine: empty()},
);

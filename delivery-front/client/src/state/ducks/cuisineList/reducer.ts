import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  loading,
  success,
} from 'state/entities/LoadableContainer';
import Cuisine from 'entities/Cuisine';

type ReducerState = LoadableContainer<{cuisineList: Cuisine[]}>;

const cuisineListFetched: ReducerNextThrow<ReducerState, {cuisineList: Cuisine[]}> = {
  next: (_, {payload}) => success({cuisineList: payload.cuisineList}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_CUISINE_LIST]: (state) => loading(state),
    [types.FETCH_CUISINE_LIST_COMPLETE]: cuisineListFetched,
  },
  empty(),
);

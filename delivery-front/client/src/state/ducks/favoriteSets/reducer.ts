import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  failed,
  LoadableContainer,
  loading,
  success,
  empty,
} from 'state/entities/LoadableContainer';
import Set from 'entities/Set';

type ReducerState = LoadableContainer<{favoriteSets: Set[]}>;

const favoriteSetsFetched: ReducerNextThrow<ReducerState, Set[]> = {
  next: (_, {payload}) => success({favoriteSets: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_FAVORITE_SETS]: (state) => loading(state),
    [types.FETCH_FAVORITE_SETS_COMPLETE]: favoriteSetsFetched,
  },
  empty(),
);

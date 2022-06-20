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

type ReducerState = LoadableContainer<{sets: Set[]}>;

const cuisineFetched: ReducerNextThrow<ReducerState, Set[]> = {
  next: (_, {payload}) => success({sets: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_SETS]: (state) => loading(state),
    [types.FETCH_SETS_COMPLETE]: cuisineFetched,
  },
  empty(),
);

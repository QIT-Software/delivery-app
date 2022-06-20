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

type ReducerStateSet = LoadableContainer<{set: Set}>;

const setFetched: ReducerNextThrow<ReducerStateSet, Set> = {
  next: (_, {payload}) => success({set: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerStateSet, any>(
  {
    [types.FETCH_SET]: (state) => loading(state),
    [types.FETCH_SET_COMPLETE]: setFetched,
  },
  empty(),
);

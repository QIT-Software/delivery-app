import {handleActions, ReducerNextThrow} from 'redux-actions';
import {
  empty,
  failed,
  loading,
  success,
  LoadableContainer,
} from 'state/entities/LoadableContainer';
import types from './types';
import Address from 'entities/Address';

type ReducerState = LoadableContainer<{recentAddresses: Address[]}>;

const addressesFetched: ReducerNextThrow<ReducerState, {recentAddresses: Address[]}> = {
  next: (_, {payload}) => success({recentAddresses: payload.recentAddresses}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_RECENT_ADDRESSES]: (state) => loading(state),
    [types.FETCH_RECENT_ADDRESSES_COMPLETED]: addressesFetched,
  },
  empty(),
);

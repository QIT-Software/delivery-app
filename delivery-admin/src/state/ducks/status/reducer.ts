import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import StatusesContainer from 'state/entities/StatusesContainer';
import Status from 'entities/Status';

type ReducerState = LoadableContainer<StatusesContainer>;

const fetchStatusesCompleted: ReducerNextThrow<ReducerState, Status[]> = {
  next: (_, {payload}) => success({statuses: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_STATUSES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_STATUSES_COMPLETED]: fetchStatusesCompleted,
    [types.CLEAR]: () => empty(),
  },
  empty(),
);

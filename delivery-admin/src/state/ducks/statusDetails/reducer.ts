import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from 'state/ducks/statusDetails/types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {StatusDetailsContainer} from 'state/entities/StatusDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/statusDetails/actions';

type ReducerState = StatusDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    status: success(payload.status),
  }),
  throw: (state, {payload}) => ({...state, status: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state}),
  },
  {status: empty()},
);

import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {SetDetailsContainer} from 'state/entities/SetDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/setDetails/actions';

type ReducerState = SetDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    set: success(payload.set),
  }),
  throw: (state, {payload}) => ({...state, set: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state}),
  },
  {set: empty()},
);

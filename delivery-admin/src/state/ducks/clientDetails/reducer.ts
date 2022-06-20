import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {ClientDetailsContainer} from 'state/entities/ClientDetailsContainer';

type ReducerState = ClientDetailsContainer;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchDetailsCompleted: ReducerNextThrow<ReducerState, any> = {
  next: (state, {payload}) => ({
    ...state,
    client: success(payload.client),
  }),
  throw: (state, {payload}) => ({...state, client: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state, isVerifying: true}),
  },
  {client: empty()},
);

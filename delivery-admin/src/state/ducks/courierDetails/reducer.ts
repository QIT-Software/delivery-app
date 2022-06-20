import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {CourierDetailsContainer} from 'state/entities/CourierDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/courierDetails/actions';

type ReducerState = CourierDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    courier: success(payload.courier),
    groups: payload.groups,
  }),
  throw: (state, {payload}) => ({...state, courier: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state, isVerifying: true}),
  },
  {courier: empty(), groups: undefined},
);

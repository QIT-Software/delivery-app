import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import CouriersContainer from 'state/entities/CouriersContainer';
import Courier from 'entities/Courier';

type ReducerState = LoadableContainer<CouriersContainer>;

const fetchCourierCompleted: ReducerNextThrow<ReducerState, Courier[]> = {
  next: (_, {payload}) => success({couriers: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_COURIERS]: (state) => ({...state, isBusy: true}),
    [types.FETCH_COURIERS_COMPLETED]: fetchCourierCompleted,
  },
  empty(),
);

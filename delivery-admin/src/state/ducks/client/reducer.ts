import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import ClientsContainer from 'state/entities/ClientsContainer';
import Client from 'entities/Client';

type ReducerState = LoadableContainer<ClientsContainer>;

const fetchClientCompleted: ReducerNextThrow<ReducerState, Client[]> = {
  next: (_, {payload}) => success({clients: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_CLIENTS]: (state) => ({...state, isBusy: true}),
    [types.FETCH_CLIENTS_COMPLETED]: fetchClientCompleted,
  },
  empty(),
);

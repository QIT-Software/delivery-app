import {createAction} from 'redux-actions';
import types from './types';
import Client from 'entities/Client';

export default {
  fetchClients: createAction(types.FETCH_CLIENTS),
  fetchClientsCompleted: createAction<Client[]>(types.FETCH_CLIENTS_COMPLETED),
};

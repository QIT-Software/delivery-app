import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Client from 'entities/Client';
import UpdateClientInformationRequest from 'api/entities/UpdateUserInformationRequest';
import {NavigationPayload} from 'state/ducks/router/actions';

export type FetchDetailsCompleted = {
  client: Client;
};

export type UpdateClientInformation = {
  request: UpdateClientInformationRequest;
} & NavigationPayload;

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateClientInformationRequest: createAction<UpdateClientInformation>(
    types.UPDATE_CLIENT_INFORMATION,
  ),
  updateClientInformationRequestCompleted: createAction(
    types.UPDATE_CLIENT_INFORMATION_COMPLETED,
  ),
};

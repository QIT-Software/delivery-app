import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Courier from 'entities/Courier';
import UpdateCourierInformationRequest from 'api/entities/UpdateUserInformationRequest';
import {NavigationPayload} from 'state/ducks/router/actions';
import {DocumentsGroups, EvaluateDocumentsRevisionType} from 'entities/Documents';

export type FetchDetailsCompleted = {
  courier: Courier;
  groups: DocumentsGroups | undefined;
};

export type UpdateCourierInformation = {
  request: UpdateCourierInformationRequest;
} & NavigationPayload;

export type UpdateRevision = {
  courierId: ID;
  type: EvaluateDocumentsRevisionType;
  comment: string;
};

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateCourierInformationRequest: createAction<UpdateCourierInformation>(
    types.UPDATE_COURIER_INFORMATION,
  ),
  updateCourierInformationRequestCompleted: createAction(
    types.UPDATE_COURIER_INFORMATION_COMPLETED,
  ),
  evaluateDocumentsRevision: createAction<UpdateRevision>(
    types.EVALUATE_DOCUMENTS_REVISION,
  ),
};

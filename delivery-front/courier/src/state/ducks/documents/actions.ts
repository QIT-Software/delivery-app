import {createAction} from 'redux-actions';
import types from './types';
import {DocumentsGroup, DocumentsGroups, DocumentsRevision} from 'entities/Documents';
import {
  NavigateToImagePicker,
  NavigationPayload,
} from 'state/courier/ducks/router/actions';

export type FetchDocumentsCompleted = {
  revision: DocumentsRevision;
  groups: DocumentsGroups;
};
export type ChooseDocument = {
  group: DocumentsGroup;
} & NavigationPayload;

export default {
  chooseDocument: createAction<ChooseDocument>(types.CHOOSE_DOCUMENT),
  fetchDocuments: createAction(types.FETCH_DOCUMENTS),
  fetchDocumentsCompleted: createAction<FetchDocumentsCompleted>(
    types.FETCH_DOCUMENTS_COMPLETED,
  ),
  addDocument: createAction<{group: DocumentsGroup; imageUrl: string}>(
    types.ADD_DOCUMENT,
  ),
  deleteDocument: createAction<string>(types.DELETE_DOCUMENT),
  submit: createAction(types.SUBMIT),
  confirmSubmit: createAction(types.CONFIRM_SUBMIT),
  ImagePickerPick: createAction<NavigateToImagePicker>(types.IMAGE_PICKER_PICK),
};

import {all, put, select, takeEvery} from 'redux-saga/effects';
import {types} from 'state/courier/ducks/documents/index';
import {Action} from 'redux-actions';
import {DocumentsGroup, DocumentsGroups, DocumentsRevision} from 'entities/Documents';
import {alertActions} from 'state/ducks/alert';
import {SpoonAndForkApi} from 'api';
import State from 'state/courier/entities/State';
import actions, {
  ChooseDocument,
  FetchDocumentsCompleted,
} from 'state/courier/ducks/documents/actions';
import {DocumentsContainer} from 'state/courier/entities/DocumentsContainer';

function* fetchDocuments() {
  try {
    const revision: DocumentsRevision = yield SpoonAndForkApi.getCurrentRevision();
    const groups: DocumentsGroups = yield SpoonAndForkApi.getDocuments(revision.id);
    yield put(actions.fetchDocumentsCompleted({revision, groups}));
  } catch (e) {
    yield put(actions.fetchDocumentsCompleted(e));
  }
}

function* fetchDocumentsCompleted({payload, error}: Action<FetchDocumentsCompleted>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

function* chooseDocument({payload}: Action<ChooseDocument>) {
  yield put(
    actions.ImagePickerPick({
      submitAction: ({imageUrl}) => actions.addDocument({group: payload.group, imageUrl}),
    }),
  );
}

function* addDocument({payload}: Action<{group: DocumentsGroup; imageUrl: string}>) {
  try {
    const uploadFileId: string = yield SpoonAndForkApi.uploadFile(payload.imageUrl);
    yield SpoonAndForkApi.addDocuments(uploadFileId, payload.group);
    yield put(actions.fetchDocuments());
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* deleteDocument({payload}: Action<string>) {
  try {
    yield SpoonAndForkApi.deleteDocument(payload);
    yield put(actions.fetchDocuments());
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* submit() {
  yield put(
    alertActions.showMessage({
      message:
        'Your information will be sent to the administrator for further verification of documents',
      positiveAction: actions.confirmSubmit(),
      title: 'Accept?',
    }),
  );
}

function* confirmSubmit() {
  const {revision}: DocumentsContainer = yield select((state: State) => state.documents);
  try {
    if (revision) {
      yield SpoonAndForkApi.requestDocumentsRevisionVerification(revision.id);
      yield put(actions.fetchDocuments());
    }
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_DOCUMENTS, fetchDocuments),
    takeEvery(types.FETCH_DOCUMENTS_COMPLETED, fetchDocumentsCompleted),
    takeEvery(types.CHOOSE_DOCUMENT, chooseDocument),
    takeEvery(types.ADD_DOCUMENT, addDocument),
    takeEvery(types.DELETE_DOCUMENT, deleteDocument),
    takeEvery(types.SUBMIT, submit),
    takeEvery(types.CONFIRM_SUBMIT, confirmSubmit),
  ]);
}

import {Action, handleActions} from 'redux-actions';
import types from './types';
import {DocumentsContainer} from 'state/courier/entities/DocumentsContainer';
import {FetchDocumentsCompleted} from 'state/courier/ducks/documents/actions';

type ReducerState = DocumentsContainer;

const fetchDocumentCompleted = (
  state: ReducerState,
  {payload}: Action<FetchDocumentsCompleted>,
): ReducerState => {
  return {
    ...state,
    revision: payload.revision,
    groups: payload.groups,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DOCUMENTS_COMPLETED]: fetchDocumentCompleted,
    [types.SUBMIT]: (state) => ({...state, isVerifying: true}),
  },
  {
    revision: undefined,
    groups: {
      employmentAgreement: [],
      driversLicense: [],
    },
  },
);

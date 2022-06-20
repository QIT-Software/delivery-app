import {AnyAction} from 'redux';
import {createAction} from 'redux-actions';
import types from './types';

export interface ShowMessagePayload {
  title: string;
  message: string;
  positiveAction?: AnyAction;
}

export interface ShowErrorPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  positiveAction?: AnyAction;
}

export default {
  showMessage: createAction<ShowMessagePayload>(types.SHOW_MESSAGE),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showError: createAction<ShowErrorPayload | any>(types.SHOW_ERROR),
  showSnackbar: createAction<{title: string}>(types.SNACKBAR),
};

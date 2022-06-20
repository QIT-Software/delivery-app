/* eslint-disable @typescript-eslint/no-explicit-any */
import {AnyAction} from 'redux';
import {createAction} from 'redux-actions';
import types from './types';

export interface ShowMessagePayload {
  title: string;
  message: string;
  positiveAction?: AnyAction;
  negativeAction?: AnyAction;
}

export interface ShowErrorPayload {
  error: any;
  positiveAction?: AnyAction;
}

export default {
  showMessage: createAction<ShowMessagePayload>(types.SHOW_MESSAGE),
  showError: createAction<ShowErrorPayload | any>(types.SHOW_ERROR),
  showSnackbar: createAction<{title: string}>(types.SNACKBAR),
};

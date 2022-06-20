import {all, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import {AlertService} from 'services';
import Snackbar from 'react-native-snackbar';
import {ShowErrorPayload, ShowMessagePayload} from 'state/ducks/alert/actions';
import {getDispatch} from 'state';
import {AlertCallback} from 'services/IAlertService';
import {getErrorDetails} from 'utils/ErrorUtils';

function processError({error, positiveAction}: ShowErrorPayload) {
  const details = getErrorDetails(error);

  const dispatch = getDispatch();

  let positiveButton: AlertCallback | undefined;

  if (positiveAction) {
    positiveButton = () => dispatch(positiveAction);
  }

  AlertService.showError(details, undefined, 'OK', positiveButton);
}

function showError({payload, error}: Action<ShowErrorPayload>) {
  if (error) {
    processError({error: payload});
    return;
  }

  processError({error: payload});
}

function showMessage({payload}: Action<ShowMessagePayload>) {
  const dispatch = getDispatch();

  let positiveButton: AlertCallback | undefined;

  let negativeButton: AlertCallback | undefined;

  const {negativeAction} = payload;
  const {positiveAction} = payload;
  if (positiveAction) {
    positiveButton = () => dispatch(positiveAction);
  }

  if (negativeAction) {
    negativeButton = () => dispatch(negativeAction);
  }

  AlertService.showMessage(
    payload.title,
    payload.message,
    'OK',
    positiveButton,
    'Cancel',
    negativeButton,
  );
}

function showSnackbar({payload}: Action<{title: string}>) {
  Snackbar.show({
    text: payload.title,
    duration: Snackbar.LENGTH_LONG,
  });
}

export default function* () {
  yield all([
    //
    takeEvery(types.SHOW_ERROR, showError),
    takeEvery(types.SHOW_MESSAGE, showMessage),
    takeEvery(types.SNACKBAR, showSnackbar),
  ]);
}

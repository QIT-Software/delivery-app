import {all, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
// import {AlertService} from 'services';
// import Snackbar from 'react-native-snackbar';
import {ShowErrorPayload, ShowMessagePayload} from 'state/ducks/alert/actions';
// import {getDispatch} from 'state/index';
// import {AlertCallback} from 'services/IAlertService';

export function processError({error}: ShowErrorPayload) {
  let message: string;
  if (error.data) {
    message = JSON.stringify(error.data);
  } else if (
    error.graphQLErrors &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].message
  ) {
    message = JSON.stringify(error.graphQLErrors[0].message);
  } else {
    message = JSON.stringify(error);
  }
  return message;
  // const dispatch = getDispatch();

  // let positiveButton: AlertCallback | undefined;
  //
  // if (positiveAction) {
  //   positiveButton = () => dispatch(positiveAction);
  // }
  //
  // AlertService.showError(message, undefined, 'OK', positiveButton);
}

function showError({payload, error}: Action<ShowErrorPayload>) {
  if (error) {
    processError({error: payload});
    return;
  }

  processError(payload);
}

function showMessage({payload}: Action<ShowMessagePayload>) {
  // const dispatch = getDispatch();
  //
  // let positiveButton: AlertCallback | undefined;

  const {positiveAction} = payload;
  if (positiveAction) {
    // positiveButton = () => dispatch(positiveAction);
  }

  // AlertService.showMessage(payload.title, payload.message, 'OK', positiveButton);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showSnackbar({payload}: Action<{title: string}>) {
  // Snackbar.show({
  //   title: payload.title,
  //   duration: Snackbar.LENGTH_LONG,
  // });
}

export default function* () {
  yield all([
    //
    takeEvery(types.SHOW_ERROR, showError),
    takeEvery(types.SHOW_MESSAGE, showMessage),
    takeEvery(types.SNACKBAR, showSnackbar),
  ]);
}

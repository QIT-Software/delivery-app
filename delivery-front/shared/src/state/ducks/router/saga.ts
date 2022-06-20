import {all, takeEvery} from 'redux-saga/effects';
import {NavigateFromUserId, NavigationPayload} from 'state/ducks/router/actions';
import {Action} from 'redux-actions';
import types from './types';

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

function navigateToAuth({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth');
}

function navigateToForgotPassword({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth/forgotPassword');
}

function navigateToSignUp({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth/signUp');
}

function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToImagePicker({payload}: Action<NavigateFromUserId>) {
  payload.history.push(`/settings/${payload.userId}/imagePickerPopUp`);
}

function navigateToDocumentPicker({payload}: Action<NavigateFromUserId>) {
  payload.history.push(`/settings/${payload.userId}/documentPickerPopUp`);
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_AUTH, navigateToAuth),
    takeEvery(types.NAVIGATE_TO_FORGOT_PASSWORD, navigateToForgotPassword),
    takeEvery(types.NAVIGATE_TO_SIGN_UP, navigateToSignUp),
    takeEvery(types.NAVIGATE_TO_IMAGE_PICKER, navigateToImagePicker),
    takeEvery(types.NAVIGATE_TO_DOCUMENT_PICKER, navigateToDocumentPicker),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
  ]);
}

import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {
  NavigateToImagePickerSubmitAction,
  NavigationPayload,
} from 'state/courier/ducks/router/actions';
import {errorActions} from 'state/ducks/error';
import sessionActions from 'state/ducks/session/actions';
import {addImageUri} from 'state/courier/ducks/imagePicker/actions';
import {routerActions} from 'state/courier/ducks/router';

export type ConfirmType = {
  confirmAction: NavigateToImagePickerSubmitAction;
  uri: string;
} & NavigationPayload;

function* addImage({payload}: Action<addImageUri>) {
  try {
    const {imageUri} = payload;
    const imageId: string = yield SpoonAndForkApi.uploadFile(imageUri);
    yield SpoonAndForkApi.updateUserProfileImage(imageId);
    yield put(sessionActions.updateProfileImageCompleted(imageId));
    yield put(sessionActions.fetchSession());
    yield put(sessionActions.setSessionExists(true));
    yield put(routerActions.goBack({history: payload.history}));
  } catch (e) {
    yield put(errorActions.handleError(e));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.ADD_IMAGE, addImage),
  ]);
}

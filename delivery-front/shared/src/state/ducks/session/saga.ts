import {all, put, takeEvery} from 'redux-saga/effects';
import {SpoonAndForkApi} from 'api';
import types from './types';
import actions, {Update} from './actions';
import {actions as alertActions} from '../alert';
import {actions as routerActions} from 'state/client/ducks/router';
import sessionActions from 'state/ducks/session/actions';
import {errorActions} from '../error';
import {Account} from 'entities/Account';
import {Action} from 'redux-actions';
import {actions as docActions} from 'state/courier/ducks/documents';

function* updateMyAccount({payload}: Action<Update>) {
  try {
    const account: Account = yield SpoonAndForkApi.updateUserProfile(payload.request);
    yield put(actions.updateUserProfileCompleted(account));
    yield put(routerActions.goBack({history: payload.history}));
    yield put(alertActions.showSnackbar({title: 'Profile saved!!'}));
  } catch (e) {
    yield put(errorActions.handleError(e));
  }
}
function* updateProfileImage({payload}: Action<{imageUrl: string}>) {
  try {
    const imageId: string = yield SpoonAndForkApi.uploadFile(payload.imageUrl);
    yield SpoonAndForkApi.updateUserProfileImage(imageId);
    yield put(actions.updateProfileImageCompleted(imageId));
    yield put(sessionActions.fetchSession());
    yield put(sessionActions.setSessionExists(true));
  } catch (e) {
    yield put(errorActions.handleError(e));
  }
}

function* chooseNewImage() {
  yield put(
    docActions.ImagePickerPick({
      submitAction: actions.updateProfileImage,
    }),
  );
}
function* fetchSession() {
  try {
    const account: Account = yield SpoonAndForkApi.myAccount();
    yield put(sessionActions.fetchUserCompleted(account));
    yield put(sessionActions.setSessionExists(true));
  } catch (e) {
    yield put(sessionActions.fetchUserCompleted(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.UPDATE_USER_PROFILE, updateMyAccount),
    takeEvery(types.UPDATE_PROFILE_IMAGE, updateProfileImage),
    takeEvery(types.CHOOSE_NEW_IMAGE, chooseNewImage),
    takeEvery(types.FETCH_SESSION, fetchSession),
  ]);
}

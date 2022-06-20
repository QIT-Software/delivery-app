import {all, put, takeEvery} from 'redux-saga/effects';
import {SpoonAndForkApi as Api, SpoonAndForkApi} from 'api';
import {Action} from 'redux-actions';
import actions from './actions';
import {Account} from 'entities/Account';
import types from './types';
import {actions as alertActions} from '../alert';
import sessionActions from 'state/ducks/session/actions';

function* updateMyAccount() {
  try {
    // const account: Account = yield SpoonAndForkApi.updateUserProfile(payload);
    // yield put(actions.updateUserProfileCompleted(account));
    // yield put(routerActions.goBack(payload));
    yield put(alertActions.showSnackbar({title: 'Profile saved!!'}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* updateProfileImage({payload}: Action<File | string | undefined>) {
  try {
    if (payload && typeof payload !== 'string') {
      const imageId: string = yield Api.uploadFile(payload);
      yield SpoonAndForkApi.updateUserProfileImage(imageId);
      yield put(actions.updateProfileImageCompleted(imageId));
      yield put(sessionActions.fetchSession());
      yield put(sessionActions.setSessionExists(true));
    }
  } catch (e) {
    yield put(alertActions.showError(e));
  }
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
  yield all([takeEvery(types.UPDATE_USER_PROFILE, updateMyAccount)]);
  yield all([takeEvery(types.UPDATE_PROFILE_IMAGE, updateProfileImage)]);
  yield all([takeEvery(types.FETCH_SESSION, fetchSession)]);
}

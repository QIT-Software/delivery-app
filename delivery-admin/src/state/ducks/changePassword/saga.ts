import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {actions as alertActions} from '../alert';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {ChangePasswordRequest} from 'api/entities/ChangePasswordRequest';

function* changePassword({payload}: Action<ChangePasswordRequest>) {
  try {
    yield SpoonAndForkApi.updateUserPassword(payload.oldPassword, payload.password);
    yield put(actions.passwordChanged());
  } catch (e) {
    yield put(actions.passwordChanged(e));
  }
}

function* passwordChanged({payload, error}: Action<ChangePasswordRequest>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }

  // yield put(routerActions.goBack()); // todo
  yield put(alertActions.showSnackbar({title: 'Password has been changed!'}));
}

export default function* () {
  yield all([
    //
    takeEvery(types.CHANGE_PASSWORD, changePassword),
    takeEvery(types.PASSWORD_CHANGED, passwordChanged),
  ]);
}

import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import sessionActions from '../session/actions';
import routerActions, {NavigationPayload} from '../router/actions';
import Session from '@spryrocks/react-auth/Session';
import {SpoonAndForkApi as Api} from 'api';
import {AuthInfoKeeper} from 'auth';
import {mapLoginRequestToApi, mapRegisterRequestToApi} from 'api/Mappers';
import actions, {AuthCompleted, Login, RecoverPassword, RegisterUser} from './actions';
import {actions as snackActions} from '../snackBar';
import {processError} from '../alert/saga';

function* registerUser({payload: {request, history}}: Action<RegisterUser>) {
  try {
    const session: Session = yield Api.register(mapRegisterRequestToApi(request));
    yield put(actions.authCompleted({session, history}));
  } catch (e) {
    yield put(actions.authCompleted(e));
  }
}

function* authCompleted({payload, error}: Action<AuthCompleted>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }

  yield AuthInfoKeeper.authenticate(payload.session);
  yield put(sessionActions.setSessionExists(true));
  yield put(routerActions.navigateToMain(payload));
  yield put(sessionActions.fetchSession());
}

function* logout({payload}: Action<NavigationPayload>) {
  yield AuthInfoKeeper.reset();
  yield put(routerActions.navigateToAuth(payload));
}

function* loginUser({payload}: Action<Login>) {
  try {
    const session: Session = yield Api.login(mapLoginRequestToApi(payload.request));
    yield put(actions.authCompleted({session, history: payload.history}));
  } catch (e) {
    yield put(actions.authCompleted(e));
  }
}

function* recoverPassword({payload: {request, history}}: Action<RecoverPassword>) {
  try {
    yield Api.forgotPassword(request);
    yield put(actions.recoverPasswordCompleted({history}));
  } catch (e) {
    yield put(actions.recoverPasswordCompleted(e));
  }
}

function* recoverPasswordCompleted({payload, error}: Action<NavigationPayload>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }
  yield put(
    snackActions.showSnackbar({
      message: 'Password successfully changed!',
      type: 'success',
    }),
  );
  yield put(routerActions.goBack(payload));
}

function* chooseAvatar() {
  yield put(
    routerActions.navigateToImagePicker({
      submitAction: actions.chooseAvatarCompleted,
    }),
  );
}

export default function* () {
  yield all([
    takeEvery(types.LOGOUT, logout),
    takeEvery(types.REGISTER_USER, registerUser),
    takeEvery(types.AUTH_COMPLETED, authCompleted),
    takeEvery(types.LOGIN_USER, loginUser),
    takeEvery(types.RECOVER_PASSWORD, recoverPassword),
    takeEvery(types.RECOVER_PASSWORD_COMPLETED, recoverPasswordCompleted),
    takeEvery(types.CHOOSE_AVATAR, chooseAvatar),
  ]);
}

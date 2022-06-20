import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import Session from '@spryrocks/react-auth/Session';
import {SpoonAndForkApi as Api} from 'api';
import {AuthInfoKeeper} from 'auth';
import {mapLoginRequestToApi, mapRegisterRequestToApi} from 'api/Mappers';
import actions, {AuthCompleted, Login, RecoverPassword, RegisterUser} from './actions';
import {actions as snackActions} from '../snackBar';
import {actions as sessionActions} from '../session';
import {actions as routerActions} from '../router';
import {NavigationPayload} from '../router/actions';
import {errorActions} from '../error';
import {alertActions} from '../alert';
import {isClient} from 'app/Config';

function* registerUser({payload}: Action<RegisterUser>) {
  try {
    const session: Session = yield Api.register(mapRegisterRequestToApi(payload.request));
    yield put(actions.authCompleted({session, history: payload.history}));
  } catch (e) {
    yield put(actions.authCompleted(e));
  }
}

function* authCompleted({payload, error}: Action<AuthCompleted>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }

  yield AuthInfoKeeper.authenticate(payload.session);

  yield put(sessionActions.setSessionExists(true));
  if (isClient()) {
    yield put(routerActions.goBack(payload));
  } else {
    yield put(routerActions.navigateToMain(payload));
  }

  yield put(sessionActions.fetchSession(payload));
}

function* logout({payload}: Action<NavigationPayload>) {
  yield AuthInfoKeeper.reset();
  yield put(routerActions.navigateToAuth(payload));
}

function* login({payload}: Action<Login>) {
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
    yield put(yield put(errorActions.handleError(payload)));
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

function* chooseAddress() {
  yield put(
    routerActions.navigateToAddressDropMenu({
      submitAction: ({address}) => actions.chooseAddressComplete({address}),
    }),
  );
}

export default function* () {
  yield all([
    takeEvery(types.LOGOUT, logout),
    takeEvery(types.REGISTER_USER, registerUser),
    takeEvery(types.AUTH_COMPLETED, authCompleted),
    takeEvery(types.LOGIN_USER, login),
    takeEvery(types.RECOVER_PASSWORD, recoverPassword),
    takeEvery(types.RECOVER_PASSWORD_COMPLETED, recoverPasswordCompleted),
    takeEvery(types.CHOOSE_ADDRESS, chooseAddress),
  ]);
}

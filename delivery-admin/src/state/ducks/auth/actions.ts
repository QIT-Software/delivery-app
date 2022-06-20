import {createAction} from 'redux-actions';
import types from './types';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import RegisterRequest from 'auth/RegisterRequest';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import Session from '@spryrocks/react-auth/Session';
import {NavigationPayload} from 'state/ducks/router/actions';

export type RegisterUser = {request: RegisterRequest} & NavigationPayload;
export type AuthCompleted = {session: Session} & NavigationPayload;
export type Login = {request: LoginRequest} & NavigationPayload;
export type RecoverPassword = {request: ForgotPasswordRequest} & NavigationPayload;

export default {
  registerUser: createAction<RegisterUser>(types.REGISTER_USER),
  login: createAction<Login>(types.LOGIN_USER),
  authCompleted: createAction<AuthCompleted>(types.AUTH_COMPLETED),
  logout: createAction<NavigationPayload>(types.LOGOUT),
  recoverPassword: createAction<RecoverPassword>(types.RECOVER_PASSWORD),
  recoverPasswordCompleted: createAction<NavigationPayload>(
    types.RECOVER_PASSWORD_COMPLETED,
  ),
  setIsChecking: createAction<boolean>(types.SET_IS_CHECKING),
  chooseAvatar: createAction(types.CHOOSE_AVATAR),
  chooseAvatarCompleted: createAction<{imageUrl: string}>(types.CHOOSE_AVATAR_COMPLETED),
};

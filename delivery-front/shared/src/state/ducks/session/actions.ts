import {createAction} from 'redux-actions';
import types from './types';
import {Account} from 'entities/Account';
import UpdateUserRequest from './models';
import {NavigationPayload} from '../router/actions';

export type Update = {request: UpdateUserRequest} & NavigationPayload;

export default {
  fetchSession: createAction(types.FETCH_SESSION),
  setSessionExists: createAction<boolean>(types.SET_SESSION_EXISTS),
  fetchUserAccount: createAction(types.FETCH_USER_ACCOUNT),
  fetchUserCompleted: createAction<Account>(types.FETCH_USER_COMPLETED),
  updateUserProfile: createAction<Update>(types.UPDATE_USER_PROFILE),
  updateUserProfileCompleted: createAction<Account>(types.UPDATE_USER_PROFILE_COMPLETED),
  updateProfileImage: createAction<{imageUrl: string}>(types.UPDATE_PROFILE_IMAGE),
  chooseNewImage: createAction(types.CHOOSE_NEW_IMAGE),
  updateProfileImageCompleted: createAction(types.UPDATE_PROFILE_IMAGE_COMPLETED),
};

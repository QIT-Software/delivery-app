import {createAction} from 'redux-actions';
import types from './types';
import {Account} from 'entities/Account';
import UpdateUserRequest from './models';

export default {
  fetchSession: createAction(types.FETCH_SESSION),
  setSessionExists: createAction<boolean>(types.SET_SESSION_EXISTS),
  fetchUserAccount: createAction(types.FETCH_USER_ACCOUNT),
  fetchUserCompleted: createAction<Account>(types.FETCH_USER_COMPLETED),
  updateUserProfile: createAction<UpdateUserRequest>(types.UPDATE_USER_PROFILE),
  updateUserProfileCompleted: createAction<Account>(types.UPDATE_USER_PROFILE_COMPLETED),
  updateProfileImage: createAction<File | string | undefined>(types.UPDATE_PROFILE_IMAGE),
  updateProfileImageCompleted: createAction(types.UPDATE_PROFILE_IMAGE_COMPLETED),
};

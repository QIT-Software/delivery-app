import {createAction} from 'redux-actions';
import types from './types';
import {ChangePasswordRequest} from 'api/entities/ChangePasswordRequest';

export default {
  changePassword: createAction<ChangePasswordRequest>(types.CHANGE_PASSWORD),
  passwordChanged: createAction(types.PASSWORD_CHANGED),
};

import {createAction} from 'redux-actions';
import types from './types';
import {EmailForSpam} from 'state/entities/EmailForSpam';

export default {
  createEmailForSpam: createAction<EmailForSpam>(types.CREATE_EMAIL_FOR_SPAM),
};

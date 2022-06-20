import {all, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {alertActions} from 'state/ducks/alert';
import {EmailForSpam} from 'state/entities/EmailForSpam';

function* createEmailForSpam({payload}: Action<EmailForSpam>) {
  try {
    yield SpoonAndForkApi.createEmailForSpam(payload);
  } catch (e) {
    // console.log(JSON.stringify(e));
    alertActions.showError(e);
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.CREATE_EMAIL_FOR_SPAM, createEmailForSpam),
  ]);
}

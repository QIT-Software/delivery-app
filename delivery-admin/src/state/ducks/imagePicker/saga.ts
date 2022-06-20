import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
// import {actions as routerActions} from 'state/client/ducks/router';
import {NavigateToImagePickerSubmitAction} from 'state/ducks/router/actions';

export type ConfirmType = {confirmAction: NavigateToImagePickerSubmitAction; uri: string};

function* confirm({payload}: Action<ConfirmType>) {
  // yield put(routerActions.goBack());
  yield put(payload.confirmAction({imageUrl: payload.uri}));
}

export default function* () {
  yield all([
    //
    takeEvery(types.CONFIRM, confirm),
  ]);
}

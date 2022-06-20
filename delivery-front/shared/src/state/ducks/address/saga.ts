import {all, put, select, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import {NavigateToAddressDropMenuSubmitAction} from 'state/ducks/router/actions';
import {State} from 'state/entities/State';
import actions from './actions';
import {actions as routerActions} from 'state/ducks/router';
import {UserLocation} from 'state/entities/UserAddress';
import {SpoonAndForkApi} from 'api';
import {alertActions} from 'state/ducks/alert';

function* chooseAddress({
  payload,
}: Action<{
  location: UserLocation;
  confirmAction: NavigateToAddressDropMenuSubmitAction;
}>) {
  yield select((state: State) => state.address);
  yield put(actions.chooseAddressComplete(payload.location));
}

function* confirm({
  payload,
}: Action<{confirmAction: NavigateToAddressDropMenuSubmitAction}>) {
  const state = yield select((state: State) => state.address);
  yield put(payload.confirmAction({address: state.location}));
  yield put(routerActions.goBack());
}

function* createAddress({payload}: Action<UserLocation>) {
  try {
    yield SpoonAndForkApi.createAddress(payload);
  } catch (e) {
    alertActions.showError(e);
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.CONFIRM, confirm),
    takeEvery(types.CHOOSE_ADDRESS, chooseAddress),
    takeEvery(types.CHOOSE_ADDRESS, createAddress),
  ]);
}

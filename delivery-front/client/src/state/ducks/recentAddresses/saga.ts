import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {SpoonAndForkApi} from 'api/index';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';
import Address from 'entities/Address';

function* fetchRecentAddresses() {
  try {
    const recentAddresses: Address[] = yield SpoonAndForkApi.getClientOrdersAddresses();
    yield put(actions.fetchRecentAddressesCompleted({recentAddresses}));
  } catch (e) {
    yield put(actions.fetchRecentAddressesCompleted(e));
  }
}

function* fetchRecentAddressesCompleted({payload, error}: Action<Address[]>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_RECENT_ADDRESSES, fetchRecentAddresses),
    takeEvery(types.FETCH_RECENT_ADDRESSES_COMPLETED, fetchRecentAddressesCompleted),
  ]);
}

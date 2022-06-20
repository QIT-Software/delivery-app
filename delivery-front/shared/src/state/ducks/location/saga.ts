import types from './types';
import actions from './actions';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api';
import {LocationService} from 'services';
import {alertActions} from 'state/ducks/alert';
import {UserLocation} from 'state/entities/UserAddress';

function* requestLocationPermission() {
  yield LocationService.requestPermissionLocation();
}

function* checkLocationPermissionAlways() {
  const status = yield LocationService.checkPermissionLocationAlways();
  yield put(actions.locationAlwaysPermissionChecked(status));
}

function* locationUpdated({payload}: Action<UserLocation>) {
  try {
    yield SpoonAndForkApi.createAddress(payload);
  } catch (e) {
    alertActions.showError(e);
  }
}

function* openSettings() {
  yield LocationService.openSettings();
}

export default function* () {
  yield all([
    takeEvery(types.LOCATION_UPDATED, locationUpdated),
    takeEvery(types.REQUEST_LOCATION_PERMISSION, requestLocationPermission),
    takeEvery(types.CHECK_LOCATION_PERMISSION_ALWAYS, checkLocationPermissionAlways),
    takeEvery(types.OPEN_SETTINGS, openSettings),
  ]);
}

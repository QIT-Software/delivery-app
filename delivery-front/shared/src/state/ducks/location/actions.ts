import {createAction} from 'redux-actions';
import types from './types';
import LatLng from 'entities/LatLng';

export default {
  locationUpdated: createAction<LatLng>(types.LOCATION_UPDATED),
  requestLocationPermission: createAction(types.REQUEST_LOCATION_PERMISSION),
  checkPermissionLocationAlways: createAction(types.CHECK_LOCATION_PERMISSION_ALWAYS),
  locationAlwaysPermissionChecked: createAction(types.LOCATION_PERMISSION_ALWAYS_CHECKED),
  openSettings: createAction(types.OPEN_SETTINGS),
};

import ILocationService from 'services/ILocationService';
import Geolocation from '@react-native-community/geolocation';
import {AnyAction} from 'redux';
import {getDispatch} from 'state';
import {actions} from 'state/ducks/location';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import {locationAlwaysStatus} from 'state/entities/LocationContainer';
import {alertActions} from 'state/ducks/alert';

const dispatch = (action: AnyAction) => getDispatch()(action);

export default class LocationService implements ILocationService {
  // eslint-disable-next-line class-methods-use-this
  async requestPermissionLocation() {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    return request(permission);
  }

  // eslint-disable-next-line class-methods-use-this
  async checkPermissionLocationAlways() {
    if (Platform.OS !== 'ios') return;
    return check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            return locationAlwaysStatus.UNAVAILABLE;
          case RESULTS.DENIED:
            return locationAlwaysStatus.DENIED;
          case RESULTS.GRANTED:
            return locationAlwaysStatus.GRANTED;
          case RESULTS.BLOCKED:
            return locationAlwaysStatus.BLOCKED;
        }
      })
      .catch((error) => {
        alertActions.showError(error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  async openSettings() {
    openSettings().catch((e) => alertActions.showError(e));
  }

  // eslint-disable-next-line class-methods-use-this
  async requestCurrentPosition() {
    await Geolocation.stopObserving();
    await Geolocation.watchPosition(
      (info) => {
        dispatch(
          actions.locationUpdated({
            lat: info.coords.latitude,
            lng: info.coords.longitude,
          }),
        );
      },
      (error) => {
        alertActions.showError(error);
      },
      {
        distanceFilter: 100,
        timeout: 30000,
        useSignificantChanges: true,
        maximumAge: 1000,
        enableHighAccuracy: true,
      },
    );
  }
}

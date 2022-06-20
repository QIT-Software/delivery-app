import LatLng from 'entities/LatLng';

export enum locationAlwaysStatus {
  UNAVAILABLE = 'unavailable',
  DENIED = 'denied',
  BLOCKED = 'blocked',
  GRANTED = 'granted',
}

export interface LocationContainer {
  location: LatLng | undefined;
  locationAlwaysStatus: locationAlwaysStatus | undefined;
}

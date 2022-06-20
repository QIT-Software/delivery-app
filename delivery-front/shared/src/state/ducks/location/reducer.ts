import {handleActions, Reducer} from 'redux-actions';
import types from './types';
import {LocationContainer} from 'state/entities/LocationContainer';
import LatLng from 'entities/LatLng';

type ReducerState = LocationContainer;

const locationUpdated: Reducer<ReducerState, LatLng> = (state, {payload}) => ({
  ...state,
  location: payload,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LocationPermissionAlwaysChecked: Reducer<ReducerState, any> = (
  state,
  {payload},
) => ({
  ...state,
  locationAlwaysStatus: payload,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.LOCATION_UPDATED]: locationUpdated,
    [types.LOCATION_PERMISSION_ALWAYS_CHECKED]: LocationPermissionAlwaysChecked,
  },
  {
    location: undefined,
    locationAlwaysStatus: undefined,
  },
);

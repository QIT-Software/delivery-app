import {handleActions, Reducer} from 'redux-actions';
import {UserLocation, UserLocationContainer} from 'state/entities/UserAddress';
import types from './types';

type ReducerState = UserLocationContainer;

const chooseAddressComplete: Reducer<ReducerState, UserLocation> = (state, {payload}) => {
  return {
    ...state,
    location: payload,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.CHOOSE_ADDRESS_COMPLETE]: chooseAddressComplete,
  },
  {location: undefined},
);

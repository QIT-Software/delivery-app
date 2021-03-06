import {Action, handleActions} from 'redux-actions';
import types from './types';
import {Auth} from 'state/entities/Auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<Auth, any>(
  {
    [types.LOGIN_USER]: (state) => ({...state, isBusy: true}),
    [types.REGISTER_USER]: (state) => ({...state, isBusy: true}),
    [types.AUTH_COMPLETED]: (state) => ({...state, isBusy: false}),
    [types.SET_IS_CHECKING]: (state, {payload}: Action<boolean>) => ({
      ...state,
      isChecking: payload,
    }),
    [types.CHOOSE_ADDRESS_COMPLETED]: (state, {payload}) => ({
      ...state,
      address: payload.address,
    }),
  },
  {isBusy: false, isChecking: false, isLoading: false, address: undefined},
);

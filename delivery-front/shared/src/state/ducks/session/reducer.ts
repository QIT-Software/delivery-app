import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {SessionContainer} from '../../entities/Session';
import {empty, loading, success, failed} from '../../entities/LoadableContainer';
import {Account} from 'entities/Account';

const initialState: SessionContainer = {
  exists: false,
  ...empty(),
  isBusy: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setSessionExists: ReducerNextThrow<SessionContainer, any> = {
  next: (state, {payload}) => ({...state, exists: payload}),
};

const fetchUserAccountCompleted: ReducerNextThrow<SessionContainer, Account> = {
  next: (state, {payload}) => ({...state, ...success({account: payload, isBusy: false})}),
  throw: (state, {payload}) => ({...state, ...failed(payload)}),
};

const updateMyAccountCompleted: ReducerNextThrow<SessionContainer, Account> = {
  next: (state, {payload}) => ({
    ...state,
    ...success({}),
    account: payload,
    isBusy: false,
  }),
  throw: (state, {payload}) => ({...state, ...failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<SessionContainer, any>(
  {
    [types.SET_SESSION_EXISTS]: setSessionExists,
    [types.FETCH_USER_ACCOUNT]: (state) =>
      state.exists
        ? {exists: true, ...loading(state), isBusy: false}
        : {exists: false, isBusy: false},
    [types.FETCH_USER_COMPLETED]: fetchUserAccountCompleted,
    [types.UPDATE_USER_PROFILE]: (state) => {
      return {...state, isBusy: true};
    },
    [types.UPDATE_USER_PROFILE_COMPLETED]: updateMyAccountCompleted,
  },
  initialState,
);

// export default handleActions<SessionContainer, any>(
//   {
//     [types.SET_SESSION_EXISTS]: setSessionExists,
//     [types.FETCH_USER_ACCOUNT]: (state) =>
//       state.exists ? {exists: true, ...loading(state)} : {exists: false},
//     [types.FETCH_USER_COMPLETED]: fetchUserAccountCompleted,
//     [types.UPDATE_USER_PROFILE_COMPLETED]: updateMyAccountCompleted,
//   },
//   initialState,
// );

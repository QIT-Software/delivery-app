import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {SessionContainer} from 'state/entities/Session';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import {Account} from 'entities/Account';

const initialState: SessionContainer = {
  exists: false,
  ...empty(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setSessionExists: ReducerNextThrow<SessionContainer, any> = {
  next: (state, {payload}) => ({...state, exists: payload}),
};

const fetchUserAccountCompleted: ReducerNextThrow<SessionContainer, Account> = {
  next: (state, {payload}) => ({...state, ...success({account: payload})}),
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  throw: (_, {payload}) => failed(payload),
};

const updateMyAccountCompleted: ReducerNextThrow<SessionContainer, Account> = {
  next: (state, {payload}) => ({...state, ...success({}), account: payload}),
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<SessionContainer, any>(
  {
    [types.SET_SESSION_EXISTS]: setSessionExists,
    [types.FETCH_USER_ACCOUNT]: (state) =>
      state.exists ? {exists: true, ...loading(state)} : {exists: false},
    [types.FETCH_USER_COMPLETED]: fetchUserAccountCompleted,
    [types.UPDATE_USER_PROFILE_COMPLETED]: updateMyAccountCompleted,
  },
  initialState,
);

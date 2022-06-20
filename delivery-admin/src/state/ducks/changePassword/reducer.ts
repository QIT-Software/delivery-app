import {handleActions} from 'redux-actions';

import types from './types';
import ChangePassword from 'entities/ChangePassword';

type ReducerState = ChangePassword;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.CHANGE_PASSWORD]: (state) => ({...state, isBusy: true}),
    [types.PASSWORD_CHANGED]: (state) => ({...state, isBusy: false}),
  },
  {isBusy: false},
);

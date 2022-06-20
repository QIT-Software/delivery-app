import {Action, handleActions} from 'redux-actions';
import types from './types';
import {SnackBar, SnackBarType} from '../../entities/SnackBar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<SnackBar, any>(
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [types.OPEN]: (state, {payload}: Action<{message: any; type: SnackBarType}>) => ({
      ...state,
      snackBarType: payload.type,
      snackbarMessage: payload.message,
      snackbarOpen: true,
    }),
    [types.CLEAR]: (state) => ({...state, snackbarOpen: false}),
  },
  {snackbarOpen: false, snackBarType: 'info', snackbarMessage: undefined},
);

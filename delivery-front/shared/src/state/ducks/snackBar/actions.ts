import {createAction} from 'redux-actions';
import types from './types';
import {SnackBarType} from '../../entities/SnackBar';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showSnackbar: createAction<{message: any; type: SnackBarType}>(types.OPEN),
  clearSnackbar: createAction(types.CLEAR),
};

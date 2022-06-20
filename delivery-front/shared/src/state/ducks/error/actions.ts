import {createAction} from 'redux-actions';
import types from './types';

export default {
  handleError: createAction(types.HANDLE_ERROR),
};

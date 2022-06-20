import {createAction} from 'redux-actions';
import types from './types';
import {ConfirmType} from 'state/ducks/imagePicker/saga';

export default {
  confirm: createAction<ConfirmType>(types.CONFIRM),
};

import {createAction} from 'redux-actions';
import types from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MessageReceived = {data?: any};

export default {
  updateToken: createAction(types.UPDATE_TOKEN),
};

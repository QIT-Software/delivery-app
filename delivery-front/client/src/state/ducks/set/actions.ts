import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type FetchSet = {id: string} & NavigationPayload;

export default {
  fetchSet: createAction<FetchSet>(types.FETCH_SET),
  fetchSetComplete: createAction(types.FETCH_SET_COMPLETE),
};

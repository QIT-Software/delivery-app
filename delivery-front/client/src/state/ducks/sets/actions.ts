import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type FetchSets = {id: string} & NavigationPayload;

export default {
  fetchSets: createAction<FetchSets>(types.FETCH_SETS),
  fetchSetsComplete: createAction(types.FETCH_SETS_COMPLETE),
};

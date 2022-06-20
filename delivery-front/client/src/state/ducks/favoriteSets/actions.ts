import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type FetchSets = {id: string} & NavigationPayload;

export default {
  fetchFavoriteSets: createAction(types.FETCH_FAVORITE_SETS),
  fetchFavoriteSetsComplete: createAction(types.FETCH_FAVORITE_SETS_COMPLETE),
};

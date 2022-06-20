import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type FetchSets = {id: string} & NavigationPayload;

export default {
  fetchUserOrders: createAction(types.FETCH_USER_ORDERS),
  fetchUserOrdersComplete: createAction(types.FETCH_USER_ORDERS_COMPLETE),
};

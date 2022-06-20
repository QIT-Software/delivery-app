import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';

export type OrderDetails = {orderId: string} & NavigationPayload;

export default {
  fetchRecentAddresses: createAction(types.FETCH_RECENT_ADDRESSES),
  fetchRecentAddressesCompleted: createAction(types.FETCH_RECENT_ADDRESSES_COMPLETED),
};

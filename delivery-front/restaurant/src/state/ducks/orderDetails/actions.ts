import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from '../router/actions';
import {ID} from 'entities/Common';

export type FetchOrderDetails = {id: string} & NavigationPayload;

export default {
  fetchOrderDetails: createAction<FetchOrderDetails>(types.FETCH_ORDER_DETAILS),
  fetchOrderDetailsComplete: createAction(types.FETCH_ORDER_DETAILS_COMPLETE),
  accept: createAction<string>(types.ACCEPT),
  submitAccept: createAction<ID>(types.SUBMIT_ACCEPT),
};

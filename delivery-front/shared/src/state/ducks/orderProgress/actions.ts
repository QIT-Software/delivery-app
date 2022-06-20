import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Order from 'entities/Order';
import {OrderActionType} from 'state/entities/OrderActionType';
import {Bag} from 'entities/Bag';
import {NavigationPayload} from 'state/ducks/router/actions';

export type ScanBags = {orderId: string; action: OrderActionType};
export type ScannedBags = ScanBags & {bags: Bag[]};
export type ClientOrder = {id: string} & NavigationPayload;

export default {
  fetchOrderProgress: createAction<ID>(types.FETCH_ORDER),
  order: createAction<ClientOrder>(types.ORDER),
  updateOrderProgress: createAction(types.UPDATE_ORDER_PROGRESS),
  orderProgressFetched: createAction<Order>(types.ORDER_FETCHED),
  confirmPayment: createAction<ID>(types.CONFIRM_PAYMENT),
  payForOrder: createAction(types.PAY_FOR_ORDER),
  confirmDeleteOrder: createAction<string>(types.CONFIRM_DELETE_ORDER),
  deleteOrder: createAction<string>(types.DELETE_ORDER),
  deleteOrderCompleted: createAction<string>(types.DELETE_ORDER_COMPLETED),
  scanBags: createAction<ScanBags>(types.SCAN_BAGS),
  confirmBags: createAction<ScannedBags>(types.CONFIRM_BAGS),
  acceptScan: createAction<ScannedBags>(types.ACCEPT_SCAN),
  fetchCourierLocation: createAction<string>(types.FETCH_COURIER_LOCATION),
  fetchCourierLocationComplete: createAction(types.FETCH_COURIER_LOCATION_COMPLETE),
};

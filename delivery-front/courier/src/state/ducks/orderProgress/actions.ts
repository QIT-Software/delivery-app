import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Order from 'entities/Order';
import LatLng from 'entities/LatLng';

export type OpenNavigator = {latLng: LatLng};

export type ScanBags = {orderId: string};

export type ScannedBags = ScanBags & {bag: string};

export default {
  fetchOrderProgress: createAction<ID>(types.FETCH_ORDER),
  orderProgressFetched: createAction<Order>(types.ORDER_FETCHED),
  toOrdersList: createAction(types.TO_ORDERS_LIST),
  openNavigator: createAction<OpenNavigator>(types.OPEN_NAVIGATOR),
  scanBags: createAction<ScanBags>(types.SCAN_BAGS),
  confirmBags: createAction<ScannedBags>(types.CONFIRM_BAGS),
  acceptScan: createAction<ScannedBags>(types.ACCEPT_SCAN),
  acceptScanCompleted: createAction<ScannedBags>(types.ACCEPT_SCAN_COMPLETED),
  requestCurrentPosition: createAction(types.REQUEST_CURRENT_POSITION),
  fetchCourierLocation: createAction<string>(types.FETCH_COURIER_LOCATION),
  fetchCourierLocationComplete: createAction(types.FETCH_COURIER_LOCATION_COMPLETE),
};

import {createAction} from 'redux-actions';
import types from './types';
import * as H from 'history';
import {sharedRouterActions} from 'state/shared/ducks/router';

export type NavigationPayload = {history: H.History};
export type NavigateToOrderDetails = {orderId: string} & NavigationPayload;
export type NavigateToScanner = {orderId: string} & NavigationPayload;

export default {
  ...sharedRouterActions,
  //
  goBack: createAction<NavigationPayload>(types.GO_BACK),
  navigateToMain: createAction<NavigationPayload>(types.NAVIGATE_TO_MAIN),
  navigateToCurrentOrders: createAction<NavigationPayload>(
    types.NAVIGATE_TO_CURRENT_ORDERS,
  ),
  navigateToOrderDetails: createAction<NavigateToOrderDetails>(
    types.NAVIGATE_TO_ORDER_DETAILS,
  ),
  navigateToScanner: createAction<NavigateToScanner>(types.NAVIGATE_TO_SCANNER),
  navigateToOrderProgress: createAction<NavigationPayload>(
    types.NAVIGATE_TO_ORDER_PROGRESS,
  ),
  navigateToProfile: createAction<NavigationPayload>(types.NAVIGATE_TO_PROFILE),
};

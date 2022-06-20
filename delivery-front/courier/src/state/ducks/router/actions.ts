import {createAction, ActionFunction1, Action} from 'redux-actions';
import types from './types';
import * as H from 'history';
import {sharedRouterActions} from 'state/shared/ducks/router';

export type NavigationPayload = {history: H.History};
export type NavigateToOrderDetails = {orderId: string} & NavigationPayload;
export type NavigateToImagePickerSubmitAction = ActionFunction1<
  {imageUrl: string},
  Action<{imageUrl: string}>
>;
export type NavigateToImagePicker = {
  submitAction: NavigateToImagePickerSubmitAction;
};

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
  navigateToOrderProgress: createAction<NavigationPayload>(
    types.NAVIGATE_TO_ORDER_PROGRESS,
  ),
  navigateToProfile: createAction<NavigationPayload>(types.NAVIGATE_TO_PROFILE),
  navigateToEditUser: createAction<NavigationPayload>(types.NAVIGATE_TO_EDIT_USER),
};

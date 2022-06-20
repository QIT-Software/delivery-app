import {Action, ActionFunction1, createAction} from 'redux-actions';
import types from './types';
import {Bag} from 'entities/Bag';
import {ScannerMode} from 'state/entities/Scanner';
import {ID} from 'entities/Common';
import * as H from 'history';

export type NavigateToScannerSubmitAction = ActionFunction1<Bag[], Action<Bag[]>>;

export type NavigateToImagePickerSubmitAction = ActionFunction1<
  {imageUrl: string},
  Action<{imageUrl: string}>
>;

export type NavigateToScanner = {
  submitAction: NavigateToScannerSubmitAction;
  mode: ScannerMode;
  orderId?: ID;
};

export type NavigateToImagePicker = {
  submitAction: NavigateToImagePickerSubmitAction;
};

export type ScannerEntered = {mode: ScannerMode; orderId: ID | undefined};

export type NavigationPayload = {history: H.History};

export type SelectOrder = {id: string} & NavigationPayload;
export type SelectClient = {clientId: string} & NavigationPayload;
export type SelectCourier = {courierId: string} & NavigationPayload;
export type SelectRestaurant = {restaurantId: string} & NavigationPayload;
export type SelectPayment = {paymentId: string} & NavigationPayload;
export type CreateOrUpdateInformationPage = NavigationPayload;

export default {
  goBack: createAction<NavigationPayload>(types.GO_BACK),
  accountEntered: createAction(types.ACCOUNT_ENTERED),
  navigateToAuth: createAction<NavigationPayload>(types.NAVIGATE_TO_AUTH),
  navigateToMain: createAction<NavigationPayload>(types.NAVIGATE_TO_MAIN),
  navigateToChangePassword: createAction(types.NAVIGATE_TO_CHANGE_PASSWORD),
  navigateToImagePicker: createAction<NavigateToImagePicker>(
    types.NAVIGATE_TO_IMAGE_PICKER,
  ),
  navigateToSettings: createAction(types.NAVIGATE_TO_SETTINGS),
  mainEntered: createAction(types.MAIN_ENTERED),
  navigateToOrderPopup: createAction(types.NAVIGATE_TO_ORDER_POPUP),
  scannerEntered: createAction<ScannerEntered>(types.SCANNER_ENTERED),
  navigateToOrderHistory: createAction(types.NAVIGATE_TO_ORDER_HISTORY),
  orderHistoryEntered: createAction(types.ORDER_HISTORY_ENTERED),
  navigateToOrderDetails: createAction<SelectOrder>(types.NAVIGATE_TO_ORDER_DETAILS),
  navigateToClientDetails: createAction<SelectClient>(types.NAVIGATE_TO_CLIENT_DETAILS),
  navigateToCourierDetails: createAction<SelectCourier>(
    types.NAVIGATE_TO_COURIER_DETAILS,
  ),
  navigateToRestaurantDetails: createAction<SelectRestaurant>(
    types.NAVIGATE_TO_RESTAURANT_DETAILS,
  ),
  navigateToPaymentDetails: createAction<SelectPayment>(
    types.NAVIGATE_TO_PAYMENT_DETAILS,
  ),
  navigateToCreateOrUpdatePage: createAction<CreateOrUpdateInformationPage>(
    types.NAVIGATE_TO_CREATE_OR_UPDATE_PAGE,
  ),
};

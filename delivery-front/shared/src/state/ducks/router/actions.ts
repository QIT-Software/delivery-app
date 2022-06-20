import {createAction, ActionFunction1, Action} from 'redux-actions';
import types from './types';
import * as H from 'history';
import Address from 'entities/Address';
import {Bag} from 'entities/Bag';
import {ScannerMode} from 'state/restaurant/entities/Scanner';
import {ID} from 'entities/Common';

export type NavigationPayload = {history: H.History};
export type NavigateFromUserId = {userId: string} & NavigationPayload;

export type SelectMenuItem = {key: string};

export type NavigateToAddressDropMenuSubmitAction = ActionFunction1<
  {address: Address},
  Action<{address: Address}>
>;

export type ScannerEntered = {mode: ScannerMode; orderId: ID | undefined};

export type NavigateToScanner = {
  submitAction: NavigateToScannerSubmitAction;
  mode: ScannerMode;
  orderId?: ID;
};

export type NavigateToScannerSubmitAction = ActionFunction1<
  {bags: Bag[]},
  Action<{bags: Bag[]}>
>;

export type NavigateToAddressDropMenu = {
  submitAction: NavigateToAddressDropMenuSubmitAction;
};

export default {
  goBack: createAction(types.GO_BACK),
  navigateToAuth: createAction<NavigationPayload>(types.NAVIGATE_TO_AUTH),
  navigateToMain: createAction(types.NAVIGATE_TO_MAIN),
  navigateToSettings: createAction(types.NAVIGATE_TO_SETTINGS),
  mainEntered: createAction(types.MAIN_ENTERED),
  navigateToScanner: createAction<NavigateToScanner>(types.NAVIGATE_TO_SCANNER),
  scannerEntered: createAction<ScannerEntered>(types.SCANNER_ENTERED),
  navigateToForgotPassword: createAction<NavigationPayload>(
    types.NAVIGATE_TO_FORGOT_PASSWORD,
  ),
  navigateToSignUp: createAction<NavigationPayload>(types.NAVIGATE_TO_SIGN_UP),
  navigateToAddressDropMenu: createAction<NavigateToAddressDropMenu>(
    types.NAVIGATE_TO_ADDRESS_DROP_MENU,
  ),
  addressDropMenuEntered: createAction(types.ADDRESS_DROP_MENU_ENTERED),
  navigateToImagePicker: createAction<NavigateFromUserId>(types.NAVIGATE_TO_IMAGE_PICKER),
  navigateToDocumentPicker: createAction<NavigateFromUserId>(
    types.NAVIGATE_TO_DOCUMENT_PICKER,
  ),
};

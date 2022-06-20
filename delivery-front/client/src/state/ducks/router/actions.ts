import {createAction} from 'redux-actions';
import types from './types';
import * as H from 'history';

export type NavigationPayload = {history: H.History};
export type NavigateToCuisineSets = {cuisineId: string} & NavigationPayload;
export type NavigateToClientOrder = {id: string} & NavigationPayload;
export type NavigateToDishPopUp = {setId: string} & NavigationPayload;

export default {
  clientAppEntered: createAction(types.CLIENT_APP_ENTERED),
  clientAppEnteredCompleted: createAction(types.CLIENT_APP_ENTERED_COMPLETED),
  goBack: createAction<NavigationPayload>(types.GO_BACK),
  navigateToWelcomePopUp: createAction<NavigationPayload>(
    types.NAVIGATE_TO_WELCOME_POPUP,
  ),
  navigateToMain: createAction<NavigationPayload>(types.NAVIGATE_TO_MAIN),
  navigateToFavorites: createAction<NavigationPayload>(types.NAVIGATE_TO_FAVORITES),
  navigateToEditUser: createAction<NavigationPayload>(types.NAVIGATE_TO_EDIT_USER),
  navigateToCuisineSets: createAction<NavigateToCuisineSets>(
    types.NAVIGATE_TO_CUISINE_SETS,
  ),
  navigateToDishPopUp: createAction<NavigateToDishPopUp>(types.NAVIGATE_TO_DISH_POPUP),
  navigateToCart: createAction<NavigationPayload>(types.NAVIGATE_TO_CART),
  navigateToCartAuthPopUp: createAction<NavigationPayload>(
    types.NAVIGATE_TO_CART_AUTH_POPUP,
  ),
  navigateToAddress: createAction<NavigationPayload>(types.NAVIGATE_TO_ADDRESS),
  navigateToAdditionalAddressInfo: createAction<NavigationPayload>(
    types.NAVIGATE_TO_ADDITIONAL_ADDRESS_INFO,
  ),
  navigateToOrder: createAction<NavigationPayload>(types.NAVIGATE_TO_ORDER),
  navigateToOrderProgress: createAction<NavigateToClientOrder>(
    types.NAVIGATE_TO_ORDER_PROGRESS,
  ),
  navigateToOrderComplete: createAction<NavigationPayload>(
    types.NAVIGATE_TO_ORDER_COMPLETE,
  ),
  navigateToOrderSuccess: createAction<NavigationPayload>(
    types.NAVIGATE_TO_ORDER_SUCCESS,
  ),
  navigateToSignUp: createAction<NavigationPayload>(types.NAVIGATE_TO_SIGN_UP),
  navigateToAuth: createAction<NavigationPayload>(types.NAVIGATE_TO_AUTH),
  navigateToSettings: createAction<NavigationPayload>(types.NAVIGATE_TO_SETTINGS),
  navigateToProfile: createAction<NavigationPayload>(types.NAVIGATE_TO_PROFILE),
  navigateToNotification: createAction<NavigationPayload>(types.NAVIGATE_TO_NOTIFICATION),
  navigateToPayments: createAction<NavigationPayload>(types.NAVIGATE_TO_PAYMENTS),
  navigateToUserOrders: createAction<NavigationPayload>(types.NAVIGATE_TO_USER_ORDERS),
  navigateToSettingsMain: createAction<NavigationPayload>(
    types.NAVIGATE_TO_SETTINGS_MAIN,
  ),
};

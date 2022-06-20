import {all, put, takeEvery} from 'redux-saga/effects';
// import types from './types';
import actions, {
  NavigateToCuisineSets,
  NavigationPayload,
  NavigateToDishPopUp,
  NavigateToClientOrder,
} from './actions';
import {Action} from 'redux-actions';
import types from './types';
import Cart from 'entities/Cart';
import {SpoonAndForkApi} from 'api';
import {alertActions} from 'state/ducks/alert';
// import State from 'state/entities/State';
// import {actions as sessionActions} from 'state/ducks/session';
// import {LoadableContainer} from 'entities/LoadableContainer';

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

// function* accountEntered({payload}: Action<NavigationPayload>) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const session: LoadableContainer<any> = yield select((state: State) => state.session);
//   if (!session.isSuccess && !session.isLoading) {
//     yield put(sessionActions.fetchSession(payload));
//   }
// }
//
// function navigateToAuth({payload}: Action<NavigationPayload>) {
//   payload.history.push('/auth');
// }
//
function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToFavorites({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/favorites');
}

function navigateToWelcomePopUp({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/cuisineList/welcome');
}

function navigateToCart({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/cart');
}

function navigateToCartAuthPopUp({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/cart/cartAuth');
}

function navigateToDishPopUp({payload}: Action<NavigateToDishPopUp>) {
  payload.history.push(`/main/set/${payload.setId}`);
}

function navigateToAddress({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/address');
}

function navigateToAdditionalAddressInfo({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/additionalAddressInfo');
}

function navigateToOrder({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/order');
}

function navigateToOrderSuccess({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/order/orderSuccess');
}

function navigateToOrderProgress({payload}: Action<NavigateToClientOrder>) {
  payload.history.push(`/orderProgress/${payload.id}`);
}

function navigateToSettings({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings');
}

function navigateToSettingsMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/settingsMain');
}

function navigateToProfile({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/profile');
}

function navigateToEditUser({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/editUserProfile');
}

function navigateToNotification({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/notification');
}

function navigateToPayments({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/payments');
}

function navigateToUserOrders({payload}: Action<NavigationPayload>) {
  payload.history.push('/settings/userOrders');
}

function navigateToOrderComplete({payload}: Action<NavigationPayload>) {
  payload.history.push('/main/orderComplete');
}
//
// function navigateToCuisineList({payload}: Action<NavigationPayload>) {
//   payload.history.push('/main/cuisineList');
// }
//
function navigateToCuisineSets({payload}: Action<NavigateToCuisineSets>) {
  payload.history.push(`/main/cuisine/${payload.cuisineId}`);
}

function navigateToSignUp({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth/signUp');
}

function navigateToAuth({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth');
}
//
// function navigateToSettings({payload}: Action<NavigationPayload>) {
//   payload.history.push('/settings');
// }

function* clientAppEntered() {
  try {
    const cartsList: Cart[] = yield SpoonAndForkApi.getUserCarts();
    yield put(actions.clientAppEnteredCompleted({cartsList}));
  } catch (e) {
    yield put(actions.clientAppEnteredCompleted(e));
  }
}

function* clientAppEnteredCompleted({payload, error}: Action<Cart[]>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

export default function* () {
  yield all([
    takeEvery(types.CLIENT_APP_ENTERED, clientAppEntered),
    takeEvery(types.CLIENT_APP_ENTERED_COMPLETED, clientAppEnteredCompleted),
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_CUISINE_SETS, navigateToCuisineSets),
    takeEvery(types.NAVIGATE_TO_EDIT_USER, navigateToEditUser),
    takeEvery(types.NAVIGATE_TO_DISH_POPUP, navigateToDishPopUp),
    takeEvery(types.NAVIGATE_TO_WELCOME_POPUP, navigateToWelcomePopUp),
    // takeEvery(types.ACCOUNT_ENTERED, accountEntered),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
    takeEvery(types.NAVIGATE_TO_FAVORITES, navigateToFavorites),
    takeEvery(types.NAVIGATE_TO_CART, navigateToCart),
    takeEvery(types.NAVIGATE_TO_CART_AUTH_POPUP, navigateToCartAuthPopUp),
    takeEvery(types.NAVIGATE_TO_ADDRESS, navigateToAddress),
    takeEvery(types.NAVIGATE_TO_ADDITIONAL_ADDRESS_INFO, navigateToAdditionalAddressInfo),
    takeEvery(types.NAVIGATE_TO_SIGN_UP, navigateToSignUp),
    takeEvery(types.NAVIGATE_TO_AUTH, navigateToAuth),
    takeEvery(types.NAVIGATE_TO_ORDER, navigateToOrder),
    takeEvery(types.NAVIGATE_TO_ORDER_SUCCESS, navigateToOrderSuccess),
    takeEvery(types.NAVIGATE_TO_ORDER_PROGRESS, navigateToOrderProgress),
    takeEvery(types.NAVIGATE_TO_ORDER_COMPLETE, navigateToOrderComplete),
    takeEvery(types.NAVIGATE_TO_SETTINGS, navigateToSettings),
    takeEvery(types.NAVIGATE_TO_SETTINGS_MAIN, navigateToSettingsMain),
    takeEvery(types.NAVIGATE_TO_PROFILE, navigateToProfile),
    takeEvery(types.NAVIGATE_TO_NOTIFICATION, navigateToNotification),
    takeEvery(types.NAVIGATE_TO_PAYMENTS, navigateToPayments),
    takeEvery(types.NAVIGATE_TO_USER_ORDERS, navigateToUserOrders),
    // takeEvery(types.NAVIGATE_TO_PROSPECT, navigateToProspect),
    // takeEvery(types.NAVIGATE_TO_PLAYER, navigateToPlayer),
    // takeEvery(types.NAVIGATE_TO_SETTINGS, navigateToSettings),
    // takeEvery(types.NAVIGATE_TO_EDIT_PROSPECT, navigateToEditProspect),
  ]);
}

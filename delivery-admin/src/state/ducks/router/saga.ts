import {all, put, select, takeEvery} from 'redux-saga/effects';
import types from './types';
import State from '../../entities/State';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {
  NavigationPayload,
  SelectOrder,
  SelectClient,
  SelectCourier,
  SelectRestaurant,
  CreateOrUpdateInformationPage,
  SelectPayment,
} from './actions';
import {actions as sessionActions} from '../session';
import {Action} from 'redux-actions';

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

function* accountEntered() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: LoadableContainer<any> = yield select((state: State) => state.session);
  if (!session.isSuccess && !session.isLoading) {
    yield put(sessionActions.fetchSession());
  }
}

function navigateToAuth({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToChangePassword() {
  // navigateTo(NavigatorKey.ChangePasswordPopUp);
}

function navigateToImagePicker() {
  // const props: ImagePickerPopUpProps = {
  //   confirmAction: payload.submitAction,
  // };
  // navigateTo(NavigatorKey.ImagePickerPopUp, undefined, props);
}

function navigateToOrderPopup() {
  // navigateTo(NavigatorKey.OrderPopup);
}

function navigateToOrderDetails({payload}: Action<SelectOrder>) {
  payload.history.push(`/orders/${payload.id}`);
}

function navigateToClientDetails({payload}: Action<SelectClient>) {
  payload.history.push(`/customers/${payload.clientId}`);
}

function navigateToCourierDetails({payload}: Action<SelectCourier>) {
  payload.history.push(`/couriers/${payload.courierId}`);
}

function navigateToRestaurantDetails({payload}: Action<SelectRestaurant>) {
  payload.history.push(`/restaurants/${payload.restaurantId}`);
}

function navigateToPaymentDetails({payload}: Action<SelectPayment>) {
  payload.history.push(`/payments/${payload.paymentId}`);
}

function navigateToCreateOrUpdatePage({payload}: Action<CreateOrUpdateInformationPage>) {
  payload.history.push('/informationPages/create');
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_AUTH, navigateToAuth),
    takeEvery(types.ACCOUNT_ENTERED, accountEntered),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
    takeEvery(types.NAVIGATE_TO_CHANGE_PASSWORD, navigateToChangePassword),
    takeEvery(types.NAVIGATE_TO_IMAGE_PICKER, navigateToImagePicker),
    takeEvery(types.NAVIGATE_TO_ORDER_POPUP, navigateToOrderPopup),
    takeEvery(types.NAVIGATE_TO_ORDER_DETAILS, navigateToOrderDetails),
    takeEvery(types.NAVIGATE_TO_CLIENT_DETAILS, navigateToClientDetails),
    takeEvery(types.NAVIGATE_TO_COURIER_DETAILS, navigateToCourierDetails),
    takeEvery(types.NAVIGATE_TO_RESTAURANT_DETAILS, navigateToRestaurantDetails),
    takeEvery(types.NAVIGATE_TO_PAYMENT_DETAILS, navigateToPaymentDetails),
    takeEvery(types.NAVIGATE_TO_CREATE_OR_UPDATE_PAGE, navigateToCreateOrUpdatePage),
  ]);
}

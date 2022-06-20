import {useDispatch} from 'react-redux';
import {actions as routerActions} from '../ducks/router';
import {alertActions} from '../ducks/alert';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import RegisterRequest from '../../auth/RegisterRequest';
import {actions as authActions} from '../ducks/auth';
import UpdateUserRequest from '../ducks/session/models';
import {actions as sessionActions} from '../ducks/session';
import ForgotPasswordRequest from '../../api/entities/ForgotPasswordRequest';
import {useHistory} from 'react-router';
import {orderProgressActions} from 'state/ducks/orderProgress';
import {OrderActionType} from 'state/entities/OrderActionType';
import {ID} from 'entities/Common';
import {NavigationPayload} from '../ducks/router/actions';
import {UserLocation} from 'state/entities/UserAddress';
import {NavigateToAddressDropMenuSubmitAction} from 'state/ducks/router/actions';
import {actions as addressActions} from '../ducks/address';

export function useRouterActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    goBack: () => dispatch(routerActions.goBack({history})),
    navigateToForgotPassword: () =>
      dispatch(routerActions.navigateToForgotPassword({history})),
    navigateToSignUp: () => dispatch(routerActions.navigateToSignUp({history})),
    navigateToImagePicker: (userId: string) =>
      dispatch(routerActions.navigateToImagePicker({userId, history})),
    navigateToDocumentPicker: (userId: string) =>
      dispatch(routerActions.navigateToDocumentPicker({userId, history})),
  };
}

export function useAlertActions() {
  const dispatch = useDispatch();
  return {
    showMessage: (title: string, message: string) =>
      dispatch(alertActions.showMessage({message, title})),
  };
}

export function useOrderProgressActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    fetchOrder: (id: ID) => dispatch(orderProgressActions.fetchOrderProgress(id)),
    order: (id: ID) => {
      return dispatch(orderProgressActions.order({id, history}));
    },
    scanBags: (orderId: string, action: OrderActionType) =>
      dispatch(orderProgressActions.scanBags({orderId, action})),
    confirmPayment: (id: ID) => dispatch(orderProgressActions.confirmPayment(id)),
    fetchCourierLocation: (id: string) =>
      dispatch(orderProgressActions.fetchCourierLocation(id)),
    // payForOrder: (order: Order) => dispatch(orderProgressActions.payForOrder(order)),
    // deleteOrder: (order: Order) =>
    //   dispatch(orderProgressActions.confirmDeleteOrder(order.id)),
  };
}

export function useAuthActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    registerUser: (registerRequest: RegisterRequest) => {
      dispatch(authActions.registerUser({request: registerRequest, history}));
    },
    login: (loginRequest: LoginRequest) =>
      dispatch(authActions.login({request: loginRequest, history})),
    updateUserProfile: (updateRequest: UpdateUserRequest) => {
      dispatch(sessionActions.updateUserProfile({request: updateRequest, history}));
    },
    logout: () => dispatch(authActions.logout({history})),
    recoverPassword: (email: ForgotPasswordRequest) => {
      dispatch(authActions.recoverPassword({request: email, history}));
    },
    chooseAddress: (address: string) => {
      return dispatch(authActions.chooseAddress({address}));
    },
    setSessionExists: (isExist: boolean) => {
      return dispatch(sessionActions.setSessionExists(isExist));
    },
    fetchSession: (payload: NavigationPayload) => {
      return dispatch(sessionActions.fetchSession(payload));
    },
    updateProfileImage: () => dispatch(sessionActions.chooseNewImage()),
    chooseAvatar: () => dispatch(authActions.chooseAvatar()),
  };
}

export function useAddressActions() {
  const dispatch = useDispatch();
  return {
    chooseAddress: (location: UserLocation) =>
      dispatch(addressActions.chooseAddress({location})),
    fetch: (confirmAction: NavigateToAddressDropMenuSubmitAction) =>
      dispatch(addressActions.confirm({confirmAction})),
    createAddress: (address: UserLocation) =>
      dispatch(addressActions.createAddress(address)),
  };
}

import {useDispatch} from 'react-redux';
import {actions as authActions} from '../ducks/auth';
import {actions as routerActions} from '../ducks/router';
import {actions as sessionActions} from '../ducks/session';
import RegisterRequest from 'auth/RegisterRequest';
import LoginRequest from 'api/entities/LoginRequest';
import UpdateUserRequest from 'state/ducks/session/models';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {snackBarActions} from 'state/ducks/snackBar';
import {useHistory} from 'react-router-dom';
import {orderActions} from '../ducks/order';
import {clientActions} from '../ducks/client';
import {courierActions} from '../ducks/courier';
import {restaurantActions} from '../ducks/restaurant';
import {cuisineActions} from '../ducks/cuisine';
import {dishActions} from '../ducks/dish';
import {orderDetailsActions} from '../ducks/orderDetails';
import {clientDetailsActions} from '../ducks/clientDetails';
import {courierDetailsActions} from '../ducks/courierDetails';
import {restaurantDetailsActions} from '../ducks/restaurantDetails';
import {cuisineDetailsActions} from '../ducks/cuisineDetails';
import {dishDetailsActions} from '../ducks/dishDetails';
import UpdateCuisineRequest from 'state/entities/UpdateCuisineRequest';
import UpdateDishRequest from 'state/entities/UpdateDishRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import CreateCuisineRequest from 'state/entities/CreateCuisineRequest';
import CreateDishRequest from 'state/entities/CreateDishRequest';
import {setActions} from '../ducks/set';
import {setDetailsActions} from '../ducks/setDetails';
import UpdateSetRequest from 'state/entities/UpdateSetRequest';
import DistributeSetsByDays from 'state/entities/DistributeSetsByDays';
import CreateSetRequest from 'state/entities/CreateSetRequest';
import {statusActions} from '../ducks/status';
import {statusDetailsActions} from '../ducks/statusDetails';
import CreateStatusRequest from 'state/entities/CreateStatusRequest';
import UpdateStatusRequest from 'state/entities/UpdateStatusRequest';
import {EvaluateDocumentsRevisionType} from 'entities/Documents';
import CreateRestaurantRequest from '../entities/CreateRestaurantRequest';
import UpdateRestaurantRequest from '../entities/UpdateRestaurantRequest';

export function useAuthActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    registerUser: (registerRequest: RegisterRequest) => {
      dispatch(authActions.registerUser({request: registerRequest, history}));
    },
    login: (loginRequest: LoginRequest) => {
      return dispatch(authActions.login({request: loginRequest, history}));
    },
    updateUserProfile: (updateRequest: UpdateUserRequest) => {
      dispatch(sessionActions.updateUserProfile(updateRequest));
    },
    logout: () => dispatch(authActions.logout({history})),
    recoverPassword: (email: ForgotPasswordRequest) => {
      dispatch(authActions.recoverPassword({request: email, history}));
    },
    updateProfileImage: (imageId: string) =>
      dispatch(sessionActions.updateProfileImage(imageId)),
    chooseAvatar: () => dispatch(authActions.chooseAvatar()),
  };
}

export function useOrderActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrders: () => dispatch(orderActions.fetchOrders()),
    selectOrder: (id: string) => {
      dispatch(routerActions.navigateToOrderDetails({history, id}));
    },
  };
}

export function useOrderDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrderDetails: (id: string) => dispatch(orderDetailsActions.fetchDetails(id)),
    leaveCourier: (orderId: string) =>
      dispatch(orderDetailsActions.leaveCourier(orderId)),
    closeOrder: (orderId: string) =>
      dispatch(orderDetailsActions.closeOrder({orderId, history})),
  };
}

export function useClientActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchClients: () => dispatch(clientActions.fetchClients()),
    selectClient: (id: string) => {
      dispatch(routerActions.navigateToClientDetails({history, clientId: id}));
    },
  };
}

export function useClientDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchClientDetails: (clientId: string) => {
      dispatch(clientDetailsActions.fetchDetails(clientId));
    },
    updateClientInformation: (
      updateClientInformationRequest: UpdateUserInformationRequest,
    ) => {
      dispatch(
        clientDetailsActions.updateClientInformationRequest({
          request: updateClientInformationRequest,
          history,
        }),
      );
    },
  };
}

export function useCourierActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCouriers: () => dispatch(courierActions.fetchCouriers()),
    selectCourier: (id: string) => {
      dispatch(routerActions.navigateToCourierDetails({history, courierId: id}));
    },
  };
}

export function useCourierDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCourierDetails: (courierId: string) => {
      dispatch(courierDetailsActions.fetchDetails(courierId));
    },
    updateCourierInformation: (
      updateCourierInformationRequest: UpdateUserInformationRequest,
    ) => {
      dispatch(
        courierDetailsActions.updateCourierInformationRequest({
          request: updateCourierInformationRequest,
          history,
        }),
      );
    },
    evaluateDocumentsRevision: (
      courierId: string,
      type: EvaluateDocumentsRevisionType,
      comment: string,
    ) => {
      dispatch(
        courierDetailsActions.evaluateDocumentsRevision({courierId, type, comment}),
      );
    },
  };
}

export function useRestaurantActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchRestaurants: () => dispatch(restaurantActions.fetchRestaurants()),
    selectRestaurant: (id: string) => {
      dispatch(routerActions.navigateToRestaurantDetails({history, restaurantId: id}));
    },
  };
}

export function useRestaurantDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchRestaurantDetails: (restaurantId: string) => {
      dispatch(restaurantDetailsActions.fetchDetails(restaurantId));
    },
    updateRestaurantInformation: (
      updateRestaurantInformationRequest: UpdateRestaurantRequest,
    ) => {
      dispatch(
        restaurantDetailsActions.updateRestaurantInformationRequest({
          request: updateRestaurantInformationRequest,
          history,
        }),
      );
    },
    createRestaurant: (createRestaurantInformationRequest: CreateRestaurantRequest) => {
      dispatch(
        restaurantDetailsActions.createRestaurantRequest({
          request: createRestaurantInformationRequest,
          history,
        }),
      );
    },
    deleteRestaurant: (restaurantId: string) =>
      dispatch(restaurantDetailsActions.deleteRestaurant({restaurantId, history})),
  };
}

export function useCuisineActions() {
  const dispatch = useDispatch();

  return {
    fetchCuisines: () => dispatch(cuisineActions.fetchCuisines()),
  };
}

export function useCuisineDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCuisineDetails: (cuisineId: string) => {
      dispatch(cuisineDetailsActions.fetchDetails(cuisineId));
    },
    updateCuisine: (updateCuisineRequest: UpdateCuisineRequest) => {
      dispatch(
        cuisineDetailsActions.updateCuisineRequest({
          request: updateCuisineRequest,
          history,
        }),
      );
    },
    createCuisine: (createCuisineRequest: CreateCuisineRequest) => {
      dispatch(
        cuisineDetailsActions.createCuisineRequest({
          request: createCuisineRequest,
          history,
        }),
      );
    },
    deleteCuisine: (cuisineId: string) =>
      dispatch(cuisineDetailsActions.deleteCuisine({cuisineId, history})),
  };
}

export function useDishActions() {
  const dispatch = useDispatch();

  return {
    fetchDishes: () => dispatch(dishActions.fetchDishes()),
  };
}

export function useDishDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchDishDetails: (dishId: string) => {
      dispatch(dishDetailsActions.fetchDetails(dishId));
    },
    updateDish: (updateDishRequest: UpdateDishRequest) => {
      dispatch(
        dishDetailsActions.updateDishRequest({
          request: updateDishRequest,
          history,
        }),
      );
    },
    createDish: (createDishRequest: CreateDishRequest) => {
      dispatch(
        dishDetailsActions.createDishRequest({
          request: createDishRequest,
          history,
        }),
      );
    },
    deleteDish: (dishId: string) =>
      dispatch(dishDetailsActions.deleteDish({dishId, history})),
  };
}

export function useSetActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchSets: () => dispatch(setActions.fetchSets()),
    fetchSetsByDishId: (id: string) => dispatch(setActions.fetchSetsByDishId(id)),
    fetchSetsByCuisineId: (id: string) => dispatch(setActions.fetchSetsByCuisineId(id)),
    distributeSetsByDays: (setIdsAndDays: DistributeSetsByDays[]) =>
      dispatch(setActions.distributeSetsByDays({request: setIdsAndDays, history})),
  };
}

export function useSetDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchSetDetails: (setId: string) => {
      dispatch(setDetailsActions.fetchDetails(setId));
    },
    updateSet: (updateSetRequest: UpdateSetRequest) => {
      dispatch(
        setDetailsActions.updateSetRequest({
          request: updateSetRequest,
          history,
        }),
      );
    },
    createSet: (createSetRequest: CreateSetRequest) => {
      dispatch(
        setDetailsActions.createSetRequest({
          request: createSetRequest,
          history,
        }),
      );
    },
    deleteSet: (setId: string) => dispatch(setDetailsActions.deleteSet({setId, history})),
  };
}

export function useStatusActions() {
  const dispatch = useDispatch();

  return {
    fetchStatuses: () => dispatch(statusActions.fetchStatuses()),
  };
}

export function useStatusDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchStatusDetails: (statusId: string) => {
      dispatch(statusDetailsActions.fetchDetails(statusId));
    },
    updateStatus: (updateStatusRequest: UpdateStatusRequest) => {
      dispatch(
        statusDetailsActions.updateStatusRequest({
          request: updateStatusRequest,
          history,
        }),
      );
    },
    createStatus: (createStatusRequest: CreateStatusRequest) => {
      dispatch(
        statusDetailsActions.createStatusRequest({
          request: createStatusRequest,
          history,
        }),
      );
    },
    deleteStatus: (statusId: string) =>
      dispatch(statusDetailsActions.deleteStatus({statusId, history})),
  };
}

export function useSnackBarActions() {
  const dispatch = useDispatch();
  return {
    closeSnackBar: () => dispatch(snackBarActions.clearSnackbar()),
  };
}

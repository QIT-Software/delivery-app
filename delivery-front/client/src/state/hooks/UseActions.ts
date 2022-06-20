import {useDispatch} from 'react-redux';
import {actions as routerActions} from '../ducks/router';
import {actions as cuisineListActions} from '../ducks/cuisineList';
import {actions as chooseSetActions} from '../ducks/sets';
import {actions as chooseSetInnerActions} from '../ducks/set';
import {actions as screenAndCartInfoActions} from '../ducks/screenAndCartInfo';
import {actions as cartActions} from '../ducks/cart';
import {actions as cartOrderActions} from '../ducks/orders';
import {actions as recentAddressesActions} from '../ducks/recentAddresses';
import {actions as favoritesSetsActions} from '../ducks/favoriteSets';
import {actions as userOrdersActions} from '../ducks/userOrders';
import {useHistory} from 'react-router';
import SelectedSetInfo from 'state/entities/SelectedSetsInfo';
import {actions as settingsActions} from '../ducks/settings';
import {actions as emailForSpamActions} from '../ducks/emailsForSpam';
import UpdatePreferences from 'api/entities/UpdatePreferences';
import {NewCart} from 'state/entities/NewCart';
import {EmailForSpam} from 'state/entities/EmailForSpam';
import {Days} from 'state/ducks/screenAndCartInfo/actions';

export * from 'state/shared/hooks/UseActions';

export function useRouterActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    goBack: () => dispatch(routerActions.goBack({history})),
    navigateToMain: () => dispatch(routerActions.navigateToMain({history})),
    navigateToFavorites: () => dispatch(routerActions.navigateToFavorites({history})),
    navigateToEditUser: () => dispatch(routerActions.navigateToEditUser({history})),
    navigateToWelcomePopUp: () =>
      dispatch(routerActions.navigateToWelcomePopUp({history})),
    navigateToCart: () => dispatch(routerActions.navigateToCart({history})),
    navigateToCartAuthPopUp: () =>
      dispatch(routerActions.navigateToCartAuthPopUp({history})),
    navigateToCuisineSets: (cuisineId: string) =>
      dispatch(routerActions.navigateToCuisineSets({history, cuisineId})),
    navigateToDishPopUp: (setId: string) =>
      dispatch(routerActions.navigateToDishPopUp({history, setId})),
    navigateToSignUp: () => dispatch(routerActions.navigateToSignUp({history})),
    navigateToAuth: () => dispatch(routerActions.navigateToAuth({history})),
    navigateToAddress: () => dispatch(routerActions.navigateToAddress({history})),
    navigateToAdditionalAddressInfo: () =>
      dispatch(routerActions.navigateToAdditionalAddressInfo({history})),
    navigateToOrder: () => dispatch(routerActions.navigateToOrder({history})),
    navigateToOrderProgress: (id: string) =>
      dispatch(routerActions.navigateToOrderProgress({history, id})),
    navigateToOrderSuccess: () =>
      dispatch(routerActions.navigateToOrderSuccess({history})),
    navigateToOrderComplete: () =>
      dispatch(routerActions.navigateToOrderComplete({history})),
    navigateToSettings: () => dispatch(routerActions.navigateToSettings({history})),
    navigateToSettingsMain: () =>
      dispatch(routerActions.navigateToSettingsMain({history})),
    navigateToProfile: () => dispatch(routerActions.navigateToProfile({history})),
    navigateToNotification: () =>
      dispatch(routerActions.navigateToNotification({history})),
    navigateToPayments: () => dispatch(routerActions.navigateToPayments({history})),
    navigateToUserOrders: () => dispatch(routerActions.navigateToUserOrders({history})),
    clientAppEntered: () => dispatch(routerActions.clientAppEntered()),
  };
}

export function useSettingsActions() {
  const dispatch = useDispatch();

  return {
    fetchPreferences: () => dispatch(settingsActions.fetchPreferences()),
    updatePreferences: (request: UpdatePreferences) =>
      dispatch(settingsActions.updatePreferences(request)),
  };
}

export function useCuisineListActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCuisineList: () => {
      dispatch(cuisineListActions.fetchCuisineList({history}));
    },
    sets: (cuisineId: string) => {
      return dispatch(cuisineListActions.sets({cuisineId, history}));
    },
  };
}

export function useSaveInfoActions() {
  const dispatch = useDispatch();

  return {
    saveScreenInfo: (screen: string) => {
      dispatch(screenAndCartInfoActions.saveScreenInfo(screen));
    },
    saveSelectedSetInfo: (screensInfo: SelectedSetInfo[]) => {
      dispatch(screenAndCartInfoActions.saveSelectedSetInfo(screensInfo));
    },
    saveNumberOfDays: (day: Days[]) => {
      dispatch(screenAndCartInfoActions.saveNumberOfDays(day));
    },
  };
}

export function useChooseSetActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchSets: (id: string) => {
      dispatch(chooseSetActions.fetchSets({id, history}));
    },
    fetchSet: (id: string) => {
      dispatch(chooseSetInnerActions.fetchSet({id, history}));
    },
  };
}

export function useCartOrdersActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrdersByCartId: (id: string) => {
      dispatch(cartOrderActions.fetchOrdersByCartId({id, history}));
    },
  };
}

export function useRecentAddressesActions() {
  const dispatch = useDispatch();

  return {
    fetchRecentAddresses: () => {
      dispatch(recentAddressesActions.fetchRecentAddresses());
    },
  };
}

export function useFavoritesSetsActions() {
  const dispatch = useDispatch();

  return {
    fetchFavoriteSets: () => {
      dispatch(favoritesSetsActions.fetchFavoriteSets());
    },
  };
}

export function useUserOrdersActions() {
  const dispatch = useDispatch();

  return {
    fetchUserOrders: () => {
      dispatch(userOrdersActions.fetchUserOrders());
    },
  };
}

export function useCartActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    submitCartInfo: (cart: NewCart) =>
      dispatch(
        cartActions.submitCartInfo({
          history,
          clientAddress: cart.clientAddress,
          selectedSetsInfo: cart.selectedSetsInfo,
        }),
      ),
    cart: (id: string) => {
      return dispatch(cartActions.cart({id, history}));
    },
  };
}

export function useEmailForSpamActions() {
  const dispatch = useDispatch();
  return {
    createEmailForSpam: (email: EmailForSpam) =>
      dispatch(emailForSpamActions.createEmailForSpam(email)),
  };
}

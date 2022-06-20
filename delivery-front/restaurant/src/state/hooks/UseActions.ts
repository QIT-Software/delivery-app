import {useDispatch} from 'react-redux';
import {actions as routerActions} from '../ducks/router';
import {useHistory} from 'react-router';
import {actions as ordersActions} from 'state/restaurant/ducks/orders';
// import {actions as courierOrdersActions} from 'state/restaurant/ducks/courierOrders';
import {actions as orderDetailsActions} from 'state/restaurant/ducks/orderDetails';
import {actions as restaurantActions} from 'state/restaurant/ducks/currentRestaurant';
import {scannerActions} from 'state/restaurant/ducks/scanner';
import {Bag} from 'entities/Bag';

export * from 'state/shared/hooks/UseActions';

export function useRouterActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    goBack: () => dispatch(routerActions.goBack({history})),
    navigateToMain: () => dispatch(routerActions.navigateToMain({history})),
    navigateToCurrentOrders: () =>
      dispatch(routerActions.navigateToCurrentOrders({history})),
    navigateToOrderDetails: (orderId: string) =>
      dispatch(routerActions.navigateToOrderDetails({history, orderId})),
    navigateToProfile: () => dispatch(routerActions.navigateToProfile({history})),
    navigateToScanner: (orderId: string) =>
      dispatch(routerActions.navigateToScanner({history, orderId})),
  };
}

export function useOrdersActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrders: () => dispatch(ordersActions.fetchOrders({history})),
    orderDetails: (orderId: string) => {
      return dispatch(ordersActions.orderDetails({orderId, history}));
    },
  };
}

// export function useCourierOrdersActions() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//
//   return {
//     fetchCourierOrders: () =>
//       dispatch(courierOrdersActions.fetchCourierOrders({history})),
//   };
// }

export function useOrderDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    accept: (orderId: string) => dispatch(orderDetailsActions.accept(orderId)),
    fetchOrderDetails: (id: string) => {
      dispatch(orderDetailsActions.fetchOrderDetails({id, history}));
    },
  };
}

export function useRestaurantActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCurrentRestaurant: () => {
      dispatch(restaurantActions.fetchCurrentRestaurant({history}));
    },
  };
}

export function useScannerActions() {
  const dispatch = useDispatch();
  return {
    codeReceived: (code: string) => dispatch(scannerActions.codeReceived(code)),
    deleteBag: (bag: Bag) => dispatch(scannerActions.deleteBag(bag)),
    confirm: (bag: Bag) => dispatch(scannerActions.confirm(bag)),
    confirmBags: (orderId: string, bag: string) =>
      dispatch(scannerActions.confirmBags({orderId, bag})),
    // scanBags: (orderId: string, action: OrderActionType) =>
    //   dispatch(scannerActions.scanBags({orderId, action})),
  };
}

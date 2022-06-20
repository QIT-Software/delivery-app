import {useDispatch} from 'react-redux';
import {actions as routerActions} from '../ducks/router';
import {useHistory} from 'react-router';
import {actions as ordersActions} from 'state/courier/ducks/orders';
import {actions as courierOrdersActions} from 'state/courier/ducks/courierOrders';
import {actions as orderDetailsActions} from 'state/courier/ducks/orderDetails';
import {actions as orderProgressActions} from 'state/courier/ducks/orderProgress';
import {actions as documentActions} from '../ducks/documents';
import {DocumentsGroup} from 'entities/Documents';
import {imagePickerActions} from 'state/courier/ducks/imagePicker';

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
    navigateToOrderProgress: () =>
      dispatch(routerActions.navigateToOrderProgress({history})),
    navigateToEditUser: () => dispatch(routerActions.navigateToEditUser({history})),
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

export function useCourierOrdersActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCourierOrders: () =>
      dispatch(courierOrdersActions.fetchCourierOrders({history})),
    requestCurrentPosition: () => dispatch(orderProgressActions.requestCurrentPosition()),
  };
}

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

export function useImagePickerActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    addImageToUser: (imageUri: string) =>
      dispatch(imagePickerActions.addImage({imageUri, history})),
  };
}

export function useDocumentsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchDocuments: () => {
      dispatch(documentActions.fetchDocuments());
    },
    chooseDocument: (group: DocumentsGroup) => {
      dispatch(documentActions.chooseDocument({group, history}));
    },
    addDocument: (group: DocumentsGroup, uri: string) => {
      dispatch(documentActions.addDocument({group, imageUrl: uri}));
    },
    deleteDocument: (documentId: string) => {
      dispatch(documentActions.deleteDocument(documentId));
    },
    submit: () => {
      dispatch(documentActions.submit());
    },
  };
}

import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';
import State from '../entities/State';
import {saga as routerSaga} from './router';
import {reducers as sharedReducers, effects as sharedEffects} from 'state/shared/ducks';
import {
  reducer as courierOrdersListReducer,
  saga as courierOrdersListSaga,
} from './courierOrders';
import {reducer as ordersListReducer, saga as ordersListSaga} from './orders';
import {reducer as orderDetailsReducer, saga as orderDetailsSaga} from './orderDetails';
import {
  reducer as orderProgressReducer,
  saga as orderProgressSaga,
} from './orderProgress';
import {
  reducer as courierDocumentsReducer,
  saga as courierDocumentsSaga,
} from './documents';

export const rootReducer = combineReducers<State>({
  ...sharedReducers,
  ordersList: ordersListReducer,
  courierOrdersList: courierOrdersListReducer,
  orderDetails: orderDetailsReducer,
  orderProgress: orderProgressReducer,
  documents: courierDocumentsReducer,
});

export function* rootSaga() {
  yield all([
    ...sharedEffects,
    routerSaga(),
    ordersListSaga(),
    orderDetailsSaga(),
    courierOrdersListSaga(),
    orderProgressSaga(),
    courierDocumentsSaga(),
  ]);
}

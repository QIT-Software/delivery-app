import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';
import State from '../entities/State';
import {saga as routerSaga} from './router';
import {reducers as sharedReducers, effects as sharedEffects} from 'state/shared/ducks';
import {reducer as ordersListReducer, saga as ordersListSaga} from './orders';
import {reducer as orderDetailsReducer, saga as orderDetailsSaga} from './orderDetails';
import {
  reducer as currentRestaurantReducer,
  saga as currentRestaurantSaga,
} from './currentRestaurant';
import {reducer as scannerReducer, saga as scannerSaga} from './scanner';

export const rootReducer = combineReducers<State>({
  ...sharedReducers,
  ordersList: ordersListReducer,
  orderDetails: orderDetailsReducer,
  currentRestaurant: currentRestaurantReducer,
  scanner: scannerReducer,
});

export function* rootSaga() {
  yield all([
    ...sharedEffects,
    routerSaga(),
    ordersListSaga(),
    orderDetailsSaga(),
    currentRestaurantSaga(),
    scannerSaga(),
  ]);
}

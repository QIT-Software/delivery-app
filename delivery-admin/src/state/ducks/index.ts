import {reducer as sessionReducer, saga as sessionSaga} from './session';
import {saga as authSaga} from './auth';
import authReducer from './auth/reducer';
import {saga as routerSaga} from './router';
import {saga as alertSaga} from './alert';
import {reducer as snackBarReducer} from 'state/ducks/snackBar';
import {saga as imagePickerSaga} from 'state/ducks/imagePicker';
import {reducer as ordersReducer, saga as ordersSaga} from 'state/ducks/order';
import {reducer as clientsReducer, saga as clientsSaga} from 'state/ducks/client';
import {reducer as couriersReducer, saga as couriersSaga} from 'state/ducks/courier';
import {
  reducer as restaurantsReducer,
  saga as restaurantsSaga,
} from 'state/ducks/restaurant';
import {reducer as cuisinesReducer, saga as cuisinesSaga} from 'state/ducks/cuisine';
import {reducer as dishesReducer, saga as dishesSaga} from 'state/ducks/dish';
import {reducer as setsReducer, saga as setsSaga} from 'state/ducks/set';
import {reducer as statusesReducer, saga as statusesSaga} from 'state/ducks/status';
import {
  reducer as statusDetailsReducer,
  saga as statusDetailsSaga,
} from 'state/ducks/statusDetails';
import {
  reducer as orderDetailsReducer,
  saga as orderDetailsSaga,
} from 'state/ducks/orderDetails';
import {
  reducer as clientDetailsReducer,
  saga as clientDetailsSaga,
} from 'state/ducks/clientDetails';
import {
  reducer as courierDetailsReducer,
  saga as courierDetailsSaga,
} from 'state/ducks/courierDetails';
import {
  reducer as restaurantDetailsReducer,
  saga as restaurantDetailsSaga,
} from 'state/ducks/restaurantDetails';
import {
  reducer as cuisineDetailsReducer,
  saga as cuisineDetailsSaga,
} from 'state/ducks/cuisineDetails';
import {
  reducer as dishDetailsReducer,
  saga as dishDetailsSaga,
} from 'state/ducks/dishDetails';
import {
  reducer as setDetailsReducer,
  saga as setDetailsSaga,
} from 'state/ducks/setDetails';
import {all} from 'redux-saga/effects';
import State from 'state/entities/State';
import {combineReducers} from 'redux';
import {saga as pushNotificationSaga} from './pushNotification';

export const rootReducer = combineReducers<State>({
  session: sessionReducer,
  auth: authReducer,
  snackBar: snackBarReducer,
  orders: ordersReducer,
  orderDetails: orderDetailsReducer,
  clients: clientsReducer,
  clientDetails: clientDetailsReducer,
  couriers: couriersReducer,
  courierDetails: courierDetailsReducer,
  restaurants: restaurantsReducer,
  restaurantDetails: restaurantDetailsReducer,
  cuisines: cuisinesReducer,
  cuisineDetails: cuisineDetailsReducer,
  dishes: dishesReducer,
  dishDetails: dishDetailsReducer,
  sets: setsReducer,
  setDetails: setDetailsReducer,
  statuses: statusesReducer,
  statusDetails: statusDetailsReducer,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    routerSaga(),
    sessionSaga(),
    alertSaga(),
    imagePickerSaga(),
    clientsSaga(),
    clientDetailsSaga(),
    ordersSaga(),
    orderDetailsSaga(),
    couriersSaga(),
    courierDetailsSaga(),
    restaurantsSaga(),
    restaurantDetailsSaga(),
    cuisinesSaga(),
    cuisineDetailsSaga(),
    dishesSaga(),
    dishDetailsSaga(),
    setsSaga(),
    setDetailsSaga(),
    statusesSaga(),
    statusDetailsSaga(),
    pushNotificationSaga(),
  ]);
}

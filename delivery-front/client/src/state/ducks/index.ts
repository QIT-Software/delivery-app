import {all} from 'redux-saga/effects';
import {combineReducers} from 'redux';
import State from '../entities/State';
import {reducer as routerReducer, saga as routerSaga} from './router';
import {reducer as cuisineListReducer, saga as cuisineListSaga} from './cuisineList';
import {reducer as setsReducer, saga as setsSaga} from './sets';
import {reducer as favoriteSetsReducer, saga as favoriteSetsSaga} from './favoriteSets';
import {reducer as setReducer, saga as setSaga} from './set';
import {
  reducer as preferencesReducer,
  saga as preferencesSaga,
} from 'state/ducks/settings';
import {reducer as newCartReducer, saga as newCartSaga} from './cart';
import {reducer as cartOrdersReducer, saga as cartOrdersSaga} from './orders';
import {reducer as userOrdersReducer, saga as userOrdersSaga} from './userOrders';
import {
  reducer as recentAddressesReducer,
  saga as recentAddressesSaga,
} from './recentAddresses';
import {reducer as infoReducer} from './screenAndCartInfo';
import {saga as emailForSpamSaga} from './emailsForSpam';
import {reducers as sharedReducers, effects as sharedEffects} from 'state/shared/ducks';

export const rootReducer = combineReducers<State>({
  ...sharedReducers,
  cuisineList: cuisineListReducer,
  sets: setsReducer,
  info: infoReducer,
  set: setReducer,
  preferences: preferencesReducer,
  newCart: newCartReducer,
  cartOrders: cartOrdersReducer,
  cartsList: routerReducer,
  recentAddresses: recentAddressesReducer,
  favoriteSets: favoriteSetsReducer,
  userOrders: userOrdersReducer,
});

export function* rootSaga() {
  yield all([
    ...sharedEffects,
    routerSaga(),
    cuisineListSaga(),
    setsSaga(),
    favoriteSetsSaga(),
    setSaga(),
    preferencesSaga(),
    newCartSaga(),
    cartOrdersSaga(),
    recentAddressesSaga(),
    emailForSpamSaga(),
    userOrdersSaga(),
  ]);
}

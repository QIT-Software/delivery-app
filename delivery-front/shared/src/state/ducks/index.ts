import {reducer as snackBarReducer} from './snackBar';
import {saga as routerSaga} from './router';
import {saga as alertSaga} from './alert';
import {saga as errorSaga} from './error';
import {reducer as authReducer, saga as authSaga} from './auth';
import {reducer as sessionReducer, saga as sessionSaga} from './session';
import {reducer as addressReducer, saga as addressSaga} from './address';
import {reducer as locationReducer, saga as locationSaga} from './location';
import {
  reducer as scannerReducer,
  saga as scannerSaga,
} from '../../../../restaurant/src/state/ducks/scanner';

import {
  reducer as orderProgressReducer,
  saga as orderProgressSaga,
} from './orderProgress';
import {saga as imagePickerSaga} from 'state/courier/ducks/imagePicker';

const reducers = {
  snackBar: snackBarReducer,
  session: sessionReducer,
  auth: authReducer,
  address: addressReducer,
  orderProgress: orderProgressReducer,
  location: locationReducer,
  scanner: scannerReducer,
};

const effects = [
  //
  authSaga(),
  routerSaga(),
  sessionSaga(),
  alertSaga(),
  errorSaga(),
  addressSaga(),
  orderProgressSaga(),
  locationSaga(),
  imagePickerSaga(),
  scannerSaga(),
];

export {reducers, effects};

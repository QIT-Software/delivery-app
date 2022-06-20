import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import {SpoonAndForkApi} from 'api/index';
import {FirebaseMessagingService} from 'services';
// import {Action} from 'redux-actions';
// import {MessageReceived} from 'state/ducks/pushNotification/actions';
// import {NotificationData} from 'state/ducks/pushNotification/model';
// import {courierActions} from 'state/ducks/courier';
// import {CourierDetailsContainer} from 'state/entities/CourierDetailsContainer';
// import State from 'state/entities/State';
// import {courierDetailsActions} from 'state/ducks/courierDetails';
import {alertActions} from 'state/ducks/alert';

function* updateToken() {
  try {
    const token = yield FirebaseMessagingService.getToken();
    yield SpoonAndForkApi.updateFirebaseToken({registrationId: token});
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.UPDATE_TOKEN, updateToken),
  ]);
}

import translations from 'resources/Translations.json';
import Localization from './localization/Localization';
import {AuthInfoKeeper} from 'auth';
import {initializeServicesAsync} from 'services';
import {configureStore} from 'state/StateInitializer';
import {rootSaga} from 'state/ducks';
import {AnyAction} from 'redux';
import {getDispatch} from 'state';
import {pushNotificationActions} from 'state/ducks/pushNotification';

// region Helpers
const dispatch = (action: AnyAction) => getDispatch()(action);
// endregion

const initAsync = async () => {
  await Localization.initAsync(translations);

  await configureStore(rootSaga);

  await AuthInfoKeeper.initialize();

  await initializeServicesAsync();

  dispatch(pushNotificationActions.updateToken());
};

export {
  //
  initAsync,
};

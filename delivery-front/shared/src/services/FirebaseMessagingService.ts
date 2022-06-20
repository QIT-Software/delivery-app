import IInitializeService from 'services/core/IInitializeService';
import IFirebaseMessagingService from './IFirebaseMessagingService';
import firebase from 'firebase';

// region Helpers

// endregion

export default class FirebaseMessagingService
  implements IFirebaseMessagingService, IInitializeService {
  // eslint-disable-next-line class-methods-use-this
  async initialize() {
    try {
      const firebaseConfig = {
        apiKey: 'AIzaSyDnD_3GhOlEg6lsmIF03pKiL_w__hJM424',
        // authDomain: 'scoutApp-4db98.firebaseapp.com',
        // databaseURL: 'https://scoutApp-4db98.firebaseio.com',
        projectId: 'scoutApp-4db98',
        storageBucket: 'scoutApp-4db98.appspot.com',
        messagingSenderId: '336838062363',
        appId: '1:668429680521:ios:d9e6d7f601e37270702b58',
        measurementId: 'G-LFXEHNRSJG',
      };

      firebase.initializeApp(firebaseConfig);

      return true;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getToken(): Promise<string | null> {
    return firebase.messaging().getToken();
  }
}

import IFirebaseMessagingService from './IFirebaseMessagingService';
import FirebaseMessagingService from './FirebaseMessagingService';
import {createConfigService, getConfigEnv} from '@spryrocks/config-react';
import resources from '../resources/env.tmp.json';

const firebaseMessagingServiceInstance = new FirebaseMessagingService();
const firebaseMessagingService: IFirebaseMessagingService = firebaseMessagingServiceInstance;

const configService = createConfigService(getConfigEnv(), undefined, resources);

export {
  //
  firebaseMessagingService as FirebaseMessagingService,
  configService as ConfigService,
};

export const initializeServicesAsync = async () => {
  await firebaseMessagingServiceInstance.initialize();
};

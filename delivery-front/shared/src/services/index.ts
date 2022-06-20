import IFirebaseMessagingService from './IFirebaseMessagingService';
import FirebaseMessagingService from './FirebaseMessagingService';
import IConfigService from './config/IConfigService';
import ConfigService from './config/ConfigService';
import {getNodeEnv, getBuildType} from './config/ConfigUtils';
import IAlertService from './IAlertService';
import AlertService from './AlertService';
import ILocationService from 'services/ILocationService';
import LocationService from 'services/LocationService';
import IExternalService from './IExternalService';
import ExternalService from './ExternalService';

// TODO: add IPermissionService;

const firebaseMessagingServiceInstance = new FirebaseMessagingService();
const firebaseMessagingService: IFirebaseMessagingService = firebaseMessagingServiceInstance;

const alertService: IAlertService = new AlertService();

const configService: IConfigService = new ConfigService(getNodeEnv(), getBuildType());

const externalService: IExternalService = new ExternalService();
const locationService: ILocationService = new LocationService();

export {
  //
  firebaseMessagingService as FirebaseMessagingService,
  configService as ConfigService,
  externalService as ExternalService,
  alertService as AlertService,
  locationService as LocationService,
};

export const initializeServicesAsync = async () => {
  await firebaseMessagingServiceInstance.initialize();
};

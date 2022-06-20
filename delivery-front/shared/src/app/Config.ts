import {Platform as RNPlatform} from 'react-native';
import {AppTypeHolder} from 'app/AppInitializer';
import {Platform} from 'entities/Platform';
import AppType from 'entities/AppType';
import {getBuildType} from 'services/config/ConfigUtils';
import BuildType from 'entities/BuildType';

const getAppType = (): AppType => {
  const {appType} = AppTypeHolder;
  if (!appType) throw new Error('appType is not defined');
  return appType;
};

const getPlatform = (): Platform => {
  switch (RNPlatform.OS) {
    case 'android':
      return Platform.Android;
    case 'ios':
      return Platform.iOS;
    default:
      throw new Error(`Unknown platform: ${RNPlatform.OS}`);
  }
};

export default {
  getAppType,
  getPlatform,
};

export const isClient = () => getAppType() === AppType.Client;
export const isCourier = () => getAppType() === AppType.Courier;
export const isRestaurant = () => getAppType() === AppType.Restaurant;

export const isDevelop = () => getBuildType() === BuildType.Develop;
export const isStaging = () => getBuildType() === BuildType.Staging;
export const isProduction = () => getBuildType() === BuildType.Production;

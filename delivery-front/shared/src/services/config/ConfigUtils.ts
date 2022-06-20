import BuildType from 'entities/BuildType';
import RNConfig from 'react-native-config';
import RNBuildConfig from 'react-native-build-config';
import AppType from 'entities/AppType';

export const getBuildType = (): BuildType => {
  const buildType = BuildType[RNBuildConfig.Build as BuildType];
  if (!buildType) throw new Error('buildType is not defined');
  return buildType;
};

export const getAppType = (): AppType => {
  const appTypeString = RNConfig.App;
  if (!appTypeString) throw new Error('appType is not defined');
  switch (appTypeString) {
    case 'client':
      return AppType.Client;
    case 'courier':
      return AppType.Courier;
    case 'restaurant':
      return AppType.Restaurant;
    default:
      throw new Error(`unknown appType '${appTypeString}'`);
  }
};

export const getNodeEnv = (): string => {
  const buildType = getBuildType();
  switch (buildType) {
    case BuildType.Develop:
      return 'development';
    case BuildType.Staging:
      return 'staging';
    case BuildType.Production:
      return 'production';
    default:
      throw new Error(`unknown buildType '${buildType}'`);
  }
};

export const getAppEnv = (): string => {
  const appType = getAppType();
  switch (appType) {
    case AppType.Client:
      return 'client';
    case AppType.Courier:
      return 'courier';
    case AppType.Restaurant:
      return 'restaurant';
    default:
      throw new Error('appType is not defined');
  }
};

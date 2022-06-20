import BuildType from 'entities/BuildType';

export const getBuildType = (): BuildType => {
  const buildType = BuildType[(process.env.REACT_APP_NODE_ENV || 'Develop') as BuildType];
  if (!buildType) throw new Error('buildType is not defined');
  return buildType;
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

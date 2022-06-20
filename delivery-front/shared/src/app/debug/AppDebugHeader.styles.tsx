import {StyleSheet} from 'react-native';
import BuildType from 'entities/BuildType';

const createStyles = (buildType: BuildType) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: buildType === BuildType.Develop ? 'red' : 'green',
    },
    container: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
  });

export {createStyles};

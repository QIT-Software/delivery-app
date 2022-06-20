import React from 'react';
import {SafeAreaView as RNSafeAreaView, ViewProps, ViewStyle} from 'react-native';
import styles from './SafeAreaView.styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface SafeAreaProps extends ViewProps {
  style?: ViewStyle;
}

const SafeAreaView: React.FC<SafeAreaProps> = ({style, ...otherProps}) => {
  return (
    <RNSafeAreaView
      {...otherProps}
      style={{
        ...styles.safeArea,
        paddingTop: getStatusBarHeight(),
        ...style,
      }}
    />
  );
};

export default SafeAreaView;

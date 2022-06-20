import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import styles from './ActivityIndicator.styles';

const ActivityIndicatorFill: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ActivityIndicatorFill;

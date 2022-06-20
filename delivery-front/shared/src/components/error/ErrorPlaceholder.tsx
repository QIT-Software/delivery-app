import React from 'react';
import {Text, View, ViewStyle} from 'react-native';
import styles from 'shared/src/components/error/ErrorPlaceholder.styles';

interface ErrorPlaceholderFillProps {
  style?: ViewStyle;
  message: string;
  details?: string;
  refresh?: () => void;
}

const ErrorPlaceholder: React.FC<ErrorPlaceholderFillProps> = ({
  style,
  message,
  // details,
  // refresh,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}> {message}</Text>
    </View>
  );
};

export default ErrorPlaceholder;

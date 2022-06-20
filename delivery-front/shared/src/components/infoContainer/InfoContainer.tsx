import React from 'react';
import {Text, TextStyle, View, ViewProps, ViewStyle} from 'react-native';
import styles from './InfoContainer.styles';

interface orderPaymentContainerProps extends ViewProps {
  style?: ViewStyle;
  title: string;
  titleStyle?: TextStyle;
}

const InfoContainer: React.FC<orderPaymentContainerProps> = ({
  style,
  title,
  titleStyle,
  children,
  ...otherProps
}) => {
  return (
    <View
      {...otherProps}
      style={{
        ...styles.container,
        ...style,
      }}
    >
      <View style={styles.titleContainer}>
        <Text
          style={{
            ...styles.title,
            ...titleStyle,
          }}
        >
          {title}:
        </Text>
      </View>
      {children}
    </View>
  );
};

export default InfoContainer;

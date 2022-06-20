import React from 'react';
import {Text, TextStyle, View, ViewProps, ViewStyle} from 'react-native';
import styles from './InputContainer.styles';

interface InputContainerProps extends ViewProps {
  style?: ViewStyle;
  title: string;
  titleStyle?: TextStyle;
  rightItem?: React.ReactElement;
}

const InputContainer: React.FC<InputContainerProps> = ({
  style,
  title,
  titleStyle,
  children,
  rightItem,
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
            ...titleStyle,
          }}
        >
          {title}
        </Text>
        {rightItem && rightItem}
      </View>
      {children}
    </View>
  );
};

export default InputContainer;

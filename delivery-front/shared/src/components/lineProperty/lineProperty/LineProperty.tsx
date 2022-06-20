import React from 'react';
import {View, ViewStyle, ViewProps, Text} from 'react-native';
import styles from './LineProperty.styles';

interface LinePropertyProps extends ViewProps {
  text: () => React.ReactNode;
  element: () => React.ReactNode;
  containerStyle?: ViewStyle;
  rightContainerStyle?: ViewStyle;
}

const LineProperty: React.FC<LinePropertyProps> = ({
  text,
  element,
  containerStyle,
  rightContainerStyle,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}
    >
      <View style={styles.wrapper}>
        <View
          style={{
            ...styles.leftInnerContainer,
          }}
        >
          <Text style={styles.text}>{text()}</Text>
        </View>
        <View
          style={{
            ...styles.rightInnerContainer,
            ...rightContainerStyle,
          }}
        >
          {element()}
        </View>
      </View>
    </View>
  );
};

export default LineProperty;

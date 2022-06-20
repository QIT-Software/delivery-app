import React from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import styles from './Card.styles';

export interface CardProps extends ViewProps {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  visible?: boolean;
  onPress?: void;
}

const Card: React.FC<CardProps> = ({children, style, containerStyle, ...otherProps}) => {
  return (
    <View {...otherProps} style={[styles.shadow, style]}>
      <View style={[styles.mainContainer, containerStyle]}>{children}</View>
    </View>
  );
};

export default Card;

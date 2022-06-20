import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import styles from './ValidationHint.styles';

interface ValidationProps {
  textStyle?: TextStyle;
  viewStyle?: ViewStyle;
  validation?: string;
}

const ValidationHint: React.FC<ValidationProps> = ({
  //
  textStyle,
  viewStyle,
  validation,
}) => {
  return (
    <View>
      {validation !== undefined && (
        <View style={{...viewStyle}}>
          <Text style={{...textStyle, ...styles.hint}}>{validation}</Text>
        </View>
      )}
    </View>
  );
};

export default ValidationHint;

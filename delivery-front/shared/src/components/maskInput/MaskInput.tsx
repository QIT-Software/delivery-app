import React from 'react';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import styles from './MaskInput.styles';
import {TextStyle, View, ViewStyle} from 'react-native';
import ValidationHint from '../validationHint/ValidationHint';

interface MaskInputProps extends TextInputMaskProps {
  textStyle?: TextStyle;
  validationHint?: string;
}
const MaskInput: React.FC<MaskInputProps> = ({
  textStyle,
  editable,
  type,
  options,
  value,
  placeholder,
  onChangeText,
  validationHint,
  ...other
}) => {
  const inputBorderStyle: ViewStyle = styles.textInputEmpty || styles.textInputFull;

  return (
    <View style={styles.container}>
      <TextInputMask
        type={type}
        underlineColorAndroid="transparent"
        placeholderTextColor="#90B3DD"
        selectionColor="#0433BF"
        style={{
          ...styles.textInput,
          ...inputBorderStyle,
          ...textStyle,
        }}
        options={options}
        editable={editable}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...other}
      />
      <ValidationHint validation={validationHint} />
    </View>
  );
};

export default MaskInput;

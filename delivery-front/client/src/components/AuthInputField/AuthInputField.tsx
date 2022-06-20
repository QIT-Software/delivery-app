import React, {useState} from 'react';
import {
  Image,
  KeyboardTypeOptions,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import styles from './AuthInputField.styles';
import {ValidationHint} from 'components';
import {PassShow} from 'components/AuthInputField/assets';

interface AuthInputFieldProps extends ViewProps {
  style?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  textStyle?: TextStyle;
  type?: 'none' | 'emailAddress' | 'password' | 'telephoneNumber' | 'date' | 'decimal';
  maxLength?: number;
  numberOfLines?: number;
  onChangeText?: (text: string) => void;
  value?: string;
  isMultiline?: boolean;
  isEditable?: boolean;
  validationHint?: string;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  style,
  placeholder,
  textStyle,
  type,
  maxLength,
  numberOfLines,
  onChangeText,
  value,
  isMultiline,
  isEditable,
  validationHint,
  ...otherProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Keyboard configuration
  let keyboardType: KeyboardTypeOptions = 'default';
  let autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  let inputBorderStyle: ViewStyle;

  if (value == null || value === '') {
    inputBorderStyle = styles.textInputEmpty;
  } else {
    inputBorderStyle = styles.textInputFull;
  }

  switch (type) {
    case 'emailAddress':
      keyboardType = 'email-address';
      autoCapitalize = 'none';
      break;
    case 'telephoneNumber':
      keyboardType = 'phone-pad';
      break;
    case 'decimal':
      keyboardType = 'decimal-pad';
      break;
  }

  return (
    <View style={[styles.container, style]}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="#90B3DD"
        style={{
          ...styles.textInput,
          ...inputBorderStyle,
          ...textStyle,
        }}
        autoCapitalize={autoCapitalize}
        selectionColor="#0433BF"
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={isMultiline}
        editable={isEditable}
        onChangeText={onChangeText}
        value={value}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        textContentType={type !== 'decimal' ? type : undefined}
        secureTextEntry={type === 'password' && !isPasswordVisible}
        keyboardType={keyboardType}
        placeholder={placeholder}
        {...otherProps}
      />
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.showHidePasswordContainer}
        >
          {value == null || value === '' ? (
            <Image source={PassShow} style={styles.pass} />
          ) : (
            <Image source={PassShow} style={styles.pass} />
          )}
        </TouchableOpacity>
      )}
      <ValidationHint validation={validationHint} />
    </View>
  );
};

export default AuthInputField;

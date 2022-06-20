import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AuthInputField from 'components/AuthInputField/AuthInputField';
import styles from './Auth.styles';
import LinearGradient from 'react-native-linear-gradient';
import {useRouterActions, useAuthActions} from 'state/hooks/UseActions';
import {AuthProps} from 'components/Auth/Auth.props';
import {ArrowDown} from 'routes/auth/welcome/assets';
import {BackBtn} from 'routes/auth/assets';
import {isRestaurant} from 'app/Config';
import {SearchBarWithSuggestions} from 'components';
import {useSelector} from 'state/hooks';
import {useTranslation} from 'react-i18next';

const Auth: React.FC<AuthProps> = ({
  title = ' ',
  description = ' ',
  backBtn = false,
  emailInput = false,
  passwordInput = false,
  nameInput = false,
  phoneInput = false,
  addressInput = false,
  signUpBtn = false,
  sendBtn = false,
  forgotPassword = false,
  noAccount = false,
  rememberPassword = false,
  modal = false,
  onPressHideButton,
  // isForgotPasswordScreen = true,
}) => {
  const [showAddressSearch, setShowAddressSearch] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const routerActions = useRouterActions();
  const actions = useAuthActions();

  const {t} = useTranslation('auth');

  const {address} = useSelector((state) => state);

  return (
    <View style={!modal && styles.container}>
      <View>
        {backBtn ? (
          <TouchableOpacity
            onPress={() => routerActions.goBack()}
            style={styles.backButton}
          >
            <Image source={BackBtn} />
          </TouchableOpacity>
        ) : (
          <View style={styles.popUpContainer}>
            <TouchableOpacity onPress={onPressHideButton}>
              <Image source={ArrowDown} />
            </TouchableOpacity>
            <Text style={styles.textMainPopUp}>{title}</Text>
            <Text style={styles.textPopUp}>{description}</Text>
          </View>
        )}
        {!modal && (
          <View style={styles.centeredItems}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{description}</Text>
            </View>
          </View>
        )}
        <View style={modal ? styles.inputsPopUp : styles.inputsContainer}>
          {nameInput && (
            <AuthInputField
              value={name}
              onChangeText={(value) => setName(value)}
              style={{
                ...styles.inputPopUp,
              }}
              placeholder={t('name')}
            />
          )}
          {phoneInput && (
            <AuthInputField
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
              style={{
                ...styles.inputPopUp,
              }}
              type="telephoneNumber"
              placeholder={t('phone')}
            />
          )}
          {addressInput &&
            isRestaurant() &&
            (!address?.location ? (
              <TouchableOpacity
                style={styles.inputPopUp}
                onPress={() => {
                  setShowAddressSearch(true);
                  actions.chooseAddress('');
                }}
              >
                <Text style={styles.addressValue}>{t('address')}</Text>
                <SearchBarWithSuggestions
                  showPopUp={showAddressSearch}
                  setShowPopUp={setShowAddressSearch}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  actions.chooseAddress('');
                }}
              >
                <Text>{address?.location.description}</Text>
                <SearchBarWithSuggestions
                  showPopUp={showAddressSearch}
                  setShowPopUp={setShowAddressSearch}
                />
              </TouchableOpacity>
            ))}
          {emailInput && (
            <AuthInputField
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.inputPopUp}
              type="emailAddress"
              placeholder="Email"
            />
          )}

          {passwordInput && (
            <AuthInputField
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.inputPopUp}
              type="password"
              placeholder={t('password')}
            />
          )}
        </View>
        {modal && (
          <TouchableOpacity onPress={() => actions.login({email, password})}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF8C29', '#FF2D55']}
              style={styles.btn}
            >
              <Text style={styles.btnText}>{t('signIn')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {signUpBtn && (
          <TouchableOpacity onPress={() => routerActions.navigateToSignUp()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF8C29', '#FF2D55']}
              style={styles.btn}
            >
              <Text style={styles.btnText}>{t('signUp')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {sendBtn && (
          <TouchableOpacity
            onPress={() => {
              actions.registerUser({name, email, phoneNumber, password});
            }}
          >
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF8C29', '#FF2D55']}
              style={styles.btn}
            >
              <Text style={styles.btnText}>{t('send')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        <View style={styles.bottomPopUpContainer}>
          {forgotPassword && (
            <View
              style={{
                ...styles.bottomPopUpText,
                ...styles.Main,
              }}
            >
              <Text style={styles.mainText}>{t('forgotPasswordSignIn')}</Text>
              <TouchableOpacity onPress={() => routerActions.navigateToForgotPassword()}>
                <Text style={styles.press}> {t('restore')}</Text>
              </TouchableOpacity>
            </View>
          )}
          {rememberPassword && (
            <View
              style={{
                ...styles.bottomPopUpText,
                ...styles.Main,
              }}
            >
              <Text style={styles.mainText}>{t('rememberAnAccount')}?</Text>
              <TouchableOpacity>
                <Text style={styles.press}> {t('signIn')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {noAccount && (
            <View style={styles.bottomPopUpText}>
              <Text style={styles.secondaryText}>{t('noAccount')}? </Text>
              <TouchableOpacity onPress={() => routerActions.navigateToSignUp()}>
                <Text style={styles.press}> {t('signUp')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Auth;

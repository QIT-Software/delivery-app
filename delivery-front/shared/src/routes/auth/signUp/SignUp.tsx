import React from 'react';
import Auth from '../../../components/Auth/Auth';
import {SafeAreaView} from 'react-native';
import styles from 'components/Auth/Auth.styles';
import {useTranslation} from 'react-i18next';

const SignUp: React.FC = () => {
  const {t} = useTranslation('auth');
  return (
    <SafeAreaView style={styles.flex}>
      <Auth
        title={t('createAccount')}
        description={t('signUpDescription')}
        backBtn
        passwordInput
        nameInput
        phoneInput
        emailInput
        sendBtn
        addressInput
      />
    </SafeAreaView>
  );
};

export default SignUp;

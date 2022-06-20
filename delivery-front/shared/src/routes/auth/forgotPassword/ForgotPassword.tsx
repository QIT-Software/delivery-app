import React from 'react';
import Auth from 'components/Auth/Auth';
import styles from 'components/Auth/Auth.styles';
import {SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';

const Welcome: React.FC = () => {
  const {t} = useTranslation('auth');

  return (
    <SafeAreaView style={styles.flex}>
      <Auth
        title={t('forgotPassword')}
        description={t('forgotPasswordDescription')}
        backBtn
        emailInput
        sendBtn
        noAccount
      />
    </SafeAreaView>
  );
};

export default Welcome;

import React, {useState} from 'react';
import {View, Image, ImageBackground, Text, TouchableOpacity} from 'react-native';

import styles from './Welcome.styles';
import {BgAuth, AuthLogo, ForCouriers} from './assets/index';
import Auth from 'components/Auth/Auth';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useRouterActions} from 'state/hooks/UseActions';
import ModalPopUp from 'components/modalPopUp/ModalPopUp';
import {isCourier, isRestaurant} from 'app/Config';

const Welcome: React.FC = () => {
  const {t} = useTranslation('auth');
  const [modalVisible, setModalVisible] = useState(false);
  const routerActions = useRouterActions();
  return (
    <View style={styles.container}>
      <ImageBackground source={BgAuth} style={styles.bg}>
        <View style={styles.logoContainer}>
          <Image source={AuthLogo} />
          {isCourier() && <Image source={ForCouriers} />}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF8C29', '#FF2D55']}
              style={styles.btn}
            >
              <Text style={styles.btnText}>{t('signIn')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          {!isRestaurant() && (
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
          {modalVisible && (
            <ModalPopUp>
              <Auth
                title={t('welcomeTitle')}
                description={t('welcomeDescription')}
                modal
                emailInput
                passwordInput
                forgotPassword
                noAccount
                onPressHideButton={() => setModalVisible(false)}
              />
            </ModalPopUp>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

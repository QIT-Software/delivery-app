import React from 'react';
import styles from './SettingsMain.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRouterActions} from 'state/client/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {useTranslation} from 'react-i18next';

const SettingsMain: React.FC = () => {
  const routerActions = useRouterActions();
  // const actions = useAuthActions();
  const {t} = useTranslation('settings');

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('settings')}</Text>
        </View>
      </View>
      <View style={styles.settingsInnerContainer}>
        <TouchableOpacity onPress={() => routerActions.navigateToProfile()}>
          <View style={styles.settingsInner}>
            <Text style={styles.settingsInnerTitle}>{t('profile')}</Text>
            <Image source={BackBtn} style={styles.goBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => routerActions.navigateToNotification()}>
          <View style={styles.settingsInner}>
            <Text style={styles.settingsInnerTitle}>{t('notifications')}</Text>
            <Image source={BackBtn} style={styles.goBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => routerActions.navigateToPayments()}>
          <View style={styles.settingsInner}>
            <Text style={styles.settingsInnerTitle}>{t('payments')}</Text>
            <Image source={BackBtn} style={styles.goBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => routerActions.navigateToUserOrders()}>
          <View style={styles.settingsInner}>
            <Text style={styles.settingsInnerTitle}>Your Orders</Text>
            <Image source={BackBtn} style={styles.goBtn} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsMain;

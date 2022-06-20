import React, {useEffect} from 'react';
import styles from './Notification.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSettingsActions, useRouterActions} from 'state/client/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import LineProperty from 'components/lineProperty/LineProperty';
import {RequireLoadable} from 'components';
import {useSelector} from 'state/client/hooks';
import {useTranslation} from 'react-i18next';

const Notification: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useSettingsActions();

  const state = useSelector((state) => state.preferences);

  useEffect(() => {
    actions.fetchPreferences();
  }, []);

  const {t} = useTranslation('settings');

  const renderTextForLineProperty = (title: string) => {
    return <Text style={styles.notificationInnerTitle}>{title}</Text>;
  };

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('notifications')}</Text>
        </View>
      </View>
      <RequireLoadable data={state}>
        {({preferences}) => (
          <View style={styles.notificationInnerContainer}>
            <View style={styles.notificationInner}>
              <Text style={styles.notificationInnerTitle}>{t('pushNotifications')}</Text>
              <LineProperty
                functionalityType="switch"
                leftElement={() => renderTextForLineProperty(t('pushNotifications'))}
                switchState={preferences.allowPushNotifications}
                onPress={() => {
                  actions.updatePreferences({
                    allowPushNotifications: !preferences.allowPushNotifications,
                  });
                }}
              />
            </View>

            <View style={styles.notificationInner}>
              <Text style={styles.notificationInnerTitle}>{t('emailNotifications')}</Text>
              <LineProperty
                functionalityType="switch"
                leftElement={() => renderTextForLineProperty(t('emailNotifications'))}
                switchState={preferences.allowEmailNotifications}
                onPress={() => {
                  actions.updatePreferences({
                    allowEmailNotifications: !preferences.allowEmailNotifications,
                  });
                }}
              />
            </View>

            {/* <View style={styles.notificationInner}> */}
            {/*  <Text style={styles.notificationInnerTitle}>SMS Notifications</Text> */}
            {/*  <LineProperty */}
            {/*    functionalityType="switch" */}
            {/*    leftElement={() => renderTextForLineProperty('Push Notifications')} */}
            {/*    switchState={preferences.allowSmsNotifications} */}
            {/*    onPress={() => { */}
            {/*      actions.updatePreferences({ */}
            {/*        allowSmsNotifications: !preferences.allowSmsNotifications, */}
            {/*      }); */}
            {/*    }} */}
            {/*  /> */}
            {/* </View> */}

            {/* <View style={styles.notificationInner}> */}
            {/*  <Text style={styles.notificationInnerTitle}>Setting #4</Text> */}
            {/*  <LineProperty */}
            {/*    functionalityType="switch" */}
            {/*    leftElement={() => renderTextForLineProperty('Push Notifications')} */}
            {/*    switchState={preferences.allowNotifications} */}
            {/*    onPress={() => { */}
            {/*      actions.updateProfilePreferences({ */}
            {/*        allowNotifications: !preferences.allowNotifications, */}
            {/*      }); */}
            {/*    }} */}
            {/*  /> */}
            {/* </View> */}
          </View>
        )}
      </RequireLoadable>
    </View>
  );
};

export default Notification;

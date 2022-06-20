import React, {useEffect} from 'react';
import styles from './Profile.styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {useAuthActions, useRouterActions} from 'state/client/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {EditProfile, ProfileImage} from 'routes/settings/assets';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Session} from 'entities/Session';
import {RequireLoadable} from 'components';
import RequireSession from 'components/require/RequireSession';
import {useTranslation} from 'react-i18next';
import Image from '../../../components/image/Image';
import {useHistory} from 'react-router';

interface UserProfileProps {
  session: LoadableContainer<Session>;
}

const Profile: React.FC<UserProfileProps> = ({session}) => {
  const routerActions = useRouterActions();
  const actions = useAuthActions();
  const authActions = useAuthActions();
  const history = useHistory();

  const {t} = useTranslation('settings');

  useEffect(() => {
    authActions.fetchSession({history});
  }, []);
  return (
    <View style={styles.profileContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('profile')}</Text>
        </View>
        <TouchableOpacity onPress={() => routerActions.navigateToEditUser()}>
          <Image source={EditProfile} style={styles.editBtn} />
        </TouchableOpacity>
      </View>
      <RequireLoadable data={session}>
        {({account}) => (
          <>
            <View style={styles.profileHeaderContainer}>
              {account.user.image ? (
                <Image source={{uri: account.user.image}} style={styles.profileImage} />
              ) : (
                <Image source={ProfileImage} style={styles.profileImage} />
              )}
              <Text style={styles.profileName}>{account.user.name}</Text>
            </View>
            <View style={styles.profileInnerContainer}>
              <View style={styles.profileInner}>
                <Text style={styles.profileInnerTitle}>Email</Text>
                <Text style={styles.profileInnerInfo}>{account.info.email}</Text>
              </View>
              <View style={styles.profileInner}>
                <Text style={styles.profileInnerTitle}>{t('phoneNumber')}</Text>
                <Text style={styles.profileInnerInfo}>{account.info.phoneNumber}</Text>
              </View>
              <View style={styles.profileInner}>
                <Text style={styles.profileInnerTitle}>{t('password')}</Text>
                <View style={styles.profilePasswordInner}>
                  <Text style={styles.profilePasswordInnerInfo}>• • • • • • • •</Text>
                  <TouchableOpacity>
                    <Image source={BackBtn} style={styles.goBtn} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </RequireLoadable>
      <TouchableOpacity style={styles.logoutContainer} onPress={() => actions.logout()}>
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

// export default Profile;

export default () => (
  <RequireSession>{(session) => <Profile session={session} />}</RequireSession>
);

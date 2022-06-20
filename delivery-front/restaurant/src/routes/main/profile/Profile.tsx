import React from 'react';
import styles from './Profile.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useAuthActions} from 'state/client/hooks/UseActions';
import {useRouterActions} from 'state/restaurant/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {RequireLoadable} from 'components';
import {useSelector} from 'react-redux';
import State from 'state/restaurant/entities/State';

const Profile: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useAuthActions();

  const state = useSelector((state: State) => state);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profile</Text>
        </View>
      </View>
      <View style={styles.restaurantProfileInfo}>
        <RequireLoadable data={state.currentRestaurant}>
          {({currentRestaurant}) => (
            <>
              <View style={styles.profileHeaderContainer}>
                {/* <Text style={styles.profileCurrent}>Current session:</Text> */}
                <Text style={styles.profileName}>{currentRestaurant.description}</Text>
              </View>
              <View style={styles.profileInnerContainer}>
                <View style={styles.profileInner}>
                  <Text style={styles.profileInnerTitle}>Cuisines</Text>
                  {currentRestaurant.cuisines.map((d) => (
                    <Text key={d.id} style={styles.profileInnerInfo}>
                      {d.nationality}
                    </Text>
                  ))}
                </View>
              </View>
            </>
          )}
        </RequireLoadable>
      </View>
      <TouchableOpacity style={styles.logoutContainer} onPress={() => actions.logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// export default Profile;

export default Profile;

import React from 'react';
import {View} from 'react-native';
import {Route, Redirect} from 'react-router';
import styles from './Settings.styles';
import Profile from './profile/Profile';
import EditUserProfile from './profile/editUserProfile/EditUserProfile';

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Route exact path="/settings">
        <Redirect to="/settings/profile" />
      </Route>

      <Route exact path="/settings/profile" component={Profile} />

      <Route exact path="/settings/editUserProfile" component={EditUserProfile} />

      <Route path="/settings/:id/imagePickerPopUp" component={EditUserProfile} />

      <Route path="/settings/:id/documentPickerPopUp" component={Profile} />
    </View>
  );
};

export default Settings;

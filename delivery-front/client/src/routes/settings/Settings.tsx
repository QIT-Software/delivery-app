import React from 'react';
import {View} from 'react-native';
import {Route, Redirect} from 'react-router';
import SettingsMain from '../settings/settingsMain/SettingsMain';
import styles from './Settings.styles';
import Profile from './profile/Profile';
import Notification from './notification/Notification';
import Payments from 'routes/settings/payments/Payments';
import EditUserProfile from 'routes/settings/profile/editUserProfile/EditUserProfile';
import UserOrders from 'routes/settings/userOrders/UserOrders';

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Route exact path="/settings">
        <Redirect to="/settings/settingsMain" />
      </Route>

      <Route exact path="/settings/settingsMain" component={SettingsMain} />

      <Route exact path="/settings/profile" component={Profile} />

      <Route exact path="/settings/editUserProfile" component={EditUserProfile} />

      <Route exact path="/settings/notification" component={Notification} />

      <Route exact path="/settings/payments" component={Payments} />

      <Route exact path="/settings/userOrders" component={UserOrders} />

      <Route path="/settings/:id/imagePickerPopUp" component={EditUserProfile} />
    </View>
  );
};

export default Settings;

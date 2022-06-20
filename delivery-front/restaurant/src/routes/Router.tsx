import React from 'react';
import {NativeRouter, Switch} from 'react-router-native';
import Main from './main/Main';
import Profile from './main/profile/Profile';

import {Redirect, Route} from 'react-router';
import {Router as SharedRoutes} from 'routes/Router';

const Router: React.FC = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <SharedRoutes />
      </Switch>
    </NativeRouter>
  );
};

export default Router;

import React from 'react';
import {NativeRouter, Switch} from 'react-router-native';
import Main from './main/Main';

import {Redirect, Route} from 'react-router';
import {Router as SharedRoutes} from 'routes/Router';
import OrderProgress from './main/orderProgress/OrderProgress';
import Settings from './settings/Settings';

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
        <Route path="/settings">
          <Settings />
        </Route>

        <Route exact path="/orderProgress" component={OrderProgress} />

        {/* <Route exact path="/profile/imagePicker" component={Profile} /> */}

        <SharedRoutes />
      </Switch>
    </NativeRouter>
  );
};

export default Router;

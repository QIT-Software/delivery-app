import React from 'react';
import {NativeRouter, Switch} from 'react-router-native';
import Main from './main/Main';
import Settings from './settings/Settings';

import {Redirect, Route} from 'react-router';
import {Router as SharedRoutes} from 'routes/Router';
import OrderProgress from 'routes/main/orderProgress/OrderProgress';

const Router: React.FC = () => {
  return (
    <NativeRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/orderProgress/:id" component={OrderProgress} />
        <SharedRoutes />
      </Switch>
    </NativeRouter>
  );
};

export default Router;

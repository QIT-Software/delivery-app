import React from 'react';
import {App as SharedApp} from 'app/shared';
import {getStore} from 'state/client';
import AppInitializer from './AppInitializer';
import AppType from 'entities/AppType';
import Router from '../routes/Router';

const App: React.FC = () => {
  return (
    <SharedApp
      initAsync={AppInitializer.initAsync}
      getStore={getStore}
      appType={AppType.Client}
    >
      <Router />
    </SharedApp>
  );
};

export default App;

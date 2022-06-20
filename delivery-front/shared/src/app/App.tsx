import React, {useState} from 'react';
import {Store} from 'redux';
import i18n from 'i18next';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {logError} from 'utils/Logger';
import AppLoading from './AppLoading';
import {AppTypeHolder} from './AppInitializer';
import AppType from 'entities/AppType';
import {getAppType, getBuildType} from 'services/config/ConfigUtils';
import AppDebugHeader from 'app/debug/AppDebugHeader';
import BuildType from 'entities/BuildType';

interface AppProps {
  initAsync: () => Promise<void>;
  getStore: () => Store;
  appType: AppType;
}

const App: React.FC<AppProps> = ({
  //
  appType,
  initAsync,
  getStore,
  children,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={async () => {
          if (appType !== getAppType()) throw new Error('appType malformed');
          AppTypeHolder.appType = appType;
          await initAsync();
        }}
        onFinish={() => setIsReady(true)}
        onError={logError}
      />
    );
  }

  const buildType = getBuildType();
  const isDebug = buildType !== BuildType.Production;

  return (
    <Provider store={getStore()}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      {isDebug && <AppDebugHeader buildType={buildType} appType={appType} />}
    </Provider>
  );
};

export default App;

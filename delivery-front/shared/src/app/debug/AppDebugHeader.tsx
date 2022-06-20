import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {createStyles} from './AppDebugHeader.styles';
import BuildType from 'entities/BuildType';
import AppType from 'entities/AppType';
import DeviceInfo from 'react-native-device-info';

interface AppDebugHeaderProps {
  buildType: BuildType;
  appType: AppType;
}

const AppDebugHeader: FC<AppDebugHeaderProps> = ({buildType, appType}) => {
  const styles = createStyles(buildType);

  const [version, setVersion] = useState<string>();

  const loadVersion = async () => {
    const version = await DeviceInfo.getVersion();
    const buildNumber = await DeviceInfo.getBuildNumber();
    setVersion(`v${version} (${buildNumber})`);
  };

  useEffect(() => {
    loadVersion().then();
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>
          Build: {buildType}, App: {appType}, version:{version}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AppDebugHeader;

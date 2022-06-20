import React from 'react';
import {View} from 'react-native';
import styles from './MineLayout.styles';
import {useGuard} from 'state/hooks/UseGuard';

const MainLayout: React.FC = ({children}) => {
  useGuard({requireAuthenticated: true});
  return <View style={styles.flexOne}>{children}</View>;
};

export default MainLayout;

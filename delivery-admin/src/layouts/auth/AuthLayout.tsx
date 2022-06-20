import React from 'react';
import styles from './AuthLayout.module.scss';

const AuthLayout: React.FC = ({children}) => {
  return <div className={styles.authContainer}>{children}</div>;
};

export default AuthLayout;

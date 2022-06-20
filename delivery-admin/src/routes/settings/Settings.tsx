import React, {useEffect} from 'react';
import styles from './Settings.module.scss';
import {useHistory} from 'react-router-dom';
import {AuthInfoKeeper} from 'auth';
import {useTranslation} from 'react-i18next';

const Settings: React.FC = () => {
  const {t} = useTranslation('settings');
  const history = useHistory();

  useEffect(() => {
    AuthInfoKeeper.isAuthenticated().then((isAuthenticated) => {
      if (!isAuthenticated) {
        history.push('/auth');
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <span>{t('settings')}</span>
    </div>
  );
};

export default Settings;

import React from 'react';
import styles from './Avatar.module.scss';
import {useTranslation} from 'react-i18next';

interface AvatarProps {
  url: string;
}

const Avatar: React.FC<AvatarProps> = ({url}) => {
  const {t} = useTranslation('avatar');
  return (
    <span className={styles.root}>
      <div className={styles.avatar}>
        <img className={styles.avatar__img} src={url} alt={t('avatar')} />
      </div>
    </span>
  );
};

export default Avatar;

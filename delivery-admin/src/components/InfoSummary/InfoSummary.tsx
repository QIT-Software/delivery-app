import React from 'react';
import styles from './InfoSummary.module.scss';

interface InfoSummary {}

const InfoSummary: React.FC<InfoSummary> = ({children}) => {
  return <div className={styles.infoSummary}>{children}</div>;
};

export default InfoSummary;

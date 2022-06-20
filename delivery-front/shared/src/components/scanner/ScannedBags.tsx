import {Image, ScrollView, Text, View} from 'react-native';
import styles from 'components/scanner/ScannedBags.styles';
import BagItem from './BagItem';
import React from 'react';
import {Bag} from 'entities/Bag';
import {ScannerBag, ScannerMode} from 'state/restaurant/entities/Scanner';
import {EmptyBag} from './assets';
import {useTranslation} from 'react-i18next';

export interface ScannerProps {
  bags: ScannerBag[];
  mode: ScannerMode;
  deletePress: (item: Bag) => void;
}

const ScannedBags: React.FC<ScannerProps> = ({bags, deletePress, mode}) => {
  const {t} = useTranslation('scannedBags');
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContentContainerStyle}
    >
      {bags.length < 1 ? (
        <>
          <View style={styles.absoluteEmptyContainer}>
            <Image style={styles.absoluteEmptyStyle} source={EmptyBag} />
            <Text style={styles.absoluteTextEmptyStyle}>{t('noScanedBags')}</Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.absoluteTextEmptyStyle}>{t('scannedBags')}</Text>
          {bags.map((item, index) => (
            <BagItem
              title={`${index + 1}. #${item.code}`}
              deleteButton={
                mode === ScannerMode.deletable
                  ? {onPress: () => deletePress(item)}
                  : undefined
              }
              checked={mode === ScannerMode.checkable ? item.scanned : undefined}
              key={item.id}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default ScannedBags;

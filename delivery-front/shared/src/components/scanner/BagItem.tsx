import {Image, Text, View} from 'react-native';
import styles from './BagItem.styles';
import {Button} from 'components/index';
import {CheckMark, Delete} from './assets';
import React from 'react';

interface RestaurantBagItemProps {
  title: string;
  checked: boolean | undefined;
  deleteButton:
    | {
        onPress: () => void;
      }
    | undefined;
}

const renderCheckedItem = (checked: boolean) => (
  <View style={styles.deleteBag}>
    {checked ? <Image source={CheckMark} /> : <Image source={Delete} />}
  </View>
);

const renderDeleteButton = (deleteButton: {onPress: () => void}) => (
  <Button
    style={styles.deleteBag}
    renderLeftImage={() => <Image source={Delete} />}
    onPress={deleteButton.onPress}
  />
);

const BagItem: React.FC<RestaurantBagItemProps> = ({title, checked, deleteButton}) => {
  return (
    <View style={styles.bagContainer}>
      <Text style={styles.bag}>{title}</Text>
      {checked !== undefined && renderCheckedItem(checked)}
      {deleteButton && renderDeleteButton(deleteButton)}
    </View>
  );
};

export default BagItem;

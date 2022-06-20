import {ViewProps, View, Text} from 'react-native';
import React from 'react';
import styles from './SetList.styles';
import Dish from 'entities/Dish';

interface SetItemProps extends ViewProps {
  setMenu: Dish;
}

const SetList: React.FC<SetItemProps> = ({setMenu}) => {
  const {name, weight, kal} = setMenu;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.calories}>
          {weight}g/{kal}kal
        </Text>
      </View>
    </View>
  );
};

export default SetList;

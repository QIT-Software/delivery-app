import {Text, View, ViewProps} from 'react-native';
import styles from './DishModalItem.styles';
import React from 'react';
import Dish from 'entities/Dish';
import {useTranslation} from 'react-i18next';
import Image from '../../../../../client/src/components/image/Image';

interface SetItemProps extends ViewProps {
  setMenu: Dish;
}

const DishModalItem: React.FC<SetItemProps> = ({setMenu}) => {
  const {name, weight, kal, ingredients, imageId, description} = setMenu;
  const {t} = useTranslation('cuisinesList');
  return (
    <View>
      <View style={styles.titleModalContainer}>
        <Image source={{uri: imageId}} style={styles.dishImage} />
        <View>
          <Text style={styles.titleModal}>{name}</Text>
          <Text style={styles.caloriesModal}>
            {weight}g/{t('portion')}
          </Text>
          <Text style={styles.caloriesModal}>{kal}kal</Text>
        </View>
      </View>
      <View style={styles.descriptionModalContainer}>
        <Text style={styles.descriptionModal}>{description}</Text>
      </View>
      <View style={styles.ingredientsModalContainer}>
        <Text style={styles.ingredientsModalTitle}>{t('ingredients')}:</Text>
        <Text style={styles.ingredientsModal}>
          {ingredients.map((ingredient) => ingredient.name)}
        </Text>
      </View>
    </View>
  );
};

export default DishModalItem;

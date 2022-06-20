import {
  ViewProps,
  View,
  Text,
  Image,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './CuisineItem.styles';
import Cuisine from 'entities/Cuisine';
import {Like} from 'components/cuisineItem/assets';
import {useTranslation} from 'react-i18next';
import ImageBackground from '../../../../client/src/components/image/ImageBackground';

interface CuisineProps extends ViewProps {
  cuisine: Cuisine;
  blockStyle?: ViewStyle;
  onPress: () => void;
}

const CuisineItem: React.FC<CuisineProps> = ({cuisine, blockStyle, onPress}) => {
  const {t} = useTranslation('cuisinesList');

  const {nationality, rating} = cuisine;

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{uri: cuisine.image}}
        style={
          Dimensions.get('window').width >= 300
            ? {
                ...styles.cuisineItemContainer,
                ...blockStyle,
                ...styles.containerWidthDefault,
              }
            : {
                ...styles.cuisineItemContainer,
                ...blockStyle,
                ...styles.containerWidthFull,
              }
        }
        imageStyle={styles.bg}
      >
        <Text style={{...styles.text, ...styles.nationality}}>{nationality}</Text>
        <View style={styles.fields}>
          <View style={styles.field}>
            <Text style={{...styles.text, ...styles.count}}>12 {t('places')}</Text>
          </View>
          <View style={styles.field}>
            <Image source={Like} />
            <Text style={{...styles.text, ...styles.rating}}>{rating}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CuisineItem;

import {ViewProps, View, Text} from 'react-native';
import React from 'react';
import styles from 'client/src/components/favoriteSet/FavoriteSet.styles';
import Set from 'entities/Set';
import ImageBackground from 'client/src/components/image/ImageBackground';

interface SetItemProps extends ViewProps {
  set: Set;
}

const FavoriteSet: React.FC<SetItemProps> = ({set}) => {
  return (
    <View>
      <ImageBackground
        style={styles.container}
        imageStyle={styles.image}
        source={{uri: set.imageId}}
      >
        <Text style={styles.title}> {set.name}</Text>
      </ImageBackground>
    </View>
  );
};

export default FavoriteSet;

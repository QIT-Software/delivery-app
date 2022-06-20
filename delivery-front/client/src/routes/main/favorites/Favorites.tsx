import React, {useEffect} from 'react';
import styles from './Favorites.styles';
import {Image, Text, TouchableOpacity, View, FlatList} from 'react-native';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {useFavoritesSetsActions, useRouterActions} from 'state/client/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {RequireLoadable} from 'components';
import FavoriteSet from 'client/src/components/favoriteSet/FavoriteSet';
import Basket from 'client/src/components/Basket/Basket';

const Favorites: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useFavoritesSetsActions();

  const sets = useSelector((state: State) => state.favoriteSets);

  useEffect(() => {
    actions.fetchFavoriteSets();
  }, []);

  return (
    <View style={styles.favoritesContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Favorites</Text>
        </View>
      </View>
      <View style={styles.favoritesSetsContainer}>
        <Text style={styles.favoritesSetsTitle}>Top likes</Text>
        <RequireLoadable data={sets}>
          {({favoriteSets}) => (
            <FlatList
              horizontal
              contentContainerStyle={styles.slider}
              data={favoriteSets}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              renderItem={({item}) => (
                <>{item.isFavorite && <FavoriteSet set={item} />}</>
              )}
            />
          )}
        </RequireLoadable>
      </View>
      <View style={styles.favoritesSetsContainer}>
        <Text style={styles.favoritesSetsTitle}>Your favorite sets</Text>
        <RequireLoadable data={sets}>
          {({favoriteSets}) => (
            <FlatList
              horizontal
              contentContainerStyle={styles.slider}
              data={favoriteSets}
              numColumns={1}
              renderItem={({item}) => (
                <>{!item.isFavorite && <FavoriteSet set={item} />}</>
              )}
            />
          )}
        </RequireLoadable>
      </View>
      <Basket style={styles.basketItem} />
    </View>
  );
};

export default Favorites;

import styles from './SetDishes.styles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ModalClose} from 'components/cartItem/assets';
import DishModalItem from '../../../../components/SetItem/DishModalItem/DishModalItem';
import React, {useEffect} from 'react';
import {useRouterActions, useChooseSetActions} from 'state/client/hooks/UseActions';
import {useParams} from 'react-router';
import {RequireLoadable} from 'components';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import ImageBackground from '../../../../components/image/ImageBackground';

const SetDishes: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useChooseSetActions();

  const {id} = useParams();

  useEffect(() => {
    actions.fetchSet(id);
  }, []);

  const {set} = useSelector((state: State) => state);

  return (
    <RequireLoadable data={set}>
      {({set}) => {
        return (
          <View style={styles.ModalOuter}>
            <View style={styles.modalContainer}>
              <ImageBackground
                source={{uri: set.imageId}}
                imageStyle={styles.imageModal}
                style={styles.imageModalContainer}
              >
                <Text style={styles.name}>{set.name}</Text>
              </ImageBackground>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => routerActions.goBack()}
              >
                <Image source={ModalClose} style={styles.image} />
              </TouchableOpacity>
              <FlatList
                data={set.dishes}
                numColumns={1}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DishModalItem setMenu={item} />}
              />
            </View>
          </View>
        );
      }}
    </RequireLoadable>
  );
};

export default SetDishes;

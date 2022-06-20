import {ViewProps, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './CartItem.styles';
import {PlusSet, MinusSet, ModalClose} from './assets';
// import Set from 'entities/Set';
import Cart from 'state/entities/SelectedSetsInfo';
import ImageBackground from '../../../../client/src/components/image/ImageBackground';
import {useSaveInfoActions} from 'state/client/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import SelectedSetInfo from 'entities/SelectedSetsInfo';

interface SetItemProps extends ViewProps {
  cart: Cart;
}

const CartItem: React.FC<SetItemProps> = ({cart}) => {
  const {priceCents} = cart.set;
  let setPrice: number = (+priceCents / 100) * cart.quantity;
  setPrice = +setPrice.toFixed(2);
  const weight: number = cart.set.dishes.reduce((acc, item) => {
    return acc + +item.weight * cart.quantity;
  }, 0);
  const kal: number = cart.set.dishes.reduce((acc, item) => {
    return acc + +item.kal * cart.quantity;
  }, 0);

  const saveInfoActions = useSaveInfoActions();
  const {info} = useSelector((state: State) => state);

  const newSelectedSetsInfo = info.selectedSetsInfo;

  const deleteSets = (id: string) => {
    saveInfoActions.saveSelectedSetInfo(
      newSelectedSetsInfo.filter((item: Cart) => item.set.id !== id),
    );
  };

  const changeSelectedSetCount = (change: 'increase' | 'reduce') => {
    const info = newSelectedSetsInfo.map((item: SelectedSetInfo) => {
      if (item.set.id === cart.set.id) {
        if (change === 'reduce' && item.quantity > 1) {
          return {...item, quantity: item.quantity - 1};
        }
        if (change === 'increase') {
          return {...item, quantity: item.quantity + 1};
        }
      }
      return item;
    });

    saveInfoActions.saveSelectedSetInfo(info);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: cart.set.imageId}}
        style={styles.cartContainer}
        imageStyle={styles.bg}
      >
        <View style={styles.topContainer}>
          <Text style={styles.name}>{cart.set.name}</Text>
          <TouchableOpacity onPress={() => deleteSets(cart.set.id)}>
            <Image source={ModalClose} style={styles.quantityItem} />
          </TouchableOpacity>
        </View>
        <Text style={styles.calories}>
          {weight}g/{kal}kal
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => changeSelectedSetCount('reduce')}>
              <Image source={MinusSet} style={styles.quantityItem} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{cart.quantity}</Text>
            <TouchableOpacity onPress={() => changeSelectedSetCount('increase')}>
              <Image source={PlusSet} style={styles.quantityItem} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.price}>
              {setPrice} <Text style={styles.priceCur}>aed</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CartItem;

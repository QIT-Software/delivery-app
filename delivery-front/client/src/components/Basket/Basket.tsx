import React from 'react';
import {Image, Text, TouchableOpacity, View, ViewProps, ViewStyle} from 'react-native';
import styles from './Basket.styles';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {useRouterActions} from '../../state/hooks/UseActions';
import {Cart, CartEmpty} from 'routes/main/assets';

interface StyleProps extends ViewProps {
  style?: ViewStyle;
}

const Basket: React.FC<StyleProps> = ({style}) => {
  const {info} = useSelector((state: State) => state);

  const setQuantity = info.selectedSetsInfo.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const routerActions = useRouterActions();

  return (
    <>
      {setQuantity === 0 ? (
        <View style={style}>
          <TouchableOpacity
            style={styles.basket}
            onPress={() => routerActions.navigateToCart()}
          >
            <Image style={styles.img} source={Cart} />
          </TouchableOpacity>
          {/* <View style={styles.basketQuantity}> */}
          {/*  <Text style={styles.basketQuantityValue}>{setQuantity}</Text> */}
          {/* </View> */}
        </View>
      ) : (
        <View style={style}>
          <TouchableOpacity
            style={styles.basketActive}
            onPress={() => routerActions.navigateToCart()}
          >
            <Image style={styles.img} source={CartEmpty} />
            <View style={styles.basketQuantity}>
              <Text style={styles.basketQuantityValueActive}>{setQuantity}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Basket;

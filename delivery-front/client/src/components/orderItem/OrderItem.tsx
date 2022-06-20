import {ViewProps, View, Text} from 'react-native';
import React from 'react';
import styles from './OrderItem.styles';
import Cart from 'state/entities/SelectedSetsInfo';

interface SetItemProps extends ViewProps {
  cart: Cart;
  isPrice?: boolean;
}

const OrderItem: React.FC<SetItemProps> = ({cart, isPrice = false}) => {
  const {priceCents} = cart.set;
  let setPrice: number = +priceCents * cart.quantity;
  setPrice = +setPrice.toFixed(2);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          {cart.quantity} X {cart.set.name}
        </Text>
      </View>
      {isPrice && <Text style={styles.text}>{setPrice / 100} aed</Text>}
    </View>
  );
};

export default OrderItem;

import React from 'react';
import {Text, View} from 'react-native';
import styles from './OrderPrice.styles';

interface OrderPriceProps {
  title: string;
  price: string;
}

const OrderPrice: React.FC<OrderPriceProps> = ({title, price}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

export default OrderPrice;

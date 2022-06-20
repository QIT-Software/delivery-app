import {ViewProps, View, Text} from 'react-native';
import React from 'react';
import styles from 'client/src/components/userOrderItem/UserOrderItem.styles';
import ImageBackground from '../../../../client/src/components/image/ImageBackground';
import {UniqueOrder} from 'routes/settings/userOrders/UserOrders';

interface UserOrderItemProps extends ViewProps {
  order: UniqueOrder;
}

const UserOrderItem: React.FC<UserOrderItemProps> = ({order}) => {
  const weight = order.order.set.dishes.reduce((acc, item) => {
    return acc + +item.weight;
  }, 0);
  const kal = order.order.set.dishes.reduce((acc, item) => {
    return acc + +item.kal;
  }, 0);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: order.order.set.imageId}}
        style={styles.cartContainer}
        imageStyle={styles.bg}
      >
        <View style={styles.topContainer}>
          <Text style={styles.name}>{order.order.set.name}</Text>
        </View>
        <Text style={styles.calories}>
          {weight}g / {kal}kal
        </Text>
        <View style={styles.bottomContainer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{order.quantity}</Text>
          </View>
          <View>
            <Text style={styles.price}>
              {((order.order.set.priceCents / 100) * order.quantity).toFixed(2)}
              <Text style={styles.priceCur}> aed</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserOrderItem;

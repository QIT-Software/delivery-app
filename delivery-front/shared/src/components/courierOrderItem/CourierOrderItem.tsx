import {ViewProps, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Order from 'entities/Order';
import styles from './CourierOrderItem.styles';
import {OrderDirection} from 'components/orderProgressItems/assets';

interface SetItemProps extends ViewProps {
  order: Order;
}

const CourierOrderItem: React.FC<SetItemProps> = ({order}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => {}} style={styles.touch}>
        <View style={styles.container}>
          <View style={styles.idContainer}>
            <Text style={styles.idInner}>#{order.id.substring(30, 36)}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={OrderDirection} />
          </View>
          <View style={styles.addressContainer}>
            <Text>{order.restaurant.address.description.substring(0, 16)}...</Text>
            <Text>{order.orderInfo.clientAddress.description.substring(0, 16)}...</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CourierOrderItem;

import {ViewProps, View, Text, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import Order from 'entities/Order';
import styles from './OrderItem.styles';
import {useTranslation} from 'react-i18next';

interface SetItemProps extends ViewProps {
  order: Order;
  blockStyle?: ViewStyle;
  onPress?: () => void;
}

const OrderItem: React.FC<SetItemProps> = ({order, blockStyle, onPress}) => {
  const {t} = useTranslation('order');
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...blockStyle, ...styles.container}}>
        <View style={styles.addressesContainer}>
          <View style={styles.field}>
            <Text style={styles.fieldName}>{t('pickUpFrom')}:</Text>
            <Text style={styles.fieldValue}>{order.restaurant.address.description}</Text>
          </View>
          <View>
            <Text style={styles.fieldName}>{t('deliveryTo')}:</Text>
            <Text style={styles.fieldValue}>
              {order.orderInfo.clientAddress.description}
            </Text>
            {order.orderInfo.clientAddress.entrance && (
              <Text style={styles.fieldValue}>
                - entrance {order.orderInfo.clientAddress.entrance}
              </Text>
            )}
            {order.orderInfo.clientAddress.floor && (
              <Text style={styles.fieldValue}>
                - floor {order.orderInfo.clientAddress.floor}
              </Text>
            )}
            {order.orderInfo.clientAddress.apartment && (
              <Text style={styles.fieldValue}>
                - apartment {order.orderInfo.clientAddress.apartment}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.fieldDistanceName}>{t('totalDistance')}</Text>
          <Text style={styles.fieldDistanceValue}>{order.orderInfo.distanceMiles}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;

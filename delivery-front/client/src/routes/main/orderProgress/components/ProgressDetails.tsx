import React from 'react';
import {Text, View, ViewProps} from 'react-native';
import {styles} from './ProgressDetails.styles';
import Order from 'entities/Order';
import {useTranslation} from 'react-i18next';
// import * as R from 'ramda';
//
// export interface ProgressDetailsItemModel {
//   id: string;
//   value?: string;
//   status?: string;
//   statusColor?: string;
// }

export interface ProgressDetailsProps extends ViewProps {
  items: Order[];
}

export interface UniqueOrder {
  orderName: string;
  status: string;
  quantity: number;
}

export const ProgressDetails: React.FC<ProgressDetailsProps> = ({
  style,
  items,
  ...otherProps
}) => {
  const uniqueOrders: UniqueOrder[] = [];

  const {t} = useTranslation('map');

  const uniqueOrderCreator = (name: string, status: string): UniqueOrder => ({
    orderName: name,
    status,
    quantity: 1,
  });

  items.forEach((order, index) => {
    if (!index) {
      uniqueOrders.push(uniqueOrderCreator(order.set.name, order.state));
    }
    let isAdded = false;
    uniqueOrders?.forEach((uOrder, index) => {
      if (uOrder.orderName === order.set.name && uOrder.status === order.state) {
        uniqueOrders[index].quantity += 1;
        isAdded = true;
      }
    });
    if (!isAdded) {
      uniqueOrders.push(uniqueOrderCreator(order.set.name, order.state));
    }
  });

  return (
    <View style={[style, styles.container]} {...otherProps}>
      <Text style={styles.title}>{t('orderDetailsStatus')}:</Text>
      {uniqueOrders.map((it) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemValue}>
            {it.quantity} x {it.orderName}
          </Text>
          <Text
            style={
              it.status === 'ReadyForDelivery' ? styles.itemState1 : styles.itemState2
            }
          >
            {it.status}
          </Text>
        </View>
      ))}
    </View>
  );
};
// (it.statusColor)
export default ProgressDetails;

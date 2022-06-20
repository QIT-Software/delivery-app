import React from 'react';
import {StyleProp, Text, View, ViewStyle} from 'react-native';
import styles from 'shared/src/components/orderSummary/OrderSummary.styles';
import Order from 'entities/Order';
import InfoContainer from '../infoContainer/InfoContainer';
import {useTranslation} from 'react-i18next';
import {isClient, isRestaurant} from 'app/Config';
import {
  formatBillStatus,
  formatOrderAddress,
  formatOrderDate,
  formatOrderDistance,
  formatOrderNumber,
  formatOrderPrice,
  formatOrderWeight,
} from 'utils/OrderUtils';

interface OrderSummaryProps {
  order: Order;
  style?: StyleProp<ViewStyle>;
  title?: string;
  courierNameVisible?: boolean;
  firstCourierNameVisible?: boolean;
  secondCourierNameVisible?: boolean;
  pricesVisible?: boolean;
  clientNameVisible?: boolean;
  clientAddressVisible?: boolean;
  restaurantAddressVisible?: boolean;
  totalWeightVisible?: boolean;
  distanceMilesVisible?: boolean;
  orderCreatedTimeVisible?: boolean;
  orderCompletedVisible?: boolean;
  // unlockCodeVisible?: boolean;
  deliveryToRestaurantVisible?: boolean;
  deliveryToClientVisible?: boolean;
  wasServiceVisible?: boolean;
  billStatus?: boolean;
  washingFinish?: boolean;
  detailsAlignment?: 'left' | 'right';
  // orderCommentVisible?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  style,
  title,
  pricesVisible,
  clientNameVisible = false,
  firstCourierNameVisible = false,
  clientAddressVisible = false,
  restaurantAddressVisible = false,
  totalWeightVisible = false,
  distanceMilesVisible = false,
  orderCreatedTimeVisible = false,
  orderCompletedVisible = false,
  // unlockCodeVisible = false,
  deliveryToRestaurantVisible = false,
  wasServiceVisible = false,
  billStatus = false,
  detailsAlignment = 'left',
  // orderCommentVisible = false,
}) => {
  const {t} = useTranslation('orderSummary');

  const infoContainerStyle = {...styles.infoContainer, ...styles.detailsAlignment};

  const renderLine = (title: string, value: string) => (
    <InfoContainer
      title={title}
      style={detailsAlignment === 'right' ? infoContainerStyle : styles.infoContainer}
      titleStyle={styles.infoContainerTitle}
    >
      <Text style={styles.dateText}>{value}</Text>
    </InfoContainer>
  );

  const renderCourierInfo = (name: string | undefined) => (
    <View style={styles.avatarContainer}>
      <View style={styles.courierInfoContainer}>
        <Text style={styles.courierTitle}>{t('orderCourier')}</Text>
        <Text style={styles.dateText}>{name}</Text>
      </View>
    </View>
  );

  return (
    <View style={style}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title || formatOrderNumber(order)}</Text>
      </View>
      {firstCourierNameVisible &&
        order.courier &&
        renderCourierInfo(order.courier?.user.name)}
      <View style={styles.orderInfoList}>
        {clientNameVisible &&
          renderLine(isClient() ? t('youName') : t('clientName'), order.client.name)}
        {clientAddressVisible &&
          renderLine(
            isClient() ? t('yourAddress') : t('clientAddress'),
            formatOrderAddress(order, 'client'),
          )}
        {!isRestaurant() &&
          restaurantAddressVisible &&
          renderLine(t('restaurantAddress'), formatOrderAddress(order, 'restaurant'))}
        {/* {renderLine( */}
        {/*  isClient() ? t('totalBags') : t('totalBags'), */}
        {/*  order.bags.length.toString(), */}
        {/* )} */}
        {totalWeightVisible &&
          renderLine(
            !order.orderInfo ? t('totalWeight') : t('weight'),
            formatOrderWeight(order, 'delivery'),
          )}
        {distanceMilesVisible &&
          renderLine(
            t('distanceMiles'),
            formatOrderDistance(order.orderInfo.distanceMiles),
          )}
        {orderCreatedTimeVisible &&
          renderLine(
            isClient() ? t('orderCreated') : t('orderTime'),
            formatOrderDate(order, 'created'),
          )}
        {orderCompletedVisible && renderLine(t('orderCompleted'), formatOrderDate(order))}
        {/* {unlockCodeVisible && renderLine(t('unlockCode'), order.unlockCode)} */}
        {deliveryToRestaurantVisible &&
          renderLine(t('deliveryRestaurant'), formatOrderDate(order))}
        {pricesVisible &&
          renderLine(t('totalPrice'), formatOrderPrice(order, 'delivery'))}
        {billStatus && renderLine(t('billStatus'), formatBillStatus('washing'))}
        {wasServiceVisible && renderLine(t('washService'), formatOrderDate(order))}
        {/* {orderCommentVisible && renderLine(t('comment'), order.comment)} */}
      </View>
    </View>
  );
};

export default OrderSummary;

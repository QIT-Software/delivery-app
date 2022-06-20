import React, {useEffect} from 'react';

import styles from './OrderDetails.styles';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import BackBtn from '../assets/BackBtn.png';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
import {RequireLoadable} from 'components';
import {useParams} from 'react-router';
import {
  useAlertActions,
  useCourierOrdersActions,
  useOrderDetailsActions,
  useRouterActions,
} from 'state/courier/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import {ID} from 'entities/Common';

const OrderDetails: React.FC = () => {
  const actions = useOrderDetailsActions();
  const routerActions = useRouterActions();
  const courierActions = useCourierOrdersActions();
  const alertActions = useAlertActions();

  const {id} = useParams();
  // const history = useHistory();

  const {t} = useTranslation('order');

  useEffect(() => {
    actions.fetchOrderDetails(id);
    courierActions.fetchCourierOrders();
  }, []);

  const state = useSelector((state: State) => state.courierOrdersList);

  const isMaxOrders = (id: ID) => {
    if (state.isSuccess) {
      if (state.courierOrdersList.length > 3) {
        alertActions.showMessage(
          'Max Orders',
          'You have accepted as many orders as possible. Please, deliver these orders first.',
        );
      }
      actions.accept(id);
    }
  };

  const {orderDetails} = useSelector((state: State) => state);
  const deliveryFee = 80.0;
  return (
    <View style={styles.gradient}>
      <View style={styles.orderDetailsContainer}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => routerActions.goBack()}>
            <Image source={BackBtn} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('ordersDetails')}</Text>
          </View>
        </View>
        <ScrollView>
          <RequireLoadable data={orderDetails}>
            {({orderDetails}) => {
              return (
                <View style={styles.orderDetailsContainer}>
                  <View style={{...styles.card, ...styles.orderDetails}}>
                    <View style={styles.titleContainerInner}>
                      <Text style={styles.orderId}>{t('order')} ID</Text>
                      <Text style={styles.orderIdValue}>{orderDetails.number}</Text>
                    </View>
                    <View style={styles.orderDetailsFields}>
                      <View style={styles.orderDetailsField}>
                        <Text style={styles.orderDetailsFieldName}>
                          {t('pickUpFrom')}:
                        </Text>
                        <Text style={styles.orderDetailsFieldValue}>
                          {orderDetails.restaurant.address.description}
                        </Text>
                      </View>
                      <View style={styles.orderDetailsField}>
                        <Text style={styles.orderDetailsFieldName}>
                          {t('deliveryTo')}:
                        </Text>

                        <Text style={styles.orderDetailsFieldValue}>
                          {orderDetails.orderInfo.clientAddress.description}
                        </Text>
                        {orderDetails.orderInfo.clientAddress.entrance && (
                          <Text style={styles.orderDetailsFieldValue}>
                            - entrance {orderDetails.orderInfo.clientAddress.entrance}
                          </Text>
                        )}
                        {orderDetails.orderInfo.clientAddress.floor && (
                          <Text style={styles.orderDetailsFieldValue}>
                            - floor {orderDetails.orderInfo.clientAddress.floor}
                          </Text>
                        )}
                        {orderDetails.orderInfo.clientAddress.apartment && (
                          <Text style={styles.orderDetailsFieldValue}>
                            - apartment {orderDetails.orderInfo.clientAddress.apartment}
                          </Text>
                        )}
                      </View>
                      <View style={styles.orderDetailsField}>
                        <Text style={styles.orderDetailsFieldName}>
                          {t('totalDistance')}:
                        </Text>
                        <Text style={styles.orderDetailsFieldValue}>
                          {orderDetails.orderInfo.distanceMiles} km
                        </Text>
                      </View>
                      <View style={styles.orderDetailsField}>
                        {/* <Text style={styles.orderDetailsFieldName}> */}
                        {/*  {t('totalWeight')}: */}
                        {/* </Text> */}
                        {/* <Text style={styles.orderDetailsFieldValue}> */}
                        {/*  {orderDetails.orderInfo.weight} kg */}
                        {/* </Text> */}
                      </View>
                    </View>
                    <View style={styles.titleContainerInner}>
                      <Text style={styles.orderList}>{t('orderList')}</Text>
                    </View>
                    <View style={styles.orderListContainer}>
                      <View style={{...styles.orderListItem, ...styles.setDescription}}>
                        <Text style={styles.orderListItemText}>
                          {orderDetails.set.name}
                        </Text>
                        <Text style={styles.orderListItemText}>
                          {orderDetails.set.priceCents / 100} aed
                        </Text>
                      </View>
                      <View style={styles.orderListItem}>
                        <Text style={styles.orderListItemText}>{t('deliveryFee')}</Text>
                        <Text style={styles.orderListItemText}>{deliveryFee} aed</Text>
                      </View>
                    </View>
                    <View style={styles.totalField}>
                      <Text style={styles.totalFieldName}>{t('total')}: </Text>
                      <Text style={styles.totalFieldValue}>
                        {deliveryFee + orderDetails.set.priceCents / 100} aed
                      </Text>
                    </View>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        isMaxOrders(orderDetails.id);
                        routerActions.goBack();
                      }}
                    >
                      <View style={{...styles.card, ...styles.button}}>
                        <Text style={styles.buttonText}>{t('accept')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </RequireLoadable>
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderDetails;

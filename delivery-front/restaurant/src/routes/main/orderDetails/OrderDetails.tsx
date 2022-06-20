import React, {useEffect} from 'react';

import styles from './OrderDetails.styles';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import BackBtn from '../assets/BackBtn.png';
import {useSelector} from 'react-redux';
import State from 'state/restaurant/entities/State';
import {RequireLoadable} from 'components';
import {useParams} from 'react-router';
import {
  useOrderDetailsActions,
  useRouterActions,
} from 'state/restaurant/hooks/UseActions';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

const OrderDetails: React.FC = () => {
  const actions = useOrderDetailsActions();
  const routerActions = useRouterActions();

  const {id} = useParams();
  // const history = useHistory();

  useEffect(() => {
    actions.fetchOrderDetails(id);
  }, []);

  const {t} = useTranslation('order');

  const {orderDetails} = useSelector((state: State) => state);

  return (
    <View style={styles.gradient}>
      <SafeAreaView>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => routerActions.goBack()}>
            <Image source={BackBtn} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('ordersDetails')}</Text>
          </View>
        </View>
        <RequireLoadable data={orderDetails}>
          {({orderDetails}) => {
            return (
              <View style={styles.orderDetailsContainer}>
                <View style={styles.setInfoContainer}>
                  <View style={styles.field}>
                    <Text style={styles.fieldName}>{t('order')} ID:</Text>
                    <Text style={styles.fieldValue}>
                      {orderDetails.id.substring(24, 36)}
                    </Text>
                  </View>
                  <View style={styles.fieldSet}>
                    <Text style={styles.fieldSetName}>{orderDetails.set.name}</Text>
                    <Text style={styles.fieldSetValue}>
                      {orderDetails.set.priceCents} aed
                    </Text>
                  </View>
                </View>
                {orderDetails.courier ? (
                  <View style={styles.courierContainer}>
                    <View style={styles.courierContainerInner}>
                      <Image
                        source={{uri: orderDetails.courier.user.image}}
                        style={styles.userPick}
                      />

                      <View style={styles.courierInfo}>
                        <Text style={styles.courierName}>
                          {orderDetails.courier.user.name}
                        </Text>
                        <Text style={styles.courierPhoneNumber}>
                          {orderDetails.courier.user.additionalInfo
                            ? orderDetails.courier.user.additionalInfo.phoneNumber
                            : 'ERROR USER ADDITIONAL INFO'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.btnContainer}
                      onPress={() => routerActions.navigateToScanner(orderDetails.id)}
                    >
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#FF8C29', '#FF2D55']}
                        style={styles.btn}
                      >
                        <Text style={styles.btnText}>{t('scan')}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.waitingCourier}>
                    <Text style={styles.waitingCourierValue}>
                      {t('waitingForCourierAccept')}...
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        </RequireLoadable>
      </SafeAreaView>
    </View>
  );
};

export default OrderDetails;

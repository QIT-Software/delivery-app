import React from 'react';
import {
  useAddressActions,
  useRouterActions,
  useCartActions,
} from 'state/client/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {State as Address} from 'state/entities/State';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Order.styles';
import BackBtn from 'routes/main/assets/BackBtn.png';
import OrderItem from '../../../components/orderItem/OrderItem';
import LinearGradient from 'react-native-linear-gradient';
import {Route} from 'react-router';
import OrderSuccess from 'routes/main/popUp/orderSuccess/OrderSuccess';
import {ArrowNext} from 'routes/main/assets';
import {useTranslation} from 'react-i18next';

const Order: React.FC = () => {
  const routerActions = useRouterActions();
  const addressActions = useAddressActions();
  const cartActions = useCartActions();

  const {t} = useTranslation('order');

  const {info} = useSelector((state: State) => state);
  let subTitle = info.selectedSetsInfo.reduce((acc, item) => {
    return acc + (+item.set.priceCents / 100) * item.quantity;
  }, 0);
  subTitle = +subTitle.toFixed(2);
  const setFee = 80;
  let total = setFee + subTitle;
  total = +total.toFixed(2);

  const {address} = useSelector((state: Address) => state);

  const description = address.location?.description;
  const entrance =
    address.location?.entrance && `, entrance ${address.location?.entrance}`;
  const floor = address.location?.floor && `, floor ${address.location?.floor}`;
  const apartment =
    address.location?.apartment && `, apartment ${address.location?.apartment}`;
  // const locationDelivery = `${description}${entrance}${floor}${apartment}`;

  return (
    <View style={styles.orderContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('order')}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.length}>
          <FlatList
            contentContainerStyle={styles.scroll}
            data={info.selectedSetsInfo}
            numColumns={1}
            renderItem={({item}) => <OrderItem cart={item} isPrice />}
          />
          <TouchableOpacity onPress={() => routerActions.navigateToMain()}>
            <Text style={styles.add}>
              <Text style={styles.plus}>+</Text> {t('addAnotherItem')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subTotalContainer}>
          <View style={styles.subTotal}>
            <Text style={styles.subTotalText}>{t('subtotal')}:</Text>
            <Text style={styles.subTotalText}>{subTitle} aed</Text>
          </View>
          <View style={styles.deliveryFee}>
            <Text style={styles.deliveryFeeText}>{t('deliveryFee')}:</Text>
            <Text style={styles.deliveryFeeText}>{setFee} aed</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{t('total')}:</Text>
          <Text style={styles.totalText}>{total} aed</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTextMain}>{t('deliveryAddress')}:</Text>
          <View style={styles.bottomContainerInner}>
            <Text style={styles.innerText}>
              {/* {description} {entrance} {floor} {apartment} */}
              {description}
              {address.location?.entrance && entrance}
              {address.location?.floor && floor}
              {address.location?.apartment && apartment}
            </Text>

            <TouchableOpacity
              onPress={() => routerActions.navigateToAddress()}
              style={styles.changeContainer}
            >
              <Text style={styles.innerChange}>{t('change')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomTextMain}>{t('payment')}:</Text>
          <View style={styles.bottomContainerInner}>
            <Text style={styles.innerText}>**** **** **** 9800</Text>
            <TouchableOpacity>
              <Text style={styles.innerChange}>{t('change')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF8C29', '#FF2D55']}
        style={styles.btn}
      >
        <TouchableOpacity
          onPress={() => {
            // history.push('/orderProgress/27')
            if (address.location) {
              addressActions.createAddress(address.location);
              cartActions.submitCartInfo({
                clientAddress: address.location,
                selectedSetsInfo: info.selectedSetsInfo,
              });
            }
          }}
        >
          <Image source={ArrowNext} />
        </TouchableOpacity>
      </LinearGradient>
      <Route path="/main/order/orderSuccess">
        <Modal animationType="fade" transparent>
          <OrderSuccess />
        </Modal>
      </Route>
    </View>
  );
};

export default Order;

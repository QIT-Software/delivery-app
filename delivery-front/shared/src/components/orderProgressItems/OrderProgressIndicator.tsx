import React from 'react';
import styles from './OrderProgressIndicator.styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CenterMe} from './assets';
import {isClient, isCourier} from 'app/Config';
import {RequireLoadable} from 'components';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {useCartActions, useCartOrdersActions} from 'state/client/hooks/UseActions';
import Address from 'entities/Address';
import {useTranslation} from 'react-i18next';

interface OrderProgressIndicatorProps {
  statusText?: string;
  addressTo?: Address;
  addressFrom?: string;
  centerMePress?: () => void;
}

const OrderProgressIndicator: React.FC<OrderProgressIndicatorProps> = ({
  statusText,
  addressTo,
  addressFrom,
  centerMePress,
}) => {
  const cart = isClient() && useSelector((state: State) => state.newCart.cart);
  const actions = useCartActions();
  const actionsO = useCartOrdersActions();
  const {t} = useTranslation('order');

  return (
    <>
      {isClient() && (
        <View style={styles.clientContainer}>
          <Text style={styles.statusText}>{statusText}</Text>
          {cart && (
            <RequireLoadable data={cart}>
              {({id}) => (
                <TouchableOpacity
                  style={styles.centerMeButtonContainer}
                  activeOpacity={0.2}
                  onPress={() => {
                    // routerActions.navigateToOrderProgress()

                    // history.push('/orderProgress/2bf4b89a-e120-4043-9456-9dab07df3bef');
                    actions.cart(id);
                    actionsO.fetchOrdersByCartId(id);
                  }}
                >
                  <Image source={CenterMe} />
                </TouchableOpacity>
              )}
            </RequireLoadable>
          )}
        </View>
      )}
      {isCourier() && (
        <View style={styles.courierContainer}>
          <View>
            <View style={styles.field}>
              <Text style={styles.fieldName}>{t('pickUpFrom')}:</Text>
              <Text style={styles.fieldValue}>{addressFrom}</Text>
            </View>
            <View>
              <Text style={styles.fieldName}>{t('deliveryTo')}:</Text>
              <View>
                <Text style={styles.fieldValue}>{addressTo?.description}</Text>
                {addressTo?.entrance && (
                  <Text style={styles.fieldValue}>
                    , {t('entrance')} {addressTo?.entrance}
                  </Text>
                )}
                {addressTo?.floor && (
                  <Text style={styles.fieldValue}>
                    , {t('floor')} {addressTo?.floor}
                  </Text>
                )}
                {addressTo?.apartment && (
                  <Text style={styles.fieldValue}>
                    , {t('apartment')} {addressTo?.apartment}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={centerMePress}>
            <Image source={CenterMe} style={styles.navigationArrow} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default OrderProgressIndicator;

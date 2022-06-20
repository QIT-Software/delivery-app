import {ViewProps, View, Text, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import Order from 'entities/Order';
import styles from './OrderItem.styles';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

interface SetItemProps extends ViewProps {
  order: Order;
  blockStyle?: ViewStyle;
  onPress?: () => void;
}

const OrderItem: React.FC<SetItemProps> = ({order, blockStyle, onPress}) => {
  const {t} = useTranslation('order');

  return (
    <View style={{...blockStyle, ...styles.container}}>
      <View style={styles.setInfoContainer}>
        <View style={styles.field}>
          <Text style={styles.fieldName}>{t('order')} ID:</Text>
          <Text style={styles.fieldValue}>{order.id.substring(24, 36)}</Text>
        </View>
        <View style={styles.fieldSet}>
          <Text style={styles.fieldSetName}>{order.set.name}</Text>
          <Text style={styles.fieldSetValue}>{order.set.priceCents} aed</Text>
        </View>
      </View>
      <View style={styles.orderStatus}>
        <Text style={styles.orderStatusValue}>{t('waitingForCourier')}</Text>
      </View>
      <View style={styles.btnContainer}>
        {/* <TouchableOpacity style={styles.btn}> */}
        {/*  <Text style={styles.decline}>{t('decline')}</Text> */}
        {/* </TouchableOpacity> */}
        <TouchableOpacity onPress={onPress}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8C29', '#FF2D55']}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{t('orderInfo')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderItem;

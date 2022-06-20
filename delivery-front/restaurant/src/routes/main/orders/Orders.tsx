import React, {useEffect} from 'react';
import styles from './Orders.styles';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import OrderItem from '../../../components/order/OrderItem';
import {
  useAuthActions,
  useOrdersActions,
  useRestaurantActions,
} from 'state/restaurant/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
// import {RequireLoadable} from 'components';
// import {useGuard} from 'state/hooks/UseGuard';

const Orders: React.FC = () => {
  const actions = useOrdersActions();
  const restaurantActions = useRestaurantActions();
  const authActions = useAuthActions();
  const history = useHistory();

  useEffect(() => {
    actions.fetchOrders();
    authActions.fetchSession({history});
    restaurantActions.fetchCurrentRestaurant();
  }, []);

  const state = useSelector((state: State) => state.ordersList);
  const {t} = useTranslation('order');

  return (
    <View style={styles.gradient}>
      <SafeAreaView style={styles.ordersContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('orders')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.scroll}
          data={state.isSuccess ? state.ordersList : []}
          refreshing={state.isLoading}
          onRefresh={() => actions.fetchOrders()}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <OrderItem
              order={item}
              blockStyle={styles.blockStyle}
              onPress={() => actions.orderDetails(item.id)}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default Orders;

import React, {useEffect} from 'react';
import styles from './CurrentOrders.styles';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import OrderItem from '../../../components/order/OrderItem';
import {useCourierOrdersActions} from 'state/courier/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
// import {RequireLoadable} from 'components';
// import {useGuard} from 'state/hooks/UseGuard';

const CurrentOrders: React.FC = () => {
  const actions = useCourierOrdersActions();
  // const routerActions = useRouterActions();
  useEffect(() => {
    actions.fetchCourierOrders();
  }, []);

  const state = useSelector((state: State) => state.courierOrdersList);

  return (
    <View style={styles.gradient}>
      <SafeAreaView style={styles.ordersContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Current Orders</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.scroll}
          data={state.isSuccess ? state.courierOrdersList : []}
          refreshing={state.isLoading}
          onRefresh={() => actions.fetchCourierOrders()}
          numColumns={1}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <OrderItem order={item} blockStyle={styles.blockStyle} />
          )}
        />
        {/* <TouchableOpacity */}
        {/*  style={styles.buttonContainer} */}
        {/*  onPress={() => routerActions.navigateToMain()} */}
        {/* > */}
        {/*  <View style={{...styles.card, ...styles.button}}> */}
        {/*    <Text style={styles.buttonText}>Go to map</Text> */}
        {/*  </View> */}
        {/* </TouchableOpacity> */}
      </SafeAreaView>
    </View>
  );
};

export default CurrentOrders;

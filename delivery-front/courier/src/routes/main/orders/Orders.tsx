import React, {useEffect} from 'react';
import styles from './Orders.styles';
import {FlatList, Text, View} from 'react-native';
import OrderItem from '../../../components/order/OrderItem';
import {
  useAlertActions,
  useAuthActions,
  useDocumentsActions,
  useOrdersActions,
} from 'state/courier/hooks/UseActions';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';

const Orders: React.FC = () => {
  const actions = useOrdersActions();
  const authActions = useAuthActions();
  const documentActions = useDocumentsActions();
  const alertActions = useAlertActions();
  const history = useHistory();

  const {revision} = useSelector((state: State) => state.documents);

  const isApproved = () => {
    if (revision?.status === 'Approved') {
      actions.fetchOrders();
    } else {
      alertActions.showMessage(
        'Document Approve',
        'You didnt approved your Employment Agreement. Please approve it first.',
      );
    }
  };

  useEffect(() => {
    documentActions.fetchDocuments();
    isApproved();
    authActions.fetchSession({history});
  }, [revision?.status]);

  const {t} = useTranslation('order');

  const state = useSelector((state: State) => state.ordersList);

  return (
    <View style={styles.ordersContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('orders')}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.scroll}
        data={state.isSuccess ? state.ordersList : []}
        refreshing={state.isLoading}
        onRefresh={() => isApproved()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <OrderItem
            order={item}
            blockStyle={styles.blockStyle}
            onPress={() => actions.orderDetails(item.id)}
          />
        )}
      />
    </View>
  );
};

export default Orders;

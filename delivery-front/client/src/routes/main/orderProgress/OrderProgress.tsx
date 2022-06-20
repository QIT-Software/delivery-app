import React, {useEffect} from 'react';
import {Card, OrderProgressIndicator, RequireLoadable} from 'components';
import OrderProgressMap from 'components/orderProgressItems/OrderProgressMap';
import OrderProgressLayout from 'components/orderProgressItems/OrderProgressLayout';
import OrderProgressLayoutState from 'components/orderProgressItems/OrderProgressLayoutState';
// import {useOrderProgressActions} from 'state/hooks/UseActions';
import {useParams} from 'react-router';
import {Text, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {QrCodeIcon} from 'routes/main/orderProgress/assets';
import ProgressDetails from 'routes/main/orderProgress/components/ProgressDetails'; // ProgressDetailsItemModel,
import {styles} from './OrderProgress.styles';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {useCartOrdersActions} from 'state/client/hooks/UseActions';
import {useTranslation} from 'react-i18next';
// import {useOrderProgressActions} from 'state/hooks/UseActions';

const OrderProgress: React.FC = () => {
  const {id} = useParams<{id: string}>();
  // const {card} = useSelector((state: State) => state.newCart);
  const actions = useCartOrdersActions();

  const {t} = useTranslation('map');

  useEffect(() => {
    actions.fetchOrdersByCartId(id);
  }, [id]);
  const {courierLocation} = useSelector((state: State) => state.orderProgress);

  const orders = useSelector((state: State) => state);

  // if (order.isSuccess) {
  //   console.log(order.orderInfo.clientAddress.description);
  // }

  const orderProgressMap = () => {
    return (
      <RequireLoadable data={orders.cartOrders}>
        {({cartOrders}) => (
          <OrderProgressMap courierLocation={courierLocation} items={cartOrders} />
        )}
      </RequireLoadable>
    );
  };

  // const items: ProgressDetailsItemModel[] = [
  //   {
  //     id: '0',
  //     value: '3 x Korean dream',
  //     status: 'Delivering',
  //     statusColor: '#EE5B30',
  //   },
  //   {
  //     id: '1',
  //     value: '2 x Jong-un on the beach',
  //     status: 'Complete',
  //     statusColor: '#1ABB00',
  //   },
  //   {
  //     id: '2',
  //     value: '3 x Good morning USA',
  //     status: 'Order to prepare',
  //     statusColor: '#1BADF8',
  //   },
  // ];

  const renderExpandedProgressDetails = () => (
    <RequireLoadable data={orders.cartOrders}>
      {({cartOrders}) => <ProgressDetails items={cartOrders} />}
    </RequireLoadable>
  );

  const renderBottomElements = () => (
    <>
      <View style={styles.bottomPanelContainer}>
        <Card style={styles.statusCard}>
          <View style={styles.statusCardContainer}>
            <Text style={styles.statusCardValue}>{t('orderStatus')}</Text>
            <Text style={styles.statusCardStatus}>{t('delivering')}</Text>
          </View>
        </Card>
        {/* <Card style={styles.qrCodeCard}> */}
        {/*  <LinearGradient */}
        {/*    start={{x: 0, y: 0}} */}
        {/*    end={{x: 1, y: 0}} */}
        {/*    colors={['#FF8C29', '#FF2D55']} */}
        {/*    style={styles.qrCodeGradient} */}
        {/*  > */}
        {/*    <Image source={QrCodeIcon} /> */}
        {/*  </LinearGradient> */}
        {/* </Card> */}
      </View>
    </>
  );

  // const description = address.location?.description;
  // const entrance =
  //     address.location?.entrance && `, entrance ${address.location?.entrance}`;
  // const floor = address.location?.floor && `, floor ${address.location?.floor}`;
  // const apartment =
  //     address.location?.apartment && `, apartment ${address.location?.apartment}`;
  // const locationDelivery = `${description}${entrance}${floor}${apartment}`;

  const renderStubState = (): OrderProgressLayoutState => ({
    title: 'Test',
    background: orderProgressMap(),
    progress: (
      <RequireLoadable data={orders.cartOrders}>
        {({cartOrders}) => (
          <>
            <OrderProgressIndicator
              statusText={`${cartOrders[0].orderInfo.clientAddress.description}`}
            />
          </>
        )}
      </RequireLoadable>
    ),
    progressExpandedDetails: renderExpandedProgressDetails(),
    bottomElements: renderBottomElements(),
  });

  const renderEmptyState = (): OrderProgressLayoutState => ({
    title: 'Loading',
    background: (
      <RequireLoadable data={orders.cartOrders}>
        {({cartOrders}) => <OrderProgressMap items={cartOrders} />}
      </RequireLoadable>
    ),
  });

  const getState = (): OrderProgressLayoutState => {
    if (!orders.cartOrders.isSuccess) return renderEmptyState();
    return renderStubState();
  };

  return <OrderProgressLayout>{getState()}</OrderProgressLayout>;
};

export default OrderProgress;

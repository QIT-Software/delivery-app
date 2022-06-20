import React, {useEffect} from 'react';
import styles from './Main.styles';
import {View} from 'react-native';
import {Redirect, Route} from 'react-router';
import Orders from 'routes/main/orders/Orders';
import TransitionBar from 'shared/src/components/transitionBar/TransitionBar';
import {Favorites, Home, Map} from './assets/index';
import {
  useAlertActions,
  useCourierOrdersActions,
  useRouterActions,
} from 'state/courier/hooks/UseActions';
import OrderDetails from 'routes/main/orderDetails/OrderDetails';
import {useGuard} from 'state/hooks/UseGuard';
import CurrentOrders from 'routes/main/currentOrders/CurrentOrders';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import State from 'state/courier/entities/State';

// import Scanner from 'routes/main/scanner/Scanner';

const Main: React.FC = () => {
  const routerActions = useRouterActions();
  const alertActions = useAlertActions();
  const actions = useCourierOrdersActions();

  useGuard({requireAuthenticated: true});

  const state = useSelector((state: State) => state.courierOrdersList);

  // const routerActions = useRouterActions();
  useEffect(() => {
    actions.fetchCourierOrders();
  }, []);

  const {t} = useTranslation('transitionBar');

  const isOrder = () => {
    if (state.isSuccess) {
      if (state.courierOrdersList.length > 0) {
        routerActions.navigateToOrderProgress();
      } else {
        alertActions.showMessage(
          'No Orders Accepted',
          'You didnt accept any of the orders. Please accept one before going to map.',
        );
      }
    } else {
      alertActions.showMessage(
        'No Orders Accepted',
        'You didnt accept any of the orders. Please accept one before going to map.',
      );
    }
  };

  const MenuComponents = [
    {
      status: false,
      title: t('main'),
      emptyImage: Home,
      activeImage: Home,
      navigateAction: () => routerActions.navigateToMain(),
    },
    {
      status: true,
      title: t('map'),
      emptyImage: Map,
      activeImage: Map,
      navigateAction: () => isOrder(),
    },
    {
      status: false,
      title: t('profile'),
      emptyImage: Favorites,
      activeImage: Favorites,
      navigateAction: () => routerActions.navigateToProfile(),
    },
  ];

  return (
    <View style={styles.container}>
      <Route exact path="/main">
        <Redirect to="/main/orders" />
      </Route>

      <Route exact path="/main/orders" component={Orders} />

      {/* <Route exact path="/main/order/:id/courierScanner" component={Scanner} /> */}

      <Route exact path="/main/order/:id" component={OrderDetails} />

      <Route exact path="/main/currentOrders" component={CurrentOrders} />

      <TransitionBar components={MenuComponents} />
    </View>
  );
};

export default Main;

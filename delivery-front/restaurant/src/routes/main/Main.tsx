import React from 'react';
import styles from './Main.styles';
import {View} from 'react-native';
import {Redirect, Route} from 'react-router';
import Orders from './orders/Orders';
import TransitionBar from 'shared/src/components/transitionBar/TransitionBar';
import {Favorites, Orders as OrdersIcon} from './assets';
import {useRouterActions} from 'state/restaurant/hooks/UseActions';
import OrderDetails from './orderDetails/OrderDetails';
import CurrentOrders from 'routes/main/currentOrders/CurrentOrders';
import {useGuard} from 'state/hooks/UseGuard';
import Scanner from 'routes/main/scanner/Scanner';

const Main: React.FC = () => {
  const routerActions = useRouterActions();
  useGuard({requireAuthenticated: true});

  const MenuComponents = [
    {
      status: false,
      title: 'Orders',
      emptyImage: OrdersIcon,
      activeImage: OrdersIcon,
      navigateAction: () => routerActions.navigateToMain(),
    },
    {
      status: false,
      title: 'Profile',
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

      <Route exact path="/main/order/:id/courierScanner" component={Scanner} />

      <Route exact path="/main/order/:id" component={OrderDetails} />

      <Route exact path="/main/currentOrders" component={CurrentOrders} />

      <TransitionBar components={MenuComponents} />
    </View>
  );
};

export default Main;

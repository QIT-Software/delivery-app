import React, {useEffect} from 'react';
import styles from './Main.styles';
import {View} from 'react-native';
import {Route, Redirect} from 'react-router';
import CuisineList from 'routes/main/cuisineList/CuisineList';
import Sets from 'routes/main/sets/Sets';
import TransitionBar from 'shared/src/components/transitionBar/TransitionBar';
import {ActiveMain, Profile} from 'routes/main/assets';
import {useRouterActions} from 'state/client/hooks/UseActions';
import Cart from 'routes/main/cart/Cart';
import Address from 'routes/main/address/Address';
import Order from 'routes/main/order/Order';
import OrderComplete from 'routes/main/orderComplete/OrderComplete';
import {useGuard} from 'state/hooks/UseGuard';
// import OrderProgress from 'routes/main/orderProgress/OrderProgress';
import AdditionalAddressInfo from 'routes/main/address/AdditionalAddressInfo/AdditionalAddressInfo';
import {useTranslation} from 'react-i18next';
import Favorites from 'routes/main/favorites/Favorites';
// import {Switch} from "react-router-native";
// import Welcome from 'routes/main/popUp/welcome/Welcome';

const Main: React.FC = () => {
  const routerActions = useRouterActions();
  // const history = useHistory();

  // const history = useHistory();
  const {authenticated} = useGuard({});
  useEffect(() => {}, [authenticated]);
  const {t} = useTranslation('transitionBar');

  const MenuComponents = [
    {
      id: 1,
      status: true,
      title: t('main'),
      emptyImage: ActiveMain,
      activeImage: ActiveMain,
      navigateAction: () => routerActions.navigateToMain(),
    },
    // {
    //   id: 2,
    //   status: false,
    //   title: 'Orders',
    //   emptyImage: Orders,
    //   activeImage: Orders,
    //   navigateAction: () => routerActions.navigateToCart(),
    // },
    // {
    //   id: 3,
    //   status: false,
    //   title: 'Favorites',
    //   emptyImage: Favorites,
    //   activeImage: Favorites,
    //   navigateAction: () =>
    //     history.push('/orderProgress/d2ba5e5f-5182-4478-ba8e-5feca98abd6b'),
    // },
    {
      id: 4,
      status: false,
      title: t('profile'),
      emptyImage: Profile,
      activeImage: Profile,
      navigateAction: () =>
        authenticated
          ? routerActions.navigateToSettings()
          : routerActions.navigateToAuth(),
    },
  ];

  return (
    <View style={styles.container}>
      <Route exact path="/main">
        <Redirect to="/main/cuisineList" />
      </Route>

      <Route path="/main/cuisineList" component={CuisineList} />

      <Route exact path="/main/cuisine/:id" component={Sets} />

      <Route exact path="/main/set/:id" component={Sets} />

      <Route exact path="/main/cart" component={Cart} />

      <Route exact path="/main/cart/cartAuth" component={Cart} />

      <Route exact path="/main/address" component={Address} />

      <Route exact path="/main/additionalAddressInfo" component={AdditionalAddressInfo} />

      <Route exact path="/main/order" component={Order} />

      <Route exact path="/main/order/orderSuccess" component={Order} />

      {/* <Route exact path="/main/orderProgress/:id" component={OrderProgress} /> */}

      <Route exact path="/main/orderComplete" component={OrderComplete} />

      <Route exact path="/main/favorites" component={Favorites} />

      <TransitionBar components={authenticated ? MenuComponents : MenuComponents} />
    </View>
  );
};

export default Main;

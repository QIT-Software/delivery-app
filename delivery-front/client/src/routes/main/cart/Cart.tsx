import React from 'react';

import styles from './Cart.styles';
import {FlatList, Text, View, TouchableOpacity, Image, Modal} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {
  useRouterActions as mainActions,
  useRouterActions,
} from 'state/client/hooks/UseActions';
import CartItem from 'components/cartItem/CartItem';

import {Redirect, Route} from 'react-router';
import CartAuth from 'routes/main/popUp/cartAuth/CartAuth';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {useGuard} from 'state/hooks/UseGuard';
import {ArrowNext} from 'routes/main/assets';
import {useTranslation} from 'react-i18next';

const Cart: React.FC = () => {
  const routerActions = useRouterActions();
  const routerActionsMain = mainActions();
  const {info} = useSelector((state: State) => state);
  const {t} = useTranslation('cart');

  const {authenticated} = useGuard({});

  return (
    <View style={styles.cartContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('cart')}</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.scroll}
        data={info.selectedSetsInfo}
        numColumns={1}
        renderItem={({item}) => <CartItem cart={item} />}
      />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF8C29', '#FF2D55']}
        style={styles.btn}
      >
        <TouchableOpacity
          onPress={() =>
            authenticated
              ? routerActionsMain.navigateToAddress()
              : routerActions.navigateToCartAuthPopUp()
          }
        >
          <Image source={ArrowNext} />
        </TouchableOpacity>
      </LinearGradient>

      <Route path="/main/cart/cartAuth">
        {authenticated ? (
          <Redirect to="/main/address" />
        ) : (
          <Modal animationType="fade" transparent>
            <CartAuth />
          </Modal>
        )}
      </Route>
    </View>
  );
};

export default Cart;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './OrderSuccess.styles';
import LinearGradient from 'react-native-linear-gradient';
// import {useHistory} from 'react-router';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {useCartActions} from 'state/client/hooks/UseActions';
import {RequireLoadable} from 'components';
import {useTranslation} from 'react-i18next';

// import {useRouterActions} from 'state/client/hooks/UseActions';

const OrderSuccess: React.FC = () => {
  // const routerActions = useRouterActions();
  const {t} = useTranslation('order');

  const cart = useSelector((state: State) => state.newCart.cart);
  const actions = useCartActions();

  // const history = useHistory();

  return (
    <View style={styles.ModalOuter}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalTextMain}>{t('thankYou')}</Text>
          <Text style={styles.modalTextSecond}>{t('orderAdded')}</Text>
        </View>
        <Text style={styles.modalTextSecond}>{t('estimatedDelivery')}:</Text>
        <Text style={styles.modalTextThird}>30 min</Text>
        <RequireLoadable data={cart}>
          {({id}) => (
            <TouchableOpacity
              onPress={() => {
                // routerActions.navigateToOrderProgress()

                // history.push('/orderProgress/2bf4b89a-e120-4043-9456-9dab07df3bef');
                actions.cart(id);
              }}
            >
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF8C29', '#FF2D55']}
                style={styles.btn}
              >
                <Text style={styles.btnText}>{t('ok')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </RequireLoadable>
      </View>
    </View>
  );
};

export default OrderSuccess;

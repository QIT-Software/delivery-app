import React, {useEffect, useState} from 'react';

import styles from './Address.styles';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {useRecentAddressesActions, useRouterActions} from 'state/client/hooks/UseActions';
import LinearGradient from 'react-native-linear-gradient';
import AddressDropMenu from 'components/addressDropMenu/AddressDropMenu';
import LastAddress from 'components/lastAddress/LastAddress';
import {ArrowNext} from 'routes/main/assets';
import {useTranslation} from 'react-i18next';
import {RequireLoadable} from 'components';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';

const Address: React.FC = () => {
  const routerActions = useRouterActions();
  const addressActions = useRecentAddressesActions();

  const {t} = useTranslation('address');

  useEffect(() => {
    addressActions.fetchRecentAddresses();
  }, []);

  const [visiblePopUp, setVisiblePopUp] = useState(false);

  const addresses = useSelector((state: State) => state);

  return (
    <View style={styles.addressContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('address')}</Text>
        </View>
      </View>
      <AddressDropMenu onClick={() => '1'} />
      <Modal animationType="fade" transparent visible={visiblePopUp}>
        <RequireLoadable data={addresses.recentAddresses}>
          {({recentAddresses}) => (
            <TouchableWithoutFeedback onPress={() => setVisiblePopUp(!visiblePopUp)}>
              <View style={styles.modal}>
                <FlatList
                  style={styles.scroll}
                  data={recentAddresses}
                  numColumns={1}
                  renderItem={({item}) => <LastAddress address={item} />}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </RequireLoadable>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setVisiblePopUp(!visiblePopUp);
        }}
      >
        <View style={styles.settingsInner}>
          <Text style={styles.settingsInnerTitle}>{t('recentAddresses')}</Text>
          <Image source={BackBtn} style={styles.goBtn} />
        </View>
      </TouchableOpacity>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF8C29', '#FF2D55']}
        style={styles.btn}
      >
        <TouchableOpacity onPress={() => routerActions.navigateToAdditionalAddressInfo()}>
          <Image source={ArrowNext} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Address;

import React, {useState} from 'react';

import styles from './AdditionalAddressInfo.styles';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import BackBtn from 'routes/main/assets/BackBtn.png';
import {useAddressActions, useRouterActions} from 'state/client/hooks/UseActions';
import LinearGradient from 'react-native-linear-gradient';
import AuthInputField from 'components/AuthInputField/AuthInputField';
import {UserLocation} from 'state/entities/UserAddress';
import {useSelector} from 'react-redux';
import {State} from 'state/entities/State';
import {ArrowNext} from 'routes/main/assets';
import {useTranslation} from 'react-i18next';

const AdditionalAddressInfo: React.FC = () => {
  const routerActions = useRouterActions();
  const actions = useAddressActions();

  const {t} = useTranslation('address');

  const {address} = useSelector((state: State) => state);

  const [entrance, setEntrance] = useState('');
  const [floor, setFloor] = useState('');
  const [apartment, setApartment] = useState('');

  const onPress = () => {
    const location: UserLocation = {
      placeId: address.location?.placeId,
      description: address.location?.description,
      entrance,
      floor,
      apartment,
      lat: address.location?.lat,
      lng: address.location?.lng,
    };
    actions.chooseAddress(location);
    // eslint-disable-next-line no-console
    console.log(location);
  };
  const location = address.location?.description;

  return (
    <>
      <View style={styles.addressContainer}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => routerActions.goBack()}>
            <Image source={BackBtn} style={styles.backBtn} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('address')}</Text>
          </View>
        </View>
        <View style={styles.currentAddressContainer}>
          <Text style={styles.currentAddressDescription}>{`${location?.substring(
            0,
            60,
          )}...`}</Text>
        </View>
        <ScrollView style={styles.inputContainer}>
          <Text style={styles.inputTitle}>{t('entrance')}</Text>
          <AuthInputField
            value={entrance}
            onChangeText={(value) => setEntrance(value)}
            style={styles.inputPopUp}
            type="none"
            placeholder={t('entrance')}
          />
          <Text style={styles.inputTitle}>{t('floor')}</Text>
          <AuthInputField
            value={floor}
            onChangeText={(value) => setFloor(value)}
            style={styles.inputPopUp}
            type="none"
            placeholder={t('floor')}
          />
          <Text style={styles.inputTitle}>{t('apartment')}</Text>
          <AuthInputField
            value={apartment}
            onChangeText={(value) => setApartment(value)}
            style={styles.inputPopUp}
            type="none"
            placeholder={t('apartment')}
          />
        </ScrollView>
      </View>

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#FF8C29', '#FF2D55']}
        style={styles.btn}
      >
        <TouchableOpacity
          onPress={() => {
            onPress();
            routerActions.navigateToOrder();
          }}
        >
          <Image source={ArrowNext} />
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default AdditionalAddressInfo;

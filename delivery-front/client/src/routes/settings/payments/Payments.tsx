import React, {useState} from 'react';
import styles from './Payments.styles';
import {
  Image,
  // ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRouterActions} from 'state/client/hooks/UseActions';
import BackBtn from 'routes/main/assets/BackBtn.png';
import AuthInputField from 'components/AuthInputField/AuthInputField';
import {useTranslation} from 'react-i18next';
// import LinearGradient from 'react-native-linear-gradient';

const Payments: React.FC = () => {
  const routerActions = useRouterActions();
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const {t} = useTranslation('settings');

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => routerActions.goBack()}>
          <Image source={BackBtn} style={styles.backBtn} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('payments')}</Text>
        </View>
      </View>
      <View style={styles.cardsListContainer}>
        <Text style={styles.cardsListInner}>{t('card')}</Text>
        <Text style={styles.cardsListInner}>************9580</Text>
      </View>
      <View style={styles.cardContainer}>
        <AuthInputField
          value={cardHolder}
          onChangeText={(value) => setCardHolder(value)}
          style={styles.inputCard}
          type="none"
          placeholder="CARDHOLDER NAME"
        />
        <AuthInputField
          value={cardNumber}
          onChangeText={(value) => setCardNumber(value)}
          style={styles.inputCard}
          type="none"
          placeholder=" ****  ****  ****  ****"
        />
        <View style={styles.cardInfoContainer}>
          <AuthInputField
            value={cardNumber}
            onChangeText={(value) => setCardNumber(value)}
            style={styles.inputCardInfo}
            type="none"
            placeholder="mm/yyyy"
          />
          <AuthInputField
            value={cardNumber}
            onChangeText={(value) => setCardNumber(value)}
            style={styles.inputCardInfo}
            type="none"
            placeholder="CVV"
          />
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => routerActions.navigateToOrderSuccess()}> */}
      {/*  <LinearGradient */}
      {/*    start={{x: 0, y: 0}} */}
      {/*    end={{x: 1, y: 0}} */}
      {/*    colors={['#FF8C29', '#FF2D55']} */}
      {/*    style={styles.btn} */}
      {/*  > */}
      {/*    <Text style={styles.btnText}>Add Card</Text> */}
      {/*  </LinearGradient> */}
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Payments;

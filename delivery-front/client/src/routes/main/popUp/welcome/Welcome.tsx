import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './Welcome.styles';
import LinearGradient from 'react-native-linear-gradient';
import {useHistory} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {useEmailForSpamActions} from 'state/client/hooks/UseActions';
import AuthInputField from 'components/AuthInputField/AuthInputField';

const Welcome: React.FC = () => {
  const actions = useEmailForSpamActions();
  const history = useHistory();
  const {t} = useTranslation('cuisinesList');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.ModalOuter}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalTextMain}>-20%</Text>
          <Text style={styles.modalTextSecond}>{t('welcome')}</Text>
        </View>
        <AuthInputField
          style={{
            ...styles.inputModal,
            ...styles.inputModalText,
          }}
          value={email}
          type="emailAddress"
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor="#90B3DD"
          placeholder="Email"
        />
        <View style={styles.btnModalContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => history.goBack()}>
            <Text style={styles.modalCancel}>{t('cancel')}</Text>
          </TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF8C29', '#FF2D55']}
            style={styles.btn}
          >
            <TouchableOpacity
              onPress={() => {
                actions.createEmailForSpam({email, isDiscount: true});
                history.goBack();
              }}
            >
              <Text style={styles.btnText}>{t('submit')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

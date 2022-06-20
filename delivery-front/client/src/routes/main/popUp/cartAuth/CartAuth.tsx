import {Text, TouchableOpacity, View} from 'react-native';
import styles from './CartAuth.styles';
import {AuthInputField} from 'components';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {useAuthActions, useRouterActions as authActions} from 'state/hooks/UseActions';
// import {useRouterActions as mainActions} from 'state/client/hooks/UseActions';

const CartAuth: React.FC = () => {
  const routerActionsAuth = authActions();
  // const routerActionsMain = mainActions();
  const actions = useAuthActions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.ModalOuter}>
      <View style={styles.modalContainer}>
        <View>
          <Text style={styles.modalTitle}>Sign in</Text>
          <Text style={styles.modalSubTitle}>Сlient authorization</Text>
        </View>
        <View style={styles.inputContainer}>
          <AuthInputField
            value={email}
            onChangeText={(value) => setEmail(value)}
            style={styles.inputPopUp}
            type="emailAddress"
            placeholder="Email"
          />
          <AuthInputField
            value={password}
            onChangeText={(value) => setPassword(value)}
            style={styles.inputPopUp}
            type="password"
            placeholder="Password"
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => actions.login({email, password})}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FF8C29', '#FF2D55']}
              style={styles.btnModal}
            >
              <Text style={styles.btnText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.bottomPopUpText}>
            <Text style={styles.secondaryText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => routerActionsAuth.navigateToSignUp()}>
              <Text style={styles.press}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartAuth;

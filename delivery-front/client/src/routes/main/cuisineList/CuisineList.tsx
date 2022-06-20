import React, {useState, useEffect} from 'react';
import {RequireLoadable} from 'components';
import {useSelector} from 'react-redux';
import State from 'state/client/entities/State';
import {
  useCuisineListActions,
  useSaveInfoActions,
  useAuthActions,
  useRouterActions,
} from 'state/client/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import styles from './CuisineList.styles';
import CuisineItem from 'components/cuisineItem/CuisineItem';
import {
  FlatList,
  Text,
  Dimensions,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import AuthInputField from 'components/AuthInputField/AuthInputField';
import {Route, useHistory} from 'react-router';
import Welcome from '../popUp/welcome/Welcome';
import {useGuard} from 'state/hooks/UseGuard';
import Basket from '../../../components/Basket/Basket';
import {Favorites} from 'routes/main/assets';

const CuisineList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const actions = useCuisineListActions();
  const saveInfoActions = useSaveInfoActions();
  const authActions = useAuthActions();
  const routerActions = useRouterActions();
  const {t} = useTranslation('cuisinesList');
  const history = useHistory();

  const {authenticated} = useGuard({
    orderInProgress: false,
    requireAuthenticated: true,
    authRoute: '/main/cuisineList/welcome',
  });

  useEffect(() => {
    if (authenticated) {
      routerActions.clientAppEntered();
    }
  }, []);

  useEffect(() => {
    saveInfoActions.saveScreenInfo('main');
    actions.fetchCuisineList();
    authActions.fetchSession({history});
    // const timer = setTimeout(() => {
    //   routerActions.navigateToWelcomePopUp();
    // }, 1400);
    // return () => clearTimeout(timer);
  }, []);

  useGuard({
    orderInProgress: true,
    requireAuthenticated: true,
    authRoute: '/main/cuisineList/welcome',
  });
  // const carts = useSelector((state: State) => state.cartsList);
  // console.log(carts);
  const {cuisineList} = useSelector((state: State) => state);
  return (
    <View style={styles.cuisinesContainer}>
      <Route path="/main/cuisineList/welcome">
        <Modal animationType="fade" onDismiss={() => history.goBack()} transparent>
          <Welcome />
        </Modal>
      </Route>
      <AuthInputField
        value={searchText}
        onChangeText={(value) => {
          setSearchText(value);
        }}
        placeholder={t('search')}
        style={styles.input}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('cuisines')}</Text>
        <TouchableOpacity onPress={() => routerActions.navigateToFavorites()}>
          <Image source={Favorites} style={styles.favorites} />
        </TouchableOpacity>
      </View>
      <RequireLoadable data={cuisineList}>
        {({cuisineList}) => (
          <FlatList
            contentContainerStyle={styles.cuisineBlock}
            columnWrapperStyle={
              Dimensions.get('window').width >= 300 && styles.cuisineFlat
            }
            data={cuisineList}
            numColumns={Dimensions.get('window').width >= 300 ? 2 : 1}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <CuisineItem
                cuisine={item}
                blockStyle={styles.item}
                onPress={() => actions.sets(item.id)}
              />
            )}
          />
        )}
      </RequireLoadable>

      <Basket style={styles.basketItem} />
    </View>
  );
};

export default CuisineList;
